"""Client identity is derived only from the socket or explicitly trusted proxies."""
import ipaddress
import os

from fastapi import Request


def client_identity(request: Request) -> str:
    peer = request.client.host if request.client else "unknown"
    try:
        address = ipaddress.ip_address(peer)
        networks = [ipaddress.ip_network(value.strip()) for value in
                    os.getenv("TRUSTED_PROXY_CIDRS", "").split(",") if value.strip()]
    except ValueError:
        return peer
    if not any(address in network for network in networks):
        return str(address)
    # Walk from the socket towards the origin; stop at the first untrusted hop.
    # Never trust CF-Connecting-IP / X-Real-IP sent by arbitrary clients.
    chain = request.headers.get("x-forwarded-for", "").split(",")
    if len(chain) > 32:
        return str(address)
    for hop in reversed(chain):
        if not any(address in network for network in networks):
            break
        try:
            address = ipaddress.ip_address(hop.strip())
        except ValueError:
            return peer
    return str(address)
