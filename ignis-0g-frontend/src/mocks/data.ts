import type { Locale } from "@/i18n"
import type {
  Dataset,
  Media,
  Relation,
  StudyDetail,
  StudySummary,
} from "@/domain/types"
import { getQuickMeta } from "@/domain/knowledge"

interface SeedStudy {
  id: string
  title: string
  category: string
  tags: string[]
  description: string
  descriptionRu: string
  methodology: string
  methodologyRu: string
  safetyImpact: string
  safetyImpactRu: string
  sourceUrl: string
  sourceTitle: string
  evidence: string
  evidenceRu: string
  locator?: string
}

const seeds: SeedStudy[] = [
  {
    id: "flex-1",
    title: "FLEX-1 (Flame Extinguishment Experiment)",
    category: "FLEX",
    tags: ["Suppression"],
    description: "Discovery of quasi-steady invisible cool flames (~700 K, NTC regime) sustained by low-temperature oxidation chemistry after radiative extinction of the hot droplet flame; lower LOI (14–15% O₂) than in 1g.",
    descriptionRu: "Открытие квазистационарного невидимого холодного пламени (~700 K, режим NTC) после радиационного затухания горячего пламени капли жидкого топлива; более низкий LOI (14–15% O₂), чем при 1g.",
    methodology: "ISS Destiny Lab CIR (Combustion Integrated Rack) with MDCA chamber insert for isolated free-floating or tethered droplets (n-heptane, methanol, 1.5–4.2 mm) in N₂, CO₂, He, Xe mixtures.",
    methodologyRu: "Стойка CIR на МКС с вставкой MDCA для изолированных свободных и закреплённых капель (н-гептан, метанол, диаметр 1.5–4.2 мм) в смесях N₂, CO₂, He, Xe.",
    safetyImpact: "Visual hot-flame extinction does not guarantee fire safety: toxic CO and formaldehyde (CH₂O) persist and require higher inert suppressant concentrations.",
    safetyImpactRu: "Визуальное затухание горячего пламени не гарантирует безопасность: сохраняются токсичные CO и CH₂O, требуются повышенные концентрации инертных газов.",
    sourceUrl: "https://ntrs.nasa.gov/citations/20150023456",
    sourceTitle: "NASA/TP-2015-216046 · PSI FLEX",
    evidence: "Nayagam et al. (2012), Combustion and Flame 159(12), 3583–3588; NASA/TP-2015-216046 Table IX.",
    evidenceRu: "Nayagam et al. (2012), Combustion and Flame 159(12), 3583–3588; NASA/TP-2015-216046 Table IX.",
    locator: "Table IX, p. 42",
  },
  {
    id: "flex-2-cfi",
    title: "FLEX-2 / CFI (Cool Flames Investigation)",
    category: "FLEX",
    tags: ["Suppression"],
    description: "Two-stage combustion of heavier alkanes and multi-component mixtures (n-octane, n-decane, twin droplets): discovered cool-flame reignition back to hot flame and oscillating warm flames.",
    descriptionRu: "Двухстадийное горение тяжёлых алканов и смесей (н-октан, н-декан, двойные капли): обнаружено повторное самовоспламенение (reignition) холодного пламени обратно в горячее и осциллирующее тёплое пламя.",
    methodology: "Upgraded ISS CIR / MDCA with multi-component fuel dispensing, twin-droplet deployment, and elevated pressure testing (50.7–304 kPa) up to 50% O₂.",
    methodologyRu: "Модернизированный модуль CIR / MDCA с дозированием многокомпонентных топлив и испытаниями при повышенном давлении (50.7–304 кПа) и до 50% O₂.",
    safetyImpact: "Risk of delayed hot-flame reignition from an invisible cool flame if compartment pressure rises or fresh O₂ enters.",
    safetyImpactRu: "Риск отложенного повторного возгорания от невидимого холодного пламени при росте давления в отсеке или притоке свежего O₂.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA PSI · FLEX-2 / CFI",
    evidence: "Multi-component and binary droplet experiments in CIR/MDCA at 10–50% O₂.",
    evidenceRu: "Испытания многокомпонентных и парных капель в CIR/MDCA при 10–50% O₂.",
  },
  {
    id: "flex-2j-jaxa",
    title: "FLEX-2J (JAXA Group Combustion)",
    category: "FLEX",
    tags: ["Suppression", "Spray"],
    description: "Flame propagation along linear and lattice n-decane droplet arrays: identified group combustion modes, inter-droplet heat/mass transfer, and percolation limits.",
    descriptionRu: "Распространение пламени вдоль линейных и решётчатых массивов капель н-декана: выявлены режимы группового горения, межкоагуляционный тепломассообмен и пределы перколяции.",
    methodology: "CIR / MDCA with linear and lattice droplet array generator (0.5–2.0 mm diameter) in quiescent atmosphere (14–21% O₂).",
    methodologyRu: "CIR / MDCA с генератором линейных и решётчатых массивов капель диаметром 0.5–2.0 мм в покоящейся атмосфере (14–21% O₂).",
    safetyImpact: "Models realistic flame spread across fuel sprays and aerosol leaks aboard spacecraft.",
    safetyImpactRu: "Моделирует реальное распространение пожара в топливных распылах и аэрозолях на борту КА.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA PSI · FLEX-2J (JAXA)",
    evidence: "JAXA flame percolation data in n-decane droplet arrays.",
    evidenceRu: "Данные JAXA по перколяции пламени в массивах капель н-декана.",
  },
  {
    id: "flex-ice-ga",
    title: "FLEX-ICE-GA (Biofuel Surrogates)",
    category: "FLEX",
    tags: ["Suppression", "Fundamental"],
    description: "Isolated droplet combustion of biofuel surrogates (heptane/ethanol, decane/1-hexanol): quantified preferential vaporization, soot-shell dynamics, and radiative extinction limits.",
    descriptionRu: "Исследование горения одиночных капель биотопливных суррогатов (гептан/этанол, декан/1-гексанол): количественно оценено преимущественное испарение, динамика сажевой оболочки и пределы затухания.",
    methodology: "CIR / MDCA with multi-fuel dispensing needles and high-speed backlit/optical diagnostics at 101–202.7 kPa.",
    methodologyRu: "CIR / MDCA, многотопливные шприцевые иглы и высокоскоростная теневая и оптическая диагностика при 101–202.7 кПа.",
    safetyImpact: "Validates chemical-kinetic vaporization and flammability models for oxygenated liquids.",
    safetyImpactRu: "Валидация химико-кинетических моделей испарения и пожароопасности кислородсодержащих жидкостей.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA PSI · FLEX-ICE-GA",
    evidence: "ASI / CNR-IM experimental campaign in the ISS CIR/MDCA rack.",
    evidenceRu: "Экспериментальная кампания ASI / CNR-IM в стойке CIR/MDCA.",
  },
  {
    id: "bass-bass-ii-bass-m",
    title: "BASS / BASS-II (Burning and Suppression of Solids)",
    category: "BASS",
    tags: ["Prevention"],
    description: "U-shaped flammability boundary in 0g: at low forced airflows (1–10 cm/s), absence of buoyant cooling lowers the oxygen limit; PMMA rods sustained burning down to 13.6% O₂ (§6.1.4.2), while flat concurrent SIBAL quenched at 16.9–18.7% O₂ (Table 7.1).",
    descriptionRu: "U-образная граница воспламеняемости в 0g: при слабом вынужденном потоке (1–10 см/с) отсутствие конвективного охлаждения снижает порог по кислороду; стержни PMMA горели до 13.6% O₂ (§6.1.4.2), а ткань SIBAL в спутном потоке гасла при 16.9–18.7% O₂ (Table 7.1).",
    methodology: "Microgravity Science Glovebox (MSG) with modified SPICE wind-tunnel duct (0–53 cm/s opposed and concurrent flow) testing SIBAL, PMMA, Nomex, Ultem.",
    methodologyRu: "Перчаточный бокс MSG с модифицированной аэродинамической трубой SPICE (0–53 см/с, встречный и спутный поток) для SIBAL, PMMA, Nomex, Ultem.",
    safetyImpact: "Earth upward certification standard NASA-STD-6001 Test 1 is not always conservative in low-flow spacecraft HVAC regimes; restarting airflow triggers rapid flare-up.",
    safetyImpactRu: "Земной стандарт NASA-STD-6001 Test 1 не всегда консервативен в режимах слабой вентиляции HVAC; включение обдува вызывает резкую вспышку.",
    sourceUrl: "https://ntrs.nasa.gov/citations/20210011385",
    sourceTitle: "NASA/TM-20210011385 · PSI BASS-II",
    evidence: "Cast PMMA rod O13a survived to 13.6% O₂ (§6.1.4.2, vs 15.4% 1g upward Ref. 23); concurrent SIBAL quenched at 16.9–18.7% O₂ (Table 7.1).",
    evidenceRu: "Стержень PMMA O13a сохранял горение до 13.6% O₂ (§6.1.4.2, при земном пороге 15.4%); спутная ткань SIBAL гасла при 16.9–18.7% O₂ (Table 7.1).",
    locator: "NASA/TM-20210011385",
  },
  {
    id: "bass-m-milliken",
    title: "BASS-M (Milliken FR Textiles)",
    category: "BASS",
    tags: ["Prevention"],
    description: "Evaluated self-extinguishment and flame spread across 10 commercial flame-retardant (FR) textiles under forced low-speed ventilation (1–50 cm/s) in 0g versus 1g upward-burn standards.",
    descriptionRu: "Оценка самозатухания и скорости распространения пламени на 10 коммерческих огнестойких тканях (FR) при слабой принудительной вентиляции 1–50 см/с в 0g по сравнению со стандартом 1g.",
    methodology: "MSG with SPICE flow duct and textile sample frames (0.2–1.0 mm thickness) at 21% O₂.",
    methodologyRu: "MSG с проточным каналом SPICE и рамками для образцов тканей толщиной 0.2–1.0 мм при 21% O₂.",
    safetyImpact: "Directly benchmarks fire-resistant fabrics for crew clothing and habitat interiors.",
    safetyImpactRu: "Прямая верификация огнестойких тканей для одежды экипажа и внутренней отделки модулей.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA PSI · BASS-M (Milliken)",
    evidence: "Testing of 10 industrial FR textiles in MSG/SPICE.",
    evidenceRu: "Испытания 10 промышленных FR-текстилей в MSG/SPICE.",
  },
  {
    id: "acme-bre",
    title: "ACME BRE (Burning Rate Emulator)",
    category: "ACME",
    tags: ["Prevention"],
    description: "Flat porous gas burner emulates condensed-phase heat of gasification and burning rates; steady flames persisted for minutes in zero airflow at 21–34% O₂.",
    descriptionRu: "Плоская пористая горелка эмулирует теплоту газификации и скорость горения твёрдых и жидких материалов через подачу газа; устойчивое горение длилось минутами при нулевом потоке воздуха в среде 21–34% O₂.",
    methodology: "CIR rack with ACME CIA and flat porous stainless-steel burner (25–50 mm), ethylene/methane at 50.7–101.3 kPa.",
    methodologyRu: "Стойка CIR с модулем ACME CIA и плоской пористой горелкой из нержавеющей стали (25–50 мм), этилен/метан при 50.7–101.3 кПа.",
    safetyImpact: "Shutting off cabin ventilation alone does not always immediately extinguish fires in Exploration atmospheres (34% O₂).",
    safetyImpactRu: "Отключение вентиляции само по себе не всегда мгновенно тушит пожар в атмосферах Exploration (34% O₂).",
    sourceUrl: "https://science.nasa.gov/mission/acme/",
    sourceTitle: "NASA PSI · ACME BRE",
    evidence: "1g burning rate is 3–4× higher, yet 0g flames persist in quiescent air at elevated O₂.",
    evidenceRu: "Скорость выгорания в 1g в 3–4 раза выше, но в 0g при повышенном O₂ пламя сохраняется в штиле.",
  },
  {
    id: "acme-s-flame",
    title: "ACME s-Flame (Spherical Diffusion Flames)",
    category: "ACME",
    tags: ["Prevention", "Fundamental"],
    description: "First quasi-steady spherical gaseous diffusion flames: precise measurements of flame structure, radiative extinction, and Lewis-number pulsating instabilities (especially in H₂).",
    descriptionRu: "Первые квазистационарные сферические газовые диффузионные пламёна: точные измерения структуры пламени, радиационного тушения и пульсационных неустойчивостей числа Льюиса (особенно в H₂).",
    methodology: "CIR with ACME CIA and spherical porous burner (6.35–12.7 mm), radiometers and cameras at 15–35% O₂ with N₂, He, CO₂ diluents.",
    methodologyRu: "CIR с ACME CIA и сферической пористой горелкой (6.35–12.7 мм), радиометры и камеры при 15–35% O₂ с разбавителями N₂, He, CO₂.",
    safetyImpact: "Clean 1D benchmark data for validating 3D CFD chemical kinetics, radiative loss, and extinction models.",
    safetyImpactRu: "Чистые 1D эталонные данные для валидации 3D CFD моделей кинетики, радиационных потерь и затухания.",
    sourceUrl: "https://science.nasa.gov/mission/acme/",
    sourceTitle: "NASA PSI · ACME s-Flame",
    evidence: "Buoyancy-free 1D spherical benchmarks for H₂, CH₄, and C₂H₄.",
    evidenceRu: "1D сферические бенчмарки для H₂, CH₄, C₂H₄ без искажений от плавучести.",
  },
  {
    id: "acme-e-field-flames",
    title: "ACME E-FIELD Flames",
    category: "ACME",
    tags: ["Suppression"],
    description: "Electric fields up to 10 kV act on chemi-ions and charged soot particles to create an 'ion wind' (EHD body force) that reshapes flames and suppresses soot.",
    descriptionRu: "Электрическое поле до 10 кВ воздействует на хеми-ионы и заряженные частицы сажи, создавая «ионный ветер» (ЭГД-силу), который меняет форму пламени, имитирует частичную гравитацию и подавляет сажу.",
    methodology: "CIR with ACME CIA, coflow jet burner and high-voltage upper mesh electrode (up to 10 kV) at 21% O₂.",
    methodologyRu: "CIR с ACME CIA, коаксиальная струйная горелка и высоковольтный верхний сетчатый электрод (до 10 кВ) при 21% O₂.",
    safetyImpact: "Promising active non-chemical flame control and soot reduction method in microgravity.",
    safetyImpactRu: "Перспективная активная нехимическая технология управления пламенем и снижения сажи; уникальный аналог частичной гравитации в 0g.",
    sourceUrl: "https://science.nasa.gov/mission/acme/",
    sourceTitle: "NASA PSI · ACME E-FIELD Flames",
    evidence: "Electrohydrodynamic flame manipulation of CH₄ and C₂H₄ in microgravity.",
    evidenceRu: "Электрогидродинамическое управление пламенем CH₄ и C₂H₄ в микрогравитации.",
  },
  {
    id: "acme-cfi-g",
    title: "ACME CFI-G (Cool Flames with Gases)",
    category: "ACME",
    tags: ["Prevention"],
    description: "Achieved steady non-premixed gaseous cool flames (without ozone or plasma assistance) on a spherical burner with burner oxidizer stream up to 85% O₂ (inverse diffusion flame).",
    descriptionRu: "Получены устойчивые неперемешанные газовые холодные пламёна (без озона и плазмы) в сферической горелке при концентрациях кислорода до 85% O₂ (обратное диффузионное пламя).",
    methodology: "CIR with ACME CIA, spherical porous burner (propane, n-butane, n-pentane) with oxidizer fed through the spherical burner.",
    methodologyRu: "CIR с ACME CIA, сферическая пористая горелка (пропан, н-бутан, н-пентан) с подачей окислителя из сферической горелки.",
    safetyImpact: "Confirms low-temperature oxidation risk during hydrocarbon gas leaks in high-oxygen systems.",
    safetyImpactRu: "Подтверждает риск низкотемпературного окисления при утечках горючих газов в высококислородных системах и скафандрах.",
    sourceUrl: "https://science.nasa.gov/mission/acme/",
    sourceTitle: "NASA PSI · ACME CFI-G",
    evidence: "Up to 85% O₂ was in the spherical burner oxidizer stream, not the ambient chamber atmosphere.",
    evidenceRu: "До 85% O₂ было в потоке из сферической горелки. Это не концентрация O₂ в камере.",
  },
  {
    id: "acme-flame-design",
    title: "ACME Flame Design",
    category: "ACME",
    tags: ["Prevention", "Fundamental"],
    description: "Demonstrated permanently soot-free spherical diffusion flames by controlling stoichiometric mixture fraction (Zst) via fuel/oxidizer inert dilution.",
    descriptionRu: "Продемонстрированы полностью бессажевые сферические диффузионные пламёна за счёт управления стехиометрической долей смеси (Zst) путём инертного разбавления со стороны топлива или окислителя.",
    methodology: "CIR with ACME CIA, spherical porous burner (C₂H₄, CH₄) at 18–50% O₂ diluted with N₂ and He.",
    methodologyRu: "CIR с ACME CIA, сферическая пористая горелка (C₂H₄, CH₄) при 18–50% O₂ и разбавлении N₂, He.",
    safetyImpact: "Enables design of clean, soot-free combustors and verifies soot-inception and radiation models.",
    safetyImpactRu: "Позволяет проектировать чистые малосажевые камеры сгорания и верифицировать модели сажеобразования и радиации.",
    sourceUrl: "https://science.nasa.gov/mission/acme/",
    sourceTitle: "NASA PSI · ACME Flame Design",
    evidence: "High Zst shifts the flame sheet toward the fuel side and eliminates soot formation.",
    evidenceRu: "Высокое Zst смещает фронт пламени к топливу и полностью подавляет сажу.",
  },
  {
    id: "acme-cld-flame",
    title: "ACME CLD Flame (Coflow Laminar Diffusion)",
    category: "ACME",
    tags: ["Fundamental"],
    description: "Flicker-free axisymmetric laminar coflow diffusion flames in 0g up to 300 kPa isolating soot growth and radiative heat transfer from buoyancy.",
    descriptionRu: "Стабильные немерцающие осесимметричные ламинарные диффузионные пламёна в 0g при давлении до 300 кПа для изоляции роста сажи и радиационного теплообмена от конвекции.",
    methodology: "CIR with ACME CIA, axisymmetric coflow burner with optical soot and temperature diagnostics (101–300 kPa).",
    methodologyRu: "CIR с ACME CIA, осесимметричная коаксиальная горелка с оптической диагностикой сажи и температуры (101–300 кПа).",
    safetyImpact: "High-precision benchmarks for 2D/3D CFD soot and radiative heat transfer submodels.",
    safetyImpactRu: "Высокоточные эталоны для 2D/3D CFD моделей сажи и радиационного переноса тепла.",
    sourceUrl: "https://science.nasa.gov/mission/acme/",
    sourceTitle: "NASA PSI · ACME CLD Flame",
    evidence: "1–3 atm pressure range for CH₄ and C₂H₄ in 10–40 cm/s coflow.",
    evidenceRu: "Диапазон давлений 1–3 атм для CH₄ и C₂H₄ в спутном потоке 10–40 см/с.",
  },
  {
    id: "acme-program-overview-6-experiments",
    title: "ACME Program Overview (6 Experiments)",
    category: "ACME",
    tags: ["Prevention", "Suppression", "Fundamental"],
    description: "Integrated suite of 6 gaseous combustion experiments in the ISS CIR rack sharing the modular ACME Chamber Insert Assembly (CIA).",
    descriptionRu: "Интегрированная серия из 6 газовых экспериментов в стойке CIR на единой модульной вставке CIA. Условия зависят от эксперимента.",
    methodology: "Unified CIR hardware (ACME CIA) with interchangeable porous, spherical, coflow, and high-voltage mesh burners.",
    methodologyRu: "Единая аппаратура CIR (ACME CIA) с модульными горелками: пористой, сферической, коаксиальной и высоковольтной сеткой.",
    safetyImpact: "Foundational dataset for material screening, fire suppression, soot control, and predictive fire modeling.",
    safetyImpactRu: "Фундаментальная основа для отбора материалов, тушения, снижения сажи и валидации прогностических моделей пожара.",
    sourceUrl: "https://science.nasa.gov/mission/acme/",
    sourceTitle: "NASA PSI · ACME Overview",
    evidence: "Unifies BRE, s-Flame, Flame Design, CLD Flame, E-FIELD Flames, and CFI-G.",
    evidenceRu: "Объединяет BRE, s-Flame, Flame Design, CLD Flame, E-FIELD Flames и CFI-G.",
  },
  {
    id: "slice-acme-cld-precursor",
    title: "SLICE (Structure & Liftoff In Combustion)",
    category: "ACME",
    tags: ["Prevention", "Fundamental"],
    description: "Precursor investigation to ACME CLD Flame: characterized liftoff and stabilization of laminar jet flames, which remain stable at much higher dilution in 0g than on Earth.",
    descriptionRu: "Предшественник ACME CLD Flame: изучены отрыв и стабилизация ламинарных струйных пламён, которые в 0g сохраняют устойчивость при гораздо более сильном разбавлении, чем на Земле.",
    methodology: "ISS MSG with SPICE coflow wind-tunnel duct and laminar nozzle (1.0–3.2 mm), CH₄/C₂H₄ at 5–40 cm/s.",
    methodologyRu: "Перчаточный бокс MSG с проточным каналом SPICE и ламинарным соплом (1.0–3.2 мм), CH₄/C₂H₄ при 5–40 см/с.",
    safetyImpact: "Establishes blow-off and dilution limits for gaseous fuel leaks in ventilated spacecraft compartments.",
    safetyImpactRu: "Определяет пределы срыва пламени при утечках газа в вентилируемых отсеках КА.",
    sourceUrl: "https://ntrs.nasa.gov/citations/20160012298",
    sourceTitle: "NASA PSI · SLICE (NTRS 20160012298)",
    evidence: "Links MSG/SPICE diagnostics with the ACME program in the CIR rack (Case A & Case B boundary conditions).",
    evidenceRu: "Связывает диагностику MSG/SPICE с программой ACME в стойке CIR.",
  },
  {
    id: "saffire-i-iii",
    title: "Saffire I–III (Spacecraft Fire Experiment)",
    category: "Saffire",
    tags: ["Prevention", "Detection"],
    description: "Full-scale flame spread in an uncrewed cargo spacecraft volume (SIBAL 40×100 cm, Nomex, PMMA): fire spreads slower in a large enclosure than in a small duct, delaying smoke arrival.",
    descriptionRu: "Крупномасштабное распространение пламени в реальном объёме грузового корабля (образцы SIBAL 40×100 см, Nomex, PMMA): в большом объёме огонь распространяется медленнее, чем в малом канале, что задерживает появление дыма.",
    methodology: "Autonomous Cygnus cargo vehicle after ISS unberthing, large flow duct at 21% O₂, 101.3 kPa.",
    methodologyRu: "Автономный грузовой корабль Cygnus после расстыковки с МКС, большой проточный канал при 21% O₂, 101.3 кПа.",
    safetyImpact: "Confirmed smoke detector transport delay in large compartments and validated scaling from BASS.",
    safetyImpactRu: "Подтверждено запаздывание срабатывания дымовых извещателей в крупных отсеках и масштабируемость данных BASS.",
    sourceUrl: "https://ntrs.nasa.gov/citations/20180005168",
    sourceTitle: "NASA NTRS 20180005168 · Saffire I–III",
    evidence: "Full-scale fabric and PMMA burns aboard Cygnus (13 test runs).",
    evidenceRu: "Полномасштабные испытания тканей и акрила в Cygnus.",
  },
  {
    id: "saffire-iv-v",
    title: "Saffire IV–V (Post-Fire Cleanup & Sensors)",
    category: "Saffire",
    tags: ["Detection", "Suppression"],
    description: "Heat release up to 10 kW did not cause a catastrophic cabin pressure spike, but released toxic gases (CO, CO₂, HF, HCl); tested prototype smoke eaters and CO₂ scrubbers.",
    descriptionRu: "Тепловыделение до 10 кВт не вызвало критического скачка давления/температуры в отсеке, но привело к выбросу токсичных газов (CO, CO₂, HF, HCl); испытаны прототипы поглотителей дыма и скрубберов CO₂.",
    methodology: "Cygnus cargo spacecraft equipped with gas analyzers, distributed smoke detectors, and post-fire air scrubbing.",
    methodologyRu: "Грузовой корабль Cygnus с газоанализаторами, многоточечными датчиками дыма и системой послепожарной очистки воздуха.",
    safetyImpact: "Primary hazard in large modules is toxic and acid gas transport; verified prototype post-fire cleanup scrubbers.",
    safetyImpactRu: "Главная угроза в крупных отсеках — перенос токсичных и кислых газов; подтверждена эффективность прототипов систем очистки.",
    sourceUrl: "https://ntrs.nasa.gov/citations/20210011521",
    sourceTitle: "NTRS 20210011521 · Saffire IV–V",
    evidence: "Measured CO, CO₂, HF, HCl concentrations and post-fire scrubber performance.",
    evidenceRu: "Измерение концентрации CO, CO₂, HF, HCl и работы скрубберов после пожара.",
    locator: "NTRS 20210011521",
  },
  {
    id: "same-same-r",
    title: "SAME / SAME-R (Smoke & Aerosol Measurement)",
    category: "SAME",
    tags: ["Detection"],
    description: "Microgravity smoke particle size distributions differ from 1g (aerosol aging 10–1800 s); directly benchmarked the Space Shuttle ionization detector against the ISS photoelectric detector.",
    descriptionRu: "Распределение размеров частиц дыма в микрогравитации отличается от земного (старение аэрозоля 10–1800 с); проведено прямое сравнение ионизационного датчика Shuttle и фотоэлектрического датчика МКС.",
    methodology: "MSG glovebox with aerosol aging duct (0–8.1 cm/s), pyrolysis of Teflon, Kapton, Pyrell foam, cellulose, and silicone.",
    methodologyRu: "Перчаточный бокс MSG с аэрозольным каналом (0–8.1 см/с), пиролиз Тефлона, Каптона, пена Pyrell, целлюлозы и силикона.",
    safetyImpact: "Single-moment detectors struggle to distinguish ultrafine Teflon/Kapton smoke from background dust (linked with DAFT/DAFT-2) — multi-wavelength detection is needed.",
    safetyImpactRu: "Однопараметрические датчики плохо распознают сверхмелкие частицы от Тефлона/Каптона на фоне пыли (связь с DAFT/DAFT-2) — нужен многопараметрический анализ.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA PSI · SAME / SAME-R (DOI 10.1016/j.firesaf.2018.04.004)",
    evidence: "Smoke particle size distribution and ISS/Shuttle detector response curves.",
    evidenceRu: "Данные по распределению частиц дыма и отклику детекторов МКС/Shuttle.",
  },
  {
    id: "sofie-gel",
    title: "SoFIE-GEL (Growth and Extinction Limit)",
    category: "SoFIE",
    tags: ["Prevention"],
    description: "Measured how internal solid-fuel preheating (PMMA spheres) governs flame growth and extinction limits at reduced pressure (40–100 kPa).",
    descriptionRu: "Измерение влияния внутреннего нагрева твёрдого топлива (сферы PMMA) на рост пламени и пределы его затухания при пониженном давлении (40–100 кПа).",
    methodology: "ISS CIR rack with SoFIE (Solid Fuel Ignition and Extinction) insert under low flow and variable pressure.",
    methodologyRu: "Стойка CIR на МКС с новой вставкой SoFIE (Solid Fuel Ignition and Extinction) при слабом потоке и переменном давлении.",
    safetyImpact: "Defines critical thermal thickness and overheat risk for materials near warm spacecraft avionics.",
    safetyImpactRu: "Определяет критическую тепловую толщину и риск перегрева материалов вблизи горячей авионики КА.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA ISS Research Explorer · SoFIE-GEL",
    evidence: "Internally heated spherical PMMA tests in CIR/SoFIE.",
    evidenceRu: "Испытания сферических образцов PMMA с внутренним подогревом в CIR/SoFIE.",
  },
  {
    id: "sofie-mist",
    title: "SoFIE-MIST (Material Ignition & Suppression)",
    category: "SoFIE",
    tags: ["Prevention"],
    description: "Discovered 'blue bubble' flames and dual extinction limits (LOC-FS and LOC-FR); Limiting Oxygen Concentration (LOC) in 0g is significantly lower than in 1g.",
    descriptionRu: "Обнаружены «голубые пузырьковые» пламёна и два предела затухания (LOC-FS и LOC-FR); предельная концентрация кислорода (LOC) в 0g значительно ниже, чем при 1g.",
    methodology: "CIR / SoFIE cylindrical flow duct (10 cm/s), black cast PMMA rods (6.4–12.7 mm), and external radiant flux 0–3.3 kW/m² at 40–100 kPa.",
    methodologyRu: "Стойка CIR / SoFIE с цилиндрическим проточным каналом (10 см/с), стержни чёрного литого PMMA (6.4–12.7 мм) и внешний лучистый нагрев 0–3.3 кВт/м² при 40–100 кПа.",
    safetyImpact: "Demonstrates that 1g material screening is non-conservative for Lunar Exploration atmospheres (56.5 kPa / 34% O₂).",
    safetyImpactRu: "Доказывает неконсервативность земного скрининга материалов для лунной атмосферы Exploration (56.5 кПа / 34% O₂).",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA Task Book · SoFIE-MIST (ICES-2023-133)",
    evidence: "Dual extinction boundaries LOC-FS and LOC-FR at 10 cm/s opposed flow.",
    evidenceRu: "Два предела затухания LOC-FS и LOC-FR при встречном потоке 10 см/с.",
  },
  {
    id: "spice",
    title: "SPICE (Smoke Point In Coflow Experiment)",
    category: "SPICE",
    tags: ["Prevention"],
    description: "SPICE studied the onset of visible soot (smoke point) from gas-jet diffusion flames in coflow in microgravity.",
    descriptionRu: "SPICE исследовал порог появления видимой сажи (smoke point) в струйных газовых диффузионных пламёнах в спутном потоке в микрогравитации.",
    methodology: "Flow duct in the ISS Microgravity Science Glovebox (MSG) with interchangeable nozzles, cameras, and gaseous fuel delivery.",
    methodologyRu: "Проточный канал в перчаточном боксе MSG со сменными соплами, камерами и системой подачи газообразного топлива.",
    safetyImpact: "Soot onset in a gas flame alone does not determine smoke detector performance, but establishes the baseline for BASS and SLICE.",
    safetyImpactRu: "Порог сажеобразования в газовом пламени сам по себе не определяет чувствительность дымовых извещателей, но задаёт базу для канала BASS и SLICE.",
    sourceUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-107",
    sourceTitle: "NASA PSI-107 · SPICE",
    evidence: "Flame length and smoke-point determination for laminar jets in MSG.",
    evidenceRu: "Определение высоты пламени и точки дымления ламинарных струй в MSG.",
  },
  {
    id: "daft-daft-2",
    title: "DAFT / DAFT-2 (Dust and Aerosol Measurement Feasibility Test)",
    category: "DAFT",
    tags: ["Detection"],
    description: "DAFT measured background particulate levels aboard the ISS and reduced technical risk for SAME.",
    descriptionRu: "DAFT измерил фоновые уровни аэрозолей и пыли в обитаемых отсеках МКС и снизил технический риск для эксперимента SAME.",
    methodology: "DAFT instrument suite in the ISS cabin including the DustTrak and modified P-Trak condensation particle counter.",
    methodologyRu: "Измерительный комплекс DAFT в отсеке МКС с приборами DustTrak и модифицированным счётчиком конденсационных ядер P-Trak.",
    safetyImpact: "Cabin background dust measurements inform false-alarm rejection, though they cannot establish a lunar dust discrimination threshold.",
    safetyImpactRu: "Измерения фоновой пыли в кабине МКС помогают отстройке датчиков от ложных тревог, но сами по себе не задают порог распознавания лунной пыли.",
    sourceUrl: "https://ntrs.nasa.gov/citations/20070031686",
    sourceTitle: "NASA NTRS 20070031686 · DAFT / DAFT-2",
    evidence: "Background aerosol monitoring in the ISS habitable volume prior to SAME.",
    evidenceRu: "Фоновый мониторинг аэрозолей в обитаемом объёме МКС перед запуском SAME.",
  },
  {
    id: "earth-baseline-nasa-std-6001-test-1",
    title: "Earth Baseline (NASA-STD-6001 Test 1)",
    category: "Reference",
    tags: ["Reference"],
    description: "Ground certification baseline (1g, 21% O₂, 101.3 kPa) dominated by natural upward buoyant convection (~20–30 cm/s).",
    descriptionRu: "Базовый земной сертификационный стандарт (1g, 21% O₂, 101.3 кПа), где доминирует естественная восходящая конвекция (~20–30 см/с).",
    methodology: "Ground vertical upward flame propagation test chamber (1g).",
    methodologyRu: "Наземная вертикальная камера сгорания (1g), испытание восходящего распространения пламени.",
    safetyImpact: "Historically treated as worst-case, yet BASS and SoFIE proved solids can burn at lower O₂ in low-flow 0g.",
    safetyImpactRu: "Исторически считался наихудшим случаем, однако BASS и SoFIE доказали, что при слабом потоке в 0g материалы горят при более низком O₂.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA-STD-6001 Test 1",
    evidence: "Normative reference baseline for comparing 1g and 0g flammability.",
    evidenceRu: "Нормативная база для сравнения 1g и 0g.",
  },
  {
    id: "iss-cabin-atmosphere",
    title: "ISS Cabin Atmosphere (Baseline 0g)",
    category: "Reference",
    tags: ["Reference"],
    description: "Nominal atmosphere of ISS habitable modules (21% O₂, 101.3 kPa / 14.7 psi) with 5–20 cm/s HVAC ventilation falling inside the BASS U-curve flammability trough.",
    descriptionRu: "Номинальная атмосфера обитаемых модулей МКС (21% O₂, 101.3 кПа / 14.7 psi) с принудительной вентиляцией HVAC 5–20 см/с, попадающей в пик горючести по кривой BASS.",
    methodology: "Operational ECLSS parameters of ISS habitable modules in microgravity.",
    methodologyRu: "Эксплуатационные параметры СОЖ обитаемых модулей МКС в условиях микрогравитации.",
    safetyImpact: "Requires strict material screening, ventilation shutoff protocols, and photoelectric smoke detection.",
    safetyImpactRu: "Требует строгого отбора материалов, протоколов отключения вентиляции и фотоэлектрических дымовых датчиков.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA ISS Environmental Control Reference",
    evidence: "Target operational baseline for BASS/BASS-II, SAME, and ACME.",
    evidenceRu: "Целевой режим для BASS/BASS-II, SAME и ACME.",
  },
  {
    id: "exploration-atmosphere-sea-lunar-mars",
    title: "Exploration Atmosphere (SEA · Lunar & Mars)",
    category: "Reference",
    tags: ["Reference", "Prevention"],
    description: "EAWG-recommended atmosphere (34% O₂ at 56.5 kPa / 8.2 psi) for lunar habitats and rovers — minimizes EVA pre-breathe time while significantly increasing material flammability.",
    descriptionRu: "Рекомендованная группой EAWG атмосфера (34% O₂ при 56.5 кПа / 8.2 psi, либо ≥30% O₂ при ≤10.2 psi) для лунных баз и роверов — минимизирует время десатурации перед EVA, но резко повышает горючесть.",
    methodology: "Normative NASA Exploration Atmospheres Working Group profile for Artemis, Gateway, and pressurized rovers.",
    methodologyRu: "Нормативный профиль NASA Exploration Atmospheres Working Group для программ Artemis, Gateway и лунных роверов.",
    safetyImpact: "Elevated O₂ mole fraction requires re-qualifying spacecraft materials via SoFIE and ACME BRE.",
    safetyImpactRu: "Увеличение O₂ >40% относительно Земли требует переоценки горючести всех материалов через SoFIE и ACME BRE.",
    sourceUrl: "https://psi.nasa.gov/",
    sourceTitle: "NASA EAWG Exploration Atmospheres Report",
    evidence: "Target 8.2 psia / 34% O₂ regime for Lunar and Martian habitats.",
    evidenceRu: "Целевой режим 8.2 psia / 34% O₂ для обитаемых сред Луны и Марса.",
  },
]

const datasetsEn: Record<string, Dataset[]> = {
  "flex-1": [
    {
      id: "ds-flex1-methanol-extinction",
      source_id: "src-flex-1",
      title: "Methanol: Burn Duration to Radiative Extinction (21% O₂, ~760 Torr)",
      chart_type: "bar",
      locator: "NASA/TP-2015-216046 · Table IX",
      notes: "CIR/MDCA methanol droplet burn tests terminating in radiative extinction (760–764.2 mmHg).",
      x_label: "Test Run",
      y_label: "Burn Duration to Extinction",
      units: { x: null, y: "s" },
      provenance: "reported",
      series: [
        {
          id: "burn-time",
          label: "Burn Duration (s)",
          points: [
            { x: "FLEX-003 (1.61 mm)", y: 3.2 },
            { x: "FLEX-002 (1.86 mm)", y: 5.0 },
            { x: "FLEX-005 (1.92 mm)", y: 6.34 },
            { x: "FLEX-004 (2.06 mm)", y: 7.64 },
            { x: "FLEX-006 (2.54 mm)", y: 9.6 },
          ],
        },
        {
          id: "initial-diameter",
          label: "Initial Diameter (mm)",
          points: [
            { x: "FLEX-003 (1.61 mm)", y: 1.61 },
            { x: "FLEX-002 (1.86 mm)", y: 1.86 },
            { x: "FLEX-005 (1.92 mm)", y: 1.92 },
            { x: "FLEX-004 (2.06 mm)", y: 2.06 },
            { x: "FLEX-006 (2.54 mm)", y: 2.54 },
          ],
        },
      ],
    },
  ],
  "bass-bass-ii-bass-m": [
    {
      id: "ds-bass-u-curve",
      source_id: "src-bass-bass-ii-bass-m",
      title: "SIBAL Concurrent Flow Boundary Tests in 0g (BASS-II)",
      chart_type: "bar",
      locator: "NASA/TM-20210011385 · Table 7.1",
      notes: "Reported O₂ concentrations at quenching or blowoff across concurrent flow runs for flat SIBAL fabrics in MSG.",
      x_label: "Test Run (Final Flow)",
      y_label: "Reported O₂ Concentration",
      units: { x: null, y: "% O₂" },
      provenance: "reported",
      series: [
        {
          id: "sibal-loc-0g",
          label: "SIBAL Concurrent Tests (% O₂)",
          points: [
            { x: "GMT45-T4 (2.2 cm/s, Quenched)", y: 18.7 },
            { x: "GMT100-T13 (2.2 cm/s, Quenched)", y: 17.5 },
            { x: "GMT175-T18 (2.6 cm/s, Quenched)", y: 17.4 },
            { x: "GMT178-T14 (2.8 cm/s, Quenched)", y: 16.9 },
            { x: "GMT190-T20 (3.0 cm/s, Quenched)", y: 17.2 },
            { x: "GMT190-T22 (5.0 cm/s, Quenched)", y: 17.1 },
            { x: "GMT190-T21 (47 cm/s, Blow-off)", y: 17.2 },
          ],
        },
      ],
    },
  ],
  "saffire-i-iii": [
    {
      id: "ds-saffire-scale",
      source_id: "src-saffire-i-iii",
      title: "Saffire I–III: Concurrent SIBAL Flame Spread Rate Aboard Cygnus",
      chart_type: "bar",
      locator: "NASA NTRS 20180005168 · Table 1",
      notes: "Measured microgravity concurrent spread rates for Cotton-Fiberglass (SIBAL) samples across Saffire I–III.",
      x_label: "Sample (Airflow, Width)",
      y_label: "Flame Spread Rate",
      units: { x: null, y: "mm/s" },
      provenance: "reported",
      series: [
        {
          id: "saffire-sibal-rate",
          label: "Spread Rate (mm/s)",
          points: [
            { x: "Saffire I-1 (20 cm/s, 40.6 cm)", y: 1.8 },
            { x: "Saffire II-5 (20 cm/s, 5 cm)", y: 2.1 },
            { x: "Saffire II-6 (25 cm/s, 5 cm)", y: 2.6 },
            { x: "Saffire III-1 (25 cm/s, 40.6 cm)", y: 2.3 },
          ],
        },
      ],
    },
  ],
}

const datasetsRu: Record<string, Dataset[]> = {
  "flex-1": [
    {
      id: "ds-flex1-methanol-extinction",
      source_id: "src-flex-1",
      title: "Метанол: время горения до затухания (21% O₂, ~760 мм рт. ст.)",
      chart_type: "bar",
      locator: "NASA/TP-2015-216046 · Table IX",
      notes: "Данные испытаний капель метанола в стойке CIR/MDCA, завершившихся радиационным затуханием (760–764.2 мм рт. ст.).",
      x_label: "Серия испытания",
      y_label: "Время горения до затухания",
      units: { x: null, y: "с" },
      provenance: "reported",
      series: [
        {
          id: "burn-time",
          label: "Время горения (с)",
          points: [
            { x: "FLEX-003 (1.61 мм)", y: 3.2 },
            { x: "FLEX-002 (1.86 мм)", y: 5.0 },
            { x: "FLEX-005 (1.92 мм)", y: 6.34 },
            { x: "FLEX-004 (2.06 мм)", y: 7.64 },
            { x: "FLEX-006 (2.54 мм)", y: 9.6 },
          ],
        },
        {
          id: "initial-diameter",
          label: "Начальный диаметр (мм)",
          points: [
            { x: "FLEX-003 (1.61 мм)", y: 1.61 },
            { x: "FLEX-002 (1.86 мм)", y: 1.86 },
            { x: "FLEX-005 (1.92 мм)", y: 1.92 },
            { x: "FLEX-004 (2.06 мм)", y: 2.06 },
            { x: "FLEX-006 (2.54 мм)", y: 2.54 },
          ],
        },
      ],
    },
  ],
  "bass-bass-ii-bass-m": [
    {
      id: "ds-bass-u-curve",
      source_id: "src-bass-bass-ii-bass-m",
      title: "Испытания SIBAL в спутном потоке в 0g (BASS-II)",
      chart_type: "bar",
      locator: "NASA/TM-20210011385 · Table 7.1",
      notes: "Опубликованные значения концентрации O₂ при затухании или срыве пламени для плоских образцов SIBAL в спутном потоке в MSG.",
      x_label: "Прогон (итоговый поток)",
      y_label: "Концентрация O₂",
      units: { x: null, y: "% O₂" },
      provenance: "reported",
      series: [
        {
          id: "sibal-loc-0g",
          label: "SIBAL в спутном потоке (% O₂)",
          points: [
            { x: "GMT45-T4 (2.2 см/с, затухание)", y: 18.7 },
            { x: "GMT100-T13 (2.2 см/с, затухание)", y: 17.5 },
            { x: "GMT175-T18 (2.6 см/с, затухание)", y: 17.4 },
            { x: "GMT178-T14 (2.8 см/с, затухание)", y: 16.9 },
            { x: "GMT190-T20 (3.0 см/с, затухание)", y: 17.2 },
            { x: "GMT190-T22 (5.0 см/с, затухание)", y: 17.1 },
            { x: "GMT190-T21 (47 см/с, срыв)", y: 17.2 },
          ],
        },
      ],
    },
  ],
  "saffire-i-iii": [
    {
      id: "ds-saffire-scale",
      source_id: "src-saffire-i-iii",
      title: "Saffire I–III: скорость распространения пламени по SIBAL (спутный поток)",
      chart_type: "bar",
      locator: "NASA NTRS 20180005168 · Table 1",
      notes: "Измеренные в микрогравитации скорости распространения пламени по образцам Cotton-Fiberglass (SIBAL) в спутном потоке.",
      x_label: "Образец (поток, ширина)",
      y_label: "Скорость пламени",
      units: { x: null, y: "мм/с" },
      provenance: "reported",
      series: [
        {
          id: "saffire-sibal-rate",
          label: "Скорость фронта (мм/с)",
          points: [
            { x: "Saffire I-1 (20 см/с, 40.6 см)", y: 1.8 },
            { x: "Saffire II-5 (20 см/с, 5 см)", y: 2.1 },
            { x: "Saffire II-6 (25 см/с, 5 см)", y: 2.6 },
            { x: "Saffire III-1 (25 см/с, 40.6 см)", y: 2.3 },
          ],
        },
      ],
    },
  ],
}

export const mockDatasets: Record<string, Dataset[]> = datasetsEn

const mediaBilingual: Record<string, { id: string; source_id: string; url: string; en: string; ru: string }[]> = {
  FLEX: [
    {
      id: "med-flex-gif",
      source_id: "src-flex-1",
      url: "/nasa-content/nasa-research-media/01_FLEX_Flame_Extinguishment/flex_cool_flame_extinction_iss.gif",
      en: "Hot droplet flame radiative extinction and transition to cool flame (NASA jsc2021m000185)",
      ru: "Затухание горячего пламени капли и переход в холодное пламя (NASA jsc2021m000185)",
    },
    {
      id: "med-flex-nyberg",
      source_id: "src-flex-1",
      url: "/nasa-content/nasa-research-media/01_FLEX_Flame_Extinguishment/flex_mdca_astronaut_karen_nyberg_iss037e004956.jpg",
      en: "Astronaut Karen Nyberg operating the CIR / MDCA rack aboard the ISS (iss037e004956)",
      ru: "Астронавт Карен Найберг работает со стойкой CIR / MDCA на борту МКС (iss037e004956)",
    },
    {
      id: "med-flex-mdca",
      source_id: "src-flex-1",
      url: "/nasa-content/nasa-research-media/01_FLEX_Flame_Extinguishment/flex_mdca_chamber_insert_assembly_iss036e024637.jpg",
      en: "MDCA chamber insert assembly and droplet deployment needles in CIR (iss036e024637)",
      ru: "Камерная вставка MDCA и иглы-инжекторы жидких капель в CIR (iss036e024637)",
    },
  ],
  SAME: [
    {
      id: "med-same-anderson",
      source_id: "src-same-same-r",
      url: "/nasa-content/nasa-research-media/02_SAME_Smoke_Aerosols/same_hardware_msg_glovebox_anderson_iss015e27411.jpg",
      en: "Astronaut Clayton Anderson conducting the SAME experiment inside MSG (iss015e27411)",
      ru: "Астронавт Клейтон Андерсон проводит эксперимент SAME в перчаточном боксе MSG (iss015e27411)",
    },
    {
      id: "med-same-duct",
      source_id: "src-same-same-r",
      url: "/nasa-content/nasa-research-media/02_SAME_Smoke_Aerosols/same_hardware_flow_duct_anderson_iss015e27425.jpg",
      en: "SAME smoke aerosol aging flow duct inside the MSG glovebox (iss015e27425)",
      ru: "Проточный канал старения аэрозолей дыма SAME внутри MSG (iss015e27425)",
    },
  ],
  BASS: [
    {
      id: "med-bass-flame",
      source_id: "src-bass-bass-ii-bass-m",
      url: "/nasa-content/nasa-research-media/03_BASS_Burning_Suppression_Solids/bass_ii_combustion_view_wiseman_iss040e088023.jpg",
      en: "Solid sample burning inside the SPICE / MSG wind-tunnel duct during BASS-II (iss040e088023)",
      ru: "Горение образца в аэродинамическом канале SPICE / MSG в эксперименте BASS-II (iss040e088023)",
    },
    {
      id: "med-bass-wiseman",
      source_id: "src-bass-bass-ii-bass-m",
      url: "/nasa-content/nasa-research-media/03_BASS_Burning_Suppression_Solids/bass_ii_experiment_msg_wiseman_iss040e086481.jpg",
      en: "Astronaut Reid Wiseman observing BASS-II flame spread inside MSG (iss040e086481)",
      ru: "Астронавт Рид Уайзман наблюдает за пламенем BASS-II в боксе MSG (iss040e086481)",
    },
  ],
  ACME: [
    {
      id: "med-acme-gif",
      source_id: "src-acme-bre",
      url: "/nasa-content/nasa-research-media/04_ACME_Advanced_Combustion/acme_microgravity_flame_experiment.gif",
      en: "Spherical and diffusion gaseous flame in ACME in microgravity (GRC-2020-CM-0167.3)",
      ru: "Сферическое и диффузионное газовое пламя ACME в микрогравитации (GRC-2020-CM-0167.3)",
    },
    {
      id: "med-acme-cir",
      source_id: "src-acme-bre",
      url: "/nasa-content/nasa-research-media/04_ACME_Advanced_Combustion/acme_flame_design_hardware_cir_iss059e103188.jpg",
      en: "ACME gas burner hardware installed in the CIR rack aboard the ISS (iss059e103188)",
      ru: "Аппаратура газовых горелок ACME в стойке CIR на МКС (iss059e103188)",
    },
  ],
  SoFIE: [
    {
      id: "med-sofie-gif",
      source_id: "src-sofie-mist",
      url: "/nasa-content/nasa-research-media/05_SoFIE_Solid_Fuel_Ignition/sofie_gel_flame_spin_extinction.gif",
      en: "Spiral flame propagation and extinction over a solid PMMA sphere in 0g (SoFIE-GEL)",
      ru: "Спиральное распространение и затухание пламени по твёрдому образцу SoFIE в 0g (SoFIE-GEL)",
    },
    {
      id: "med-sofie-pmma",
      source_id: "src-sofie-mist",
      url: "/nasa-content/nasa-research-media/05_SoFIE_Solid_Fuel_Ignition/sofie_mist_imagery_sample_jsc2024e053517.jpg",
      en: "Cylindrical PMMA rods tested under Lunar SEA atmosphere in SoFIE-MIST (jsc2024e053517)",
      ru: "Цилиндрические образцы PMMA для испытаний в атмосфере Луны SEA в SoFIE-MIST (jsc2024e053517)",
    },
  ],
  Saffire: [
    {
      id: "med-saffire-gif",
      source_id: "src-saffire-i-iii",
      url: "/nasa-content/nasa-research-media/06_Saffire_Spacecraft_Fire/saffire_v_cygnus_large_scale_fire.gif",
      en: "Full-scale flame spread aboard the Cygnus spacecraft in Saffire (GRC-2021-CN-00008)",
      ru: "Крупномасштабное распространение пламени на борту корабля Cygnus в Saffire (GRC-2021-CN-00008)",
    },
    {
      id: "med-saffire-sibal",
      source_id: "src-saffire-i-iii",
      url: "/nasa-content/nasa-research-media/06_Saffire_Spacecraft_Fire/saffire_iv_fabric_burn_sibal_jsc2023e046375.jpg",
      en: "Flame front propagating across SIBAL fabric in the Saffire flow duct (jsc2023e046375)",
      ru: "Фронт пламени по ткани SIBAL в полномасштабном отсеке Saffire (jsc2023e046375)",
    },
  ],
  Reference: [
    {
      id: "med-ref-cir",
      source_id: "src-earth-baseline-nasa-std-6001-test-1",
      url: "/nasa-content/nasa-research-media/07_NASA_STD_6001_Baselines/cir_combustion_chamber_maintenance_kimbrough_iss066e031702.jpg",
      en: "CIR combustion chamber maintenance aboard the ISS (iss066e031702)",
      ru: "Обслуживание камеры сгорания CIR на борту МКС (iss066e031702)",
    },
  ],
}

export function getProgramMedia(category: string, locale: Locale = "en"): Media[] {
  const list = mediaBilingual[category] ?? mediaBilingual.Reference ?? []
  return list.map((item) => ({
    id: item.id,
    source_id: item.source_id,
    media_type: "image" as const,
    url: item.url,
    caption: locale === "ru" ? item.ru : item.en,
  }))
}

export const programMediaByCategory: Record<string, Media[]> = Object.fromEntries(
  Object.keys(mediaBilingual).map((cat) => [cat, getProgramMedia(cat, "en")]),
)

const categoryDatasetLead: Record<string, string> = {
  FLEX: "flex-1",
  BASS: "bass-bass-ii-bass-m",
  SAME: "same-same-r",
  ACME: "acme-bre",
  SoFIE: "sofie-mist",
  Saffire: "saffire-i-iii",
  SPICE: "acme-bre",
  DAFT: "same-same-r",
  Reference: "bass-bass-ii-bass-m",
}

export function getDatasetsForStudy(id: string, category?: string, locale: Locale = "en"): Dataset[] {
  const dict = locale === "ru" ? datasetsRu : datasetsEn
  if (dict[id]?.length) return dict[id]
  const cat = category ?? seeds.find((s) => s.id === id)?.category ?? ""
  const leadId = categoryDatasetLead[cat]
  return leadId ? (dict[leadId] ?? []) : []
}

export function getMockStudies(locale: Locale = "en"): StudySummary[] {
  return seeds.map((s) => {
    const media = getProgramMedia(s.category, locale)
    return {
      id: s.id,
      title: s.title,
      description: locale === "ru" ? s.descriptionRu : s.description,
      category: s.category,
      tags: s.tags,
      thumbnail_url: media[0]?.url ?? null,
    }
  })
}

export const mockStudies: StudySummary[] = getMockStudies("en")

export function getMockStudyDetail(id: string, locale: Locale = "en"): StudyDetail | undefined {
  const s = seeds.find((item) => item.id === id)
  if (!s) return undefined
  const ru = locale === "ru"
  const sourceId = `src-${s.id}`
  const findingId = `fnd-${s.id}`
  const quick = getQuickMeta(s.id, locale)
  const datasets = getDatasetsForStudy(s.id, s.category, locale)
  const media = getProgramMedia(s.category, locale)
  const description = ru ? s.descriptionRu : s.description
  const methodology = ru ? s.methodologyRu : s.methodology
  const safetyImpact = ru ? s.safetyImpactRu : s.safetyImpact
  const evidence = ru ? s.evidenceRu : s.evidence

  return {
    id: s.id,
    title: s.title,
    description,
    category: s.category,
    tags: s.tags,
    thumbnail_url: media[0]?.url ?? null,
    methodology,
    conditions: quick
      ? {
          ...quick.conditions,
          facility: quick.facility,
          fuel_state: quick.fuelState,
          fuel_material: quick.fuelMaterial,
          sample_size_mm: quick.sampleSizeMm,
          principal_investigators: quick.pi,
        }
      : {},
    sources: [
      {
        id: sourceId,
        study_id: s.id,
        title: s.sourceTitle,
        url: s.sourceUrl,
        source_type: "report",
      },
    ],
    findings: [
      {
        id: findingId,
        source_id: sourceId,
        claim: description,
        evidence,
        locator: s.locator ?? null,
        safety_impact: safetyImpact,
      },
    ],
    media,
    datasets: datasets.map(({ id: dId, source_id, title, chart_type, locator, notes }) => ({
      id: dId,
      source_id,
      title,
      chart_type,
      locator,
      notes,
    })),
    safety_implications: [
      {
        finding_id: findingId,
        source_id: sourceId,
        text: safetyImpact,
      },
    ],
  }
}

export const mockStudyDetails: Record<string, StudyDetail> = Object.fromEntries(
  seeds.map((s) => [s.id, getMockStudyDetail(s.id, "en")!]),
)

interface BilingualRelation {
  id: string
  from_study_id: string
  to_study_id: string
  relation_type: Relation["relation_type"]
  explanationEn: string
  explanationRu: string
  source_id: string
  source_url: string
  excerptEn: string
  excerptRu: string
  locator: string | null
}

const relationsBilingual: BilingualRelation[] = [
  {
    id: "rel-flex1-flex2",
    from_study_id: "flex-1",
    to_study_id: "flex-2-cfi",
    relation_type: "complements",
    explanationEn: "FLEX-2/CFI extends FLEX-1's invisible cool-flame discovery to heavier alkanes, mixtures, and binary droplets with reignition risk.",
    explanationRu: "FLEX-2/CFI расширяет открытие невидимого холодного пламени FLEX-1 на тяжёлые алканы, смеси и двойные капли с риском повторного воспламенения.",
    source_id: "src-flex-2-cfi",
    source_url: "https://psi.nasa.gov/",
    excerptEn: "Discovered two-stage combustion and cool-flame reignition back to hot flame.",
    excerptRu: "Обнаружено двухстадийное горение и возврат холодного пламени в горячее.",
    locator: "PSI FLEX-2",
  },
  {
    id: "rel-flex1-cfig",
    from_study_id: "flex-1",
    to_study_id: "acme-cfi-g",
    relation_type: "supports",
    explanationEn: "ACME CFI-G translated cool-flame chemistry from FLEX liquid droplets to non-premixed gaseous diffusion flames.",
    explanationRu: "ACME CFI-G перенёс физику холодных пламён с жидких капель FLEX на неперемешанные газовые диффузионные пламёна.",
    source_id: "src-acme-cfi-g",
    source_url: "https://science.nasa.gov/mission/acme/",
    excerptEn: "Direct link between FLEX droplet cool flames and ACME gaseous cool flames.",
    excerptRu: "Прямая связь открытий холодного пламени капель FLEX с газовым пламенем ACME.",
    locator: "ACME CFI-G",
  },
  {
    id: "rel-bass-saffire",
    from_study_id: "bass-bass-ii-bass-m",
    to_study_id: "saffire-i-iii",
    relation_type: "complements",
    explanationEn: "Saffire I–III scales solid fabric flammability data from the small MSG/SPICE duct (BASS) up to a full Cygnus spacecraft cabin.",
    explanationRu: "Saffire I–III масштабирует данные о горючести твёрдых тканей из малого канала MSG/SPICE (BASS) на реальный объём корабля Cygnus.",
    source_id: "src-saffire-i-iii",
    source_url: "https://ntrs.nasa.gov/citations/20180005168",
    excerptEn: "In a large spacecraft enclosure, flame spread is slower than in the small BASS duct.",
    excerptRu: "В большом отсеке пламя распространяется медленнее, чем в малом канале BASS.",
    locator: "Saffire I-III",
  },
  {
    id: "rel-bass-std6001",
    from_study_id: "bass-bass-ii-bass-m",
    to_study_id: "earth-baseline-nasa-std-6001-test-1",
    relation_type: "contradicts",
    explanationEn: "BASS-II showed that under low airflow in 0g, solid polymers (PMMA rods) survived down to 13.6% O₂ — below the 15.4% 1g upward limit (§6.1.4.2) and well below 21% air screening.",
    explanationRu: "BASS-II показал, что при слабом обдуве в 0g полимерные образцы (стержни PMMA) горели до 13.6% O₂ — ниже земного предела 15.4% O₂ (§6.1.4.2) и ниже порога NASA-STD-6001 Test 1.",
    source_id: "src-bass-bass-ii-bass-m",
    source_url: "https://ntrs.nasa.gov/citations/20210011385",
    excerptEn: "PMMA rod O13a survived to 13.6% final O₂ (§6.1.4.2); flat concurrent SIBAL quenched at 16.9–18.7% O₂ (Table 7.1).",
    excerptRu: "Стержень PMMA O13a горел до 13.6% O₂ (§6.1.4.2); плоская ткань SIBAL в спутном потоке гасла при 16.9–18.7% O₂ (Table 7.1).",
    locator: "NASA/TM-20210011385",
  },
  {
    id: "rel-sofie-exploration",
    from_study_id: "sofie-mist",
    to_study_id: "exploration-atmosphere-sea-lunar-mars",
    relation_type: "supports",
    explanationEn: "SoFIE-MIST tests ignition and extinction limits of solid polymers directly under reduced-pressure Exploration Atmosphere (SEA) conditions.",
    explanationRu: "SoFIE-MIST проверяет пределы воспламенения и затухания твёрдых полимеров именно в пониженном давлении атмосферы Exploration (SEA).",
    source_id: "src-sofie-mist",
    source_url: "https://psi.nasa.gov/",
    excerptEn: "Extends BASS findings into subatmospheric 56.5 kPa / 34% O₂ regimes.",
    excerptRu: "Расширяет выводы BASS на субатмосферные режимы 56.5 кПа / 34% O₂.",
    locator: "ICES-2023-133",
  },
  {
    id: "rel-bre-exploration",
    from_study_id: "acme-bre",
    to_study_id: "exploration-atmosphere-sea-lunar-mars",
    relation_type: "supports",
    explanationEn: "ACME BRE emulates condensed-phase burning rates in quiescent air at 21–34% O₂ and 50.7–101.3 kPa.",
    explanationRu: "ACME BRE моделирует скорость горения твёрдых материалов в штиле при 21–34% O₂ и 50.7–101.3 кПа.",
    source_id: "src-acme-bre",
    source_url: "https://science.nasa.gov/mission/acme/",
    excerptEn: "Steady burning for minutes in zero airflow at elevated O₂.",
    excerptRu: "Устойчивое горение в течение минут при нулевом потоке воздуха при повышенном O₂.",
    locator: "ACME BRE",
  },
  {
    id: "rel-same-saffire",
    from_study_id: "same-same-r",
    to_study_id: "saffire-iv-v",
    relation_type: "complements",
    explanationEn: "SAME characterizes smoke particle size distributions in MSG, while Saffire IV–V tests detector response delay and air scrubbing in a full spacecraft volume.",
    explanationRu: "SAME характеризует размер частиц дыма в MSG, а Saffire IV–V проверяет задержку срабатывания датчиков и очистку воздуха в реальном отсеке.",
    source_id: "src-same-same-r",
    source_url: "https://psi.nasa.gov/",
    excerptEn: "Smoke particle morphology data complements large-scale detector tests.",
    excerptRu: "Данные по морфологии частиц дыма дополняют крупномасштабные испытания детекторов.",
    locator: "SAME",
  },
  {
    id: "rel-slice-cld",
    from_study_id: "slice-acme-cld-precursor",
    to_study_id: "acme-cld-flame",
    relation_type: "similar",
    explanationEn: "SLICE in MSG/SPICE served as the direct pathfinder experiment for the coflow laminar diffusion flame (ACME CLD Flame) in the CIR rack.",
    explanationRu: "SLICE в MSG/SPICE выступил пилотным экспериментом для коаксиального ламинарного пламени ACME CLD Flame в стойке CIR.",
    source_id: "src-slice-acme-cld-precursor",
    source_url: "https://ntrs.nasa.gov/citations/20160012298",
    excerptEn: "Direct precursor to ACME CLD Flame linking MSG and CIR diagnostics.",
    excerptRu: "Прямой предшественник ACME CLD Flame, связавший диагностику MSG и CIR.",
    locator: "PSI SLICE",
  },
]

export function getMockRelations(locale: Locale = "en"): Relation[] {
  const ru = locale === "ru"
  return relationsBilingual.map((r) => ({
    id: r.id,
    from_study_id: r.from_study_id,
    to_study_id: r.to_study_id,
    relation_type: r.relation_type,
    explanation: ru ? r.explanationRu : r.explanationEn,
    source_id: r.source_id,
    source_url: r.source_url,
    evidence: {
      excerpt: ru ? r.excerptRu : r.excerptEn,
      locator: r.locator,
    },
  }))
}

export const mockRelations: Relation[] = getMockRelations("en")
