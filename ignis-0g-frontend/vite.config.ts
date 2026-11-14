import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const nasaCollectionRoot = fileURLToPath(new URL("../nasa-combustion-media-collection", import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "serve-nasa-content",
      configureServer(server) {
        server.middlewares.use("/nasa-content", (req, res, next) => {
          let rel: string
          try {
            rel = decodeURIComponent((req.url ?? "/").split("?")[0]).replace(/^\/+/, "")
          } catch {
            res.statusCode = 400
            return res.end()
          }
          const target = path.resolve(nasaCollectionRoot, rel)
          if (!target.startsWith(path.resolve(nasaCollectionRoot) + path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
            return next()
          }
          const ext = path.extname(target).toLowerCase()
          const mime =
            ext === ".gif"
              ? "image/gif"
              : ext === ".jpg" || ext === ".jpeg"
                ? "image/jpeg"
                : ext === ".png"
                  ? "image/png"
                  : ext === ".md"
                    ? "text/markdown; charset=utf-8"
                    : "application/octet-stream"
          res.setHeader("Content-Type", mime)
          fs.createReadStream(target).pipe(res)
        })
      },
    },
  ],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
      "/health": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
})
