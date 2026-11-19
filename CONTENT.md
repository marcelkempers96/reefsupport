# Content

All copy and data for reef.support. Rules in `CLAUDE.md` apply to every line. Convert the YAML blocks to `src/data/*.json`; turn page sections into Astro pages or content collection entries. `[TO CONFIRM]` values render visibly in dev only.

## 1. Company facts

```yaml
company:
  legalName: Reef Support B.V.
  kvk: "82884064"
  vat: "[TO CONFIRM]"
  registeredAddress: Herengracht 551, 1017 BW Amsterdam, Netherlands
  workingBase: Delft, Netherlands
  founded: "2020"            # write "since 2020" until the KvK date is confirmed
  founders: [Marcel Kempers, Yohan Runhaar]
  email: "[TO CONFIRM: hello@reef.support or info@reef.support]"
  phone: "+31 6 41 57 14 62"
  social:
    linkedin: https://www.linkedin.com/company/reefsupport/
    github: https://github.com/reefsupport
    huggingface: https://huggingface.co/reefsupport
    instagram: https://instagram.com/reefsupport
flags:
  showFundingTotal: false    # "Over EUR 1.2 million in EU, UN and ESA funding" until breakdown confirmed
```

Bank details never appear on the public site.

**Tagline and default meta description:** Evidence for healthy coasts: AI, field data and earth observation for coral reefs, mangroves and coastal waters.

**Short description (footer, directories, llms.txt):** Reef Support B.V. is a Dutch marine technology company that builds AI models and monitoring workflows for coral reefs, mangroves and coastal waters, and delivers them with research institutes, restoration organisations and coastal authorities in Europe, Southeast Asia and Latin America.

**Long description (About, funder forms):** Reef Support B.V. was founded in Delft in 2020 by TU Delft graduates Marcel Kempers and Yohan Runhaar and won the ESA Copernicus Masters Overall Prize the same year. The company develops open AI models for coral reef image analysis, mangrove and blue carbon monitoring methods, and earth observation workflows for coastal water quality, and runs them in projects with partners who hold the field presence and measurement assets. Its work includes a coral restoration lab in Lombok built with Indonesia Biru Foundation, 3D photogrammetry for reef restoration in Colombia supported by WWF Netherlands, and open AI challenges with FruitPunch AI, Sustainable Ocean Alliance and OceanHub Africa.

## 2. Sitemap

Header: Work · Projects · Research · Insights · About · [Contact] · Search

| Route | Page |
| --- | --- |
| `/` | Home |
| `/work` | Work index |
| `/work/coral-reefs` · `/work/mangroves-blue-carbon` · `/work/coastal-water` · `/work/field-programmes` | Practice areas |
| `/projects` · `/projects/[slug]` | Project index (filter by area, country, status) and case studies |
| `/research` · `/research/open-source` · `/research/publications` · `/research/hackathons` · `/research/methods` | Research |
| `/insights` · `/insights/[slug]` | Field notes, news, events |
| `/about` · `/about/team` · `/about/partners` · `/about/media` · `/about/policies` · `/about/opportunities` | About |
| `/contact` | Contact |
| `/privacy` · `/cookies` · `/accessibility` · `/404` | Legal and error pages |

Footer columns: Work (four areas) · Company (About, Team, Partners, Research, Contact) · Connect (LinkedIn, GitHub, Hugging Face, Instagram).

## 3. Home

- **Video hero kicker:** Reef Support · Marine technology and research
- **Headline:** Evidence for healthy coasts
- **Lead:** We build AI models and monitoring methods for coral reefs, mangroves and coastal waters, and run them with the organisations that work on the water.
- **Buttons:** Explore our work (`/work`) · Try Coral AI (`/research/open-source`)
- **Hero strip:** footage credit · "Featured: Coral Lab, Lombok →" (`/projects/coral-lab-lombok`) · Pause
- **Facts strip:** Founded: 2020, Delft · Award: ESA Copernicus Masters Overall Prize 2020 · Project work: Indonesia, Colombia, Netherlands · Open AI challenges: 6 since 2021 · Open models: Coral AI on Hugging Face
- **Practice areas** (H2 "Four areas of work, one way of working"): four tiles from section 4
- **Recent projects** (H2): Coral Lab, Lombok · Coral AI · 3D photogrammetry for reef restoration
- **Statement panel** (kicker "Why we exist"): Most coral and mangrove monitoring still depends on photos and notebooks reviewed by hand. We make that data faster to analyse and easier to report. Link: How we work → `/about`
- **Partner wall** (H2 "We have worked with"): Indonesia Biru Foundation, TU Delft, WWF Netherlands, ESA BIC Noordwijk, Sustainable Ocean Alliance, RanMarine Technology, Water Insight, Corales de Paz, FruitPunch AI, OceanHub Africa, Copernicus Accelerator, Zindi
- **Newsletter:** "Field notes, about once a month" · Project updates, open models and opportunities to collaborate.

## 4. Work and practice areas

**Work index.** Kicker: Work. H1: What we do. Lead: Reef Support works in four practice areas. In each one we design the monitoring, integrate partner data, run the analysis and produce the reporting, while partners hold the field presence and measurement assets. Then the four tiles and the "How we work" table.

**How we work table (Work and About):**

| Role | Who holds it |
| --- | --- |
| Monitoring design, data integration, AI analysis, reporting | Reef Support |
| Satellite water quality products | Water Insight B.V. |
| Autonomous vessels and in-situ collection | RanMarine Technology B.V. |
| Local leadership and field teams | Indonesia Biru Foundation (Lombok), AV Soluciones S.A.S. (Colombia) |

```yaml
areas:
  - no: "01"
    slug: coral-reefs
    name: Coral reef intelligence
    colour: royal
    tile: Open AI models and 3D photogrammetry for reef surveys and restoration.
    lead: Reef surveys produce more images than scientists can classify by hand. We build open segmentation models and 3D reconstruction methods that turn survey photos into coral cover and structure measurements.
    whatWeDo:
      - [Image segmentation, "Coral AI labels reef photos by coral type, algae, rubble and sand, so transect cover estimates come straight from survey images."]
      - [3D photogrammetry, "Diver-captured image sets become 3D reef models for rugosity, growth and restoration tracking."]
      - [Restoration monitoring, "Before-and-after measurement of restoration sites, reported in the format partners and funders need."]
    projects: [coral-ai, photogrammetry-colombia, coral-lab-lombok, singapore-oceanarium]
    partners: [FruitPunch AI, Corales de Paz, WWF Netherlands, Zindi, ML6, University of Amsterdam]
  - no: "02"
    slug: mangroves-blue-carbon
    name: Mangroves and blue carbon
    colour: navy
    tile: Survival, growth and carbon monitoring for community restoration.
    lead: Restoration projects need survival, growth and carbon estimates that funders and communities can trust. We provide the monitoring layer, from field records to reporting, alongside local partners who lead the work.
    whatWeDo:
      - [Field data collection, "GPS-tagged records of planting, survival and growth, collected by community teams in their own language and working offline."]
      - [Growth and carbon estimation, "Models that estimate growth and carbon uptake from field records, currently being calibrated with partner data."]
      - [Adaptation and finance reporting, "Monitoring outputs shaped for ecosystem-based adaptation funders and blue carbon feasibility work."]
    projects: [mangrove-ai, akar-biru-lombok]
    partners: [Indonesia Biru Foundation]
  - no: "03"
    slug: coastal-water
    name: Coastal water and earth observation
    colour: teal
    tile: Satellite, sensor and field data combined into indicators and reports.
    lead: Coastal authorities now report ecosystem condition under the EU Nature Restoration Regulation and the Water Framework Directive. We combine satellite water quality products, in-situ data and field observations from partners into indicators and reports.
    whatWeDo:
      - [Data integration, "Satellite products from specialist providers, sensor and vessel data and field observations, harmonised by site and reporting period."]
      - [Bloom and debris detection R&D, "Algae Tracker and Plastic Tracker tested Copernicus Sentinel-2 and -3 detection of cyanobacteria and floating debris."]
      - [Reporting for obligations, "Indicators and reports structured for Nature Restoration Regulation and Water Framework Directive reporting, delivered with accredited partners."]
    projects: [algae-tracker, plastic-tracker, coastal-gis]
    partners: [Water Insight B.V., RanMarine Technology B.V., ESA BIC Noordwijk, Copernicus]
  - no: "04"
    slug: field-programmes
    name: Field programmes and open innovation
    colour: sky
    tile: Coral Lab, open AI challenges and student research with partners.
    lead: Technology for the ocean improves when the people closest to the problem help build it. We run challenges, host student research and work inside partner programmes such as the Coral Lab in Lombok.
    whatWeDo:
      - [Partner field programmes, "Coral Lab in Lombok, built in 2021 with Indonesia Biru Foundation and TU Delft students, and run by IBF."]
      - [Open AI challenges, "Six challenges since 2021 with FruitPunch AI, Sustainable Ocean Alliance, OceanHub Africa, Zindi and others."]
      - [Student and thesis research, "MSc and minor projects with TU Delft and the University of Amsterdam that produce open methods and models."]
    projects: [coral-lab-lombok]
    partners: [Indonesia Biru Foundation, TU Delft, Sustainable Ocean Alliance, OceanHub Africa, The Nature Conservancy]
```

Practice page layout: kicker with number and colour square, H1, lead, "What we do" rows, "Projects in this area" cards, "Partners in this area" wall, "Other practice areas" tiles.

## 5. Projects

Case study layout: back link · kicker (area · country) · H1 · facts row (Location, Years, Partners, Funding, Status) · photo with 6 px bar · The problem · What we did · Outputs · funding acknowledgement panel · "Discuss a similar project" button · three related projects.

```yaml
projects:
  - slug: coral-lab-lombok
    title: Coral Lab, Lombok
    area: field-programmes
    secondaryArea: coral-reefs
    country: Indonesia
    years: 2021 to now
    status: Ongoing
    partners: Indonesia Biru Foundation, TU Delft
    funder: Sustainable Ocean Alliance (initial funding)
    image: Coral Lab tanks, Kecinan Bay
    summary: Land-based coral lab in Kecinan Bay, West Lombok, built with IBF and four TU Delft students and run by IBF.
    problem: Lombok's reefs are degrading from warming, destructive fishing and coastal development, and local groups had no land-based facility to grow and study resilient corals.
    whatWeDid: In 2021 Reef Support and Indonesia Biru Foundation set up a land-based coral lab in Kecinan Bay, West Lombok, with four TU Delft students from the Delft Centre for Entrepreneurship minor. The project set a target of restoring 500 m² of reef. The lab tests micro-fragmentation and the exposure of young corals to higher temperatures in a controlled setting, and IBF runs it day to day.
    toConfirm: "Area restored and corals planted to date, from IBF records"
    outputs: [Land-based coral nursery operated by IBF, "Coral Lab field notes, parts 1 and 2", "TU Delft coverage, 2021 (https://www.tudelft.nl/en/2021/valorisatie/ai-and-satellite-imagery-speed-up-coral-reef-protection)"]
    publish: true

  - slug: coral-ai
    title: Coral AI
    area: coral-reefs
    country: Global
    years: 2021 to now
    status: Ongoing
    partners: FruitPunch AI, ML6, Zindi, OceanHub Africa, InstaDeep, University of Amsterdam
    funder: null
    image: Segmented reef transect
    summary: Open segmentation model that turns reef survey photos into coral cover estimates, published on Hugging Face.
    problem: Coral reef surveys produce thousands of photos that divers and scientists still classify by hand, which slows reporting and limits how many sites can be monitored.
    whatWeDid: Reef Support built Coral AI to segment reef images into coral types, algae, rubble and sand, so cover estimates for transects come out of the photos directly. The model grew from open challenges with FruitPunch AI (2021), Ocean Innovation Africa and Zindi (2021) and IndabaX South Africa (2023), where the earlier GoogleNet classifier reached about 86% accuracy across six functional groups. ML6 contributed a segmentation approach built on the Seaview dataset, and Yohan Runhaar's research with University of Amsterdam support explored superpixel methods.
    outputs: ["YOLOv8 segmentation model, MIT licence (https://huggingface.co/reefsupport/coral-ai)", "Public browser demo (https://reefsupport-coral-ai-demo.hf.space)", "Superpixels to the Rescue (Runhaar, 2022) [TO CONFIRM link]", "ML6 write-up (https://www.ml6.eu/blogpost/building-a-coral-segmentation-model-using-sparse-data)"]
    publish: true

  - slug: photogrammetry-colombia
    title: 3D photogrammetry for reef restoration
    area: coral-reefs
    country: Colombia
    years: "2023"
    status: Completed
    partners: Corales de Paz, DeepCo
    funder: WWF Netherlands INNO-fonds
    image: Twin-camera rig, Caribbean coast
    summary: A twin-camera rig and 3D reef models for restoration monitoring with Corales de Paz.
    problem: Measuring reef structure and coral growth on restoration sites has meant repeated dives by teams of five or six people over several days, which few Colombian organisations can afford each year.
    whatWeDid: Reef Support ran an open call to bring photogrammetry into reef restoration monitoring, funded by WWF Netherlands' INNO-fonds. Ángela Alegría of Corales de Paz won it and built a twin-camera rig that captures about 1,500 photos per dive, processed into 3D reef models for rugosity and growth measurement. The technique has since been taught to local fishers through Corales de Paz, and the work was covered by El Tiempo.
    outputs: [Camera rig design and survey protocol, 3D models of restoration sites, "El Tiempo coverage [TO CONFIRM link]"]
    publish: true

  - slug: akar-biru-lombok
    title: Akar Biru Lombok
    area: mangroves-blue-carbon
    country: Indonesia
    years: "[TO CONFIRM start] to now"
    status: Ongoing
    partners: Indonesia Biru Foundation (lead)
    funder: null
    image: Mangrove nursery, East Lombok
    summary: IBF's community mangrove programme with women-majority cooperatives; Reef Support is the technical partner.
    problem: Coastal villages in Lombok face erosion and flooding while mangrove cover has declined, and restoration rarely produces income or decision-making power for the women who do much of the coastal work.
    whatWeDid: Akar Biru Lombok is Indonesia Biru Foundation's community mangrove programme, built around women-majority cooperatives that hold the signing rights over project revenue. IBF leads the programme and its community work; Reef Support is the technical partner for monitoring, data and reporting, with field records collected in Bahasa Indonesia. The programme was selected as a finalist in the GRP Innovation Challenge (TECH4Resilience / TECH4Nature).
    outputs: [Monitoring design and field data workflow for mangrove survival and growth, GRP Innovation Challenge finalist]
    publish: true

  - slug: mangrove-ai
    title: Mangrove AI
    area: mangroves-blue-carbon
    country: Indonesia
    years: "[TO CONFIRM start] to now"
    status: Ongoing
    partners: Indonesia Biru Foundation
    funder: null
    image: GPS-tagged seedlings
    summary: Field records and models for mangrove survival, growth and carbon estimates.
    problem: Mangrove restoration is often reported as seedlings planted, while funders and communities need to know how many survive, how they grow and how much carbon they store.
    whatWeDid: Mangrove AI records planting, survival and growth through GPS-tagged field observations and estimates growth and carbon uptake from them. The growth and sequestration models are still being calibrated with partner field data, so outputs are presented as estimates until validation is complete.
    outputs: [Field survey protocol for mangrove growth, Growth and carbon models in calibration, Monitoring layer for Akar Biru Lombok]
    publish: true

  - slug: algae-tracker
    title: Algae Tracker
    area: coastal-water
    country: Europe
    years: 2022 to now
    status: Ongoing R&D
    partners: "RanMarine Technology [TO CONFIRM role]"
    funder: null
    image: Sentinel-2 bloom map
    summary: Detection of bloom indicators from Copernicus Sentinel-2 and Sentinel-3 imagery.
    problem: Harmful algal blooms spread quickly in rivers, harbours and coastal water, and point sampling misses where and when they start.
    whatWeDid: Algae Tracker tested detection of cyanobacteria (through phycocyanin), turbidity, surface temperature and salinity from enhanced Copernicus imagery, focused on European waters. RanMarine's WasteShark collections offered a way to compare detections with biomass actually removed from the water. Satellite products are credited to their source.
    outputs: [Detection prototypes for bloom indicators, Comparison approach with in-water collection data]
    publish: true

  - slug: plastic-tracker
    title: Plastic Tracker
    area: coastal-water
    country: Netherlands, Romania
    years: 2022 to 2023
    status: Closed
    partners: null
    funder: null
    image: River debris hotspot
    summary: Satellite detection of floating debris in rivers and coastal water, with two case studies.
    problem: Floating plastic in rivers and coastal water collects in hotspots that clean-up teams struggle to find in time.
    whatWeDid: Plastic Tracker trained models on enhanced satellite imagery to detect floating debris in river and ocean settings, with case studies in the Netherlands and Romania. The project has closed, and its methods fed into Algae Tracker.
    outputs: ["Case studies in the Netherlands and Romania [TO CONFIRM links]"]
    publish: true

  - slug: coastal-gis
    title: Coastal GIS and satellite data tool
    area: coastal-water
    country: Global
    years: 2021 to 2023
    status: Superseded
    partners: ESA BIC Noordwijk
    funder: ESA BIC Noordwijk incubation
    image: Coastal conditions map
    summary: The first earth observation product, showing coastal ocean and weather conditions from satellite data.
    problem: Ocean and weather data from satellites were hard for coastal managers and small organisations to read without specialist skills.
    whatWeDid: From 2021 to 2023, during incubation at ESA BIC Noordwijk, Reef Support built a GIS tool that let users map a coastal area and read ocean and weather conditions from satellite data. It was the company's first earth observation product and has since been superseded.
    outputs: ["ESA BIC Noordwijk interview, 2022 (https://www.sbicnoordwijk.nl/reef-support-coral-reef-marine-ecology-esa-bic/)"]
    publish: true

  - slug: singapore-oceanarium
    title: Coral restoration monitoring pilot
    area: coral-reefs
    country: Singapore
    years: "2026"
    status: Ongoing
    partners: Singapore Oceanarium
    summary: Paid restoration monitoring pilot, Phase 1.
    publish: false        # written client consent required
```

**In development with partners** (About and relevant practice pages; plain text, no logos or amounts):

- Coastal water data quality and fusion research with TU Delft and North Sea and Baltic partners
- Coastal monitoring in Cartagena, Colombia, with RanMarine Technology, Water Insight and AV Soluciones
- Mangrove ecosystem-based adaptation in Lombok with Indonesia Biru Foundation
- Market feasibility for monitoring services outside Europe

## 6. Research

**Index.** Kicker: Research. H1: Open models, publications and challenges. Lead: We publish what we can, so others can test, reuse and improve it.

**Open source.** H2: Coral AI. A YOLOv8 segmentation model that labels reef photos by coral type, algae, rubble and sand, so cover estimates for transects come straight from survey images. It grew out of open challenges since 2021; the earlier GoogleNet classifier reached about 86% accuracy across six functional groups. Buttons: Model on Hugging Face (https://huggingface.co/reefsupport/coral-ai) · Code on GitHub (https://github.com/reefsupport). Note: MIT licence · research and monitoring support with human review; not validated for regulatory reporting on its own. Visual: segmentation preview with legend Hard coral (royal), Soft coral (sky), Algae (navy), Sand and rubble (line).

```yaml
hackathons:
  - [Jul 2023, "IndabaX South Africa hackathon: coral classification and segmentation", "InstaDeep, Zindi", https://zindi.africa/competitions/indabax-south-africa-2023]
  - ["2022", "AI for Coral Bleaching hackathon, Sausalito", "Sustainable Ocean Alliance, The Nature Conservancy", https://www.reef.support/blogs/soa-hackathon-2022]
  - [Nov 2021, "Ocean Hackathon Cape Town and Coral Classification Challenge", "OceanHub Africa, Zindi", https://zindi.africa/competitions/coral-classification-challenge]
  - [Oct–Dec 2021, "AI for Coral Reefs challenge", "FruitPunch AI", https://reef.support/blogs/ai-for-coral-reefs-monitoring]
  - [Sep 2021, "AI for Coral Reefs hackathon, A Predicted Ocean", "Ocean Decade Laboratories", https://reef.support/blogs/ocean-decade-hackathon]
  - [Apr 2021, "Student hackathon case", "YES!Delft Students", null]

publications:
  - [Model, "Coral AI (YOLOv8 segmentation)", Reef Support, Hugging Face, "2024", https://huggingface.co/reefsupport/coral-ai]
  - [Paper, "Superpixels to the Rescue", Yohan Runhaar, "[TO CONFIRM venue]", "2022", "[TO CONFIRM]"]
  - [MSc thesis, "3D photogrammetry for coral reef monitoring: comparing rugosity calculation approaches", Marc Baauw, "[TO CONFIRM institution]", "2022", "[TO CONFIRM]"]
```

**Methods.** H1: From field data to a report a funder can check. Lead: Every monitoring programme we run follows the same chain, and each step names who is responsible for it. Reef Support does not generate satellite products or carry out physical sampling; where a step needs those, a partner delivers it.

| Step | What happens | Responsible |
| --- | --- | --- |
| 1. Design | Indicators, sites, sampling frequency and reporting format agreed with the client and scientific lead | Reef Support with the project's scientific lead |
| 2. Collection | Survey photos, transects, GPS-tagged field records, in-situ measurements | Field partner (IBF, Corales de Paz) or asset owner (RanMarine) |
| 3. Satellite products | Water quality and habitat products from Copernicus data | Specialist provider (Water Insight B.V.) |
| 4. Integration and checks | Data harmonised by site and period; outliers and gaps flagged | Reef Support |
| 5. Analysis | AI image analysis, indicator calculation | Reef Support |
| 6. Review | Scientific review before release | Director of Marine Science, plus an independent party where required |
| 7. Reporting | Dashboards, reports and exports in the funder's or authority's format | Reef Support |

## 7. Insights

Index: Kicker Insights · H1 Field notes and news · cards with type, area colour and date. Migrate and edit these old posts (keep original date and author):

| Old URL | Action |
| --- | --- |
| /blogs/blog-ibf | Keep; confirm partnership start year |
| /blogs/coral-lab-part-1 and part 2 | Keep; present targets as targets |
| /blogs/blog-ocean-innovation-africa | Keep; remove old platform names |
| /blogs/soa-hackathon-2022 | Keep; remove adopt-a-coral promo |
| /blogs/ai-for-coral-reefs-monitoring | Keep |
| /blogs/ocean-decade-hackathon | Keep |
| /blogs/blog-3d-photogrammetry-colombia | Keep; remove price list links |
| /blogs/revolutionizing-coral-reef-conservation-with-technology | Keep; retitle in sentence case without "revolutionizing" |
| Citizen science journey posts | Only with consent; remove travel links |
| Any Reef Ranger post or profile | Drop |
| Any post naming the removed platform | Drop or rewrite without the name |

## 8. About

Kicker: About. H1: Marine technology built with the people who protect coasts. Body: the long description (section 1), then "How we work" table, side panel with legal name, KvK, registered address and working base, then the timeline, the "In development with partners" list and Awards and media.

```yaml
timeline:   # newest first
  - ["2026", "Akar Biru Lombok, led by Indonesia Biru Foundation with Reef Support as technical partner, selected as a GRP Innovation Challenge finalist"]
  - ["2025", "Mangrove AI development continues; documentation hub launched"]
  - [Nov 2024, "Coral AI segmentation model and public demo published on Hugging Face under an MIT licence"]
  - [Nov 2023, "3D photogrammetry for coral restoration in Colombia with Corales de Paz, funded by WWF Netherlands INNO-fonds"]
  - [Jul 2023, "IndabaX South Africa coral classification and segmentation hackathon on Zindi"]
  - ["2023", "AI and space data R&D with RanMarine Technology on marine monitoring and waste collection"]
  - [2021 to 2023, "Incubated at ESA Business Incubation Centre Noordwijk"]
  - ["2022", "AI for Coral Bleaching hackathon with Sustainable Ocean Alliance and The Nature Conservancy"]
  - ["2022", "Research on coral segmentation (University of Amsterdam support) and photogrammetry rugosity (MSc thesis)"]
  - [Nov 2021, "Challenge owner at Ocean Innovation Africa, Cape Town, with OceanHub Africa"]
  - [Oct–Dec 2021, "AI for Coral Reefs challenge with FruitPunch AI"]
  - [Sep 2021, "AI for Coral Reefs hackathon with Ocean Decade Laboratories"]
  - ["2021", "Coral Lab built in Lombok with Indonesia Biru Foundation and four TU Delft students"]
  - ["2021", "Falling Walls Lab Groningen first prize; MT/Sprout 25 under 25; ClimateLaunchpad global finals"]
  - ["2021", "Support from Copernicus Accelerator, TU Delft, Sustainable Ocean Alliance, Microsoft AI for Earth and WWF Netherlands"]
  - [Dec 2020, "ESA Copernicus Masters 2020 Overall Prize and Netherlands prize"]
  - ["2020", "Reef Support founded in Delft; partnership with Indonesia Biru Foundation begins"]
```

## 9. Team

Kicker: About · Team. H1: Team. Lead: Three people lead Reef Support's work, with partners and students across each project.

```yaml
team:
  - slug: marcel-kempers
    name: Marcel Kempers
    role: Co-founder and Director
    colour: sky
    focus: Partnerships, funding and project leadership across reefs, mangroves and coastal monitoring.
    bio: Marcel co-founded Reef Support in 2020 and leads its partnerships, funding strategy and consortium projects, from the Coral Lab in Lombok to coastal monitoring work in the Netherlands and Colombia. He holds an MSc in Management of Technology from TU Delft (finance and technology specialisation, thesis graded 10/10) and a BSc in Aerospace Engineering from TU Delft, with study at Politecnico di Milano, Tokyo Institute of Technology and Tsinghua University. He is also a research assistant on financing systems at TU Delft's Faculty of Technology, Policy and Management. Recognition includes the ESA Copernicus Masters Overall Prize (2020, with Reef Support), Falling Walls Lab Groningen first prize (2021), MT/Sprout 25 under 25 and FD 50 Young Talents (2021), the Hult Prize Tokyo (2019) and Falling Walls Emerging Talent (2023).
    links: { fallingWalls: https://falling-walls.com/marcel-kempers }
  - slug: yohan-runhaar
    name: Yohan Runhaar
    role: Co-founder and Technical Lead
    colour: royal
    focus: AI models, data engineering and software for marine monitoring.
    bio: Yohan co-founded Reef Support and leads its technology, from the coral segmentation models published on Hugging Face to the data pipelines and field data tools used in partner projects. His research on coral classification and segmentation, carried out with University of Amsterdam support, produced "Superpixels to the Rescue" (2022). He holds an MSc in Artificial Intelligence [TO CONFIRM institution and year] and studied computer science at TU Delft. He was named to MT/Sprout 25 under 25 in 2021.
  - slug: nikole-gualdron-chaparro
    name: Nikole Gualdron Chaparro
    role: Director of Marine Science
    colour: navy
    focus: Monitoring design, ecological indicators and scientific review.
    bio: Nikole is Reef Support's Director of Marine Science. She sets the scientific basis for the indicators and monitoring designs Reef Support proposes and reviews every marine science claim before it is published or submitted. She brings networks across the Colombian marine research and conservation community. [TO CONFIRM degrees, institutions, field record and publications.]
alumni:     # render only where consent: true
  - { name: Crystle Wee, context: 2020 founding team, consent: false }
  - { name: Marijn van der Laan, context: 2020 founding team, consent: false }
  - { name: Eilidh Radcliff, context: 2020 founding team, consent: false }
  - { name: Ndivhuwo Nyase, context: AI intern 2021, consent: false }
  - { name: Marc Baauw, context: MSc thesis 2022, consent: false }
  - { name: Alexandru Bobe, context: TU Delft Coral Lab team 2021, consent: false }
  - { name: Joppe Roorda, context: TU Delft Coral Lab team 2021, consent: false }
  - { name: Tadé Whenu, context: TU Delft Coral Lab team 2021, consent: false }
  - { name: Xavier Hubbelmeijer, context: TU Delft Coral Lab team 2021, consent: false }
```

## 10. Partners

Kicker: About · Partners. H1: Partners and funders. Lead: Organisations we have delivered work with, been funded or incubated by, or run open challenges alongside. One wall per group, in this order. Prizes appear on Media, not here.

```yaml
partners:
  delivery:
    - { name: Indonesia Biru Foundation, url: https://indonesia-biru.com/, logo: not-asked }
    - { name: RanMarine Technology B.V., url: https://www.ranmarine.io/, logo: not-asked }
    - { name: Water Insight B.V., url: https://www.waterinsight.nl/, logo: not-asked }
    - { name: Corales de Paz, url: https://www.coralesdepaz.org/, logo: not-asked }
    - { name: TU Delft, url: https://www.tudelft.nl/, logo: not-asked }
    - { name: AV Soluciones S.A.S., url: null, logo: not-asked, publish: false }
  funders:
    - { name: WWF Netherlands, note: INNO-fonds, url: https://www.wwf.nl/, logo: not-asked }
    - { name: Sustainable Ocean Alliance, note: microgrants and Coral Lab funding, url: https://www.soalliance.org/, logo: not-asked }
    - { name: FAST Fund TU Delft, logo: name-only }
    - { name: TU Delft Aerospace Innovation Hub, logo: name-only }
    - { name: FFplus, publish: false }
  programmes:
    - { name: ESA BIC Noordwijk, url: https://www.sbicnoordwijk.nl/, logo: not-asked }
    - { name: Copernicus Accelerator, logo: not-asked }
    - { name: ClimateLaunchpad, logo: name-only }
    - { name: Ignition Programme, logo: name-only }
    - { name: Netherlands AI Coalition, logo: name-only }
    - { name: Innovation Quarter, logo: name-only }
  challengesAndResearch:
    - FruitPunch AI
    - OceanHub Africa
    - Zindi
    - InstaDeep
    - ML6
    - The Nature Conservancy
    - Ocean Decade Laboratories
    - YES!Delft Students
    - University of Amsterdam
  infrastructureAndData:     # plain text line on Research or About, not a logo wall
    - Amazon Web Services (with Cloudnation)
    - Microsoft AI for Earth
    - UbiOps
    - Copernicus and ESA Sentinel data
  excluded:                  # never render
    - CARMABI
    - UN Ocean Decade
    - Global Fund for Coral Reefs
    - MIT Solve
```

## 11. Awards and media

```yaml
awards:     # lead item first on the Media page
  - ["2020", "Copernicus Masters Overall Prize and Netherlands prize", European Space Agency, Reef Support]
  - ["2023", "Emerging Talent, Falling Walls Science Summit global call", Falling Walls Foundation, Marcel Kempers]
  - ["2021", "First prize, Falling Walls Lab Groningen", Falling Walls Foundation, Marcel Kempers]
  - ["2021", "25 under 25", MT/Sprout, Marcel Kempers and Yohan Runhaar]
  - ["2021", "FD 50 Young Talents", Het Financieele Dagblad, Marcel Kempers]
  - ["2021", "ClimateLaunchpad global finalist", Climate-KIC, Reef Support]
  - ["2021", "Efficient Solution label", Solar Impulse Foundation, Reef Support]

media:      # newest first: [year, type, title, outlet, url]
  - ["2023", Press, "AI and photogrammetry to choose coral restoration sites in Colombia", El Tiempo, "[TO CONFIRM]"]
  - ["2023", Case study, "Training and deploying AI models with UbiOps", ESA BIC Noordwijk, https://www.sbicnoordwijk.nl/ubiops-ai-models-case-study-reef-support-esabic/]
  - ["2022", Interview, "Solving problems under water that affect billions", ESA BIC Noordwijk, https://www.sbicnoordwijk.nl/reef-support-coral-reef-marine-ecology-esa-bic/]
  - ["2022", Podcast, "TU Delft 180 series", TU Delft, https://twitter.com/tudelft/status/1493252762708201476]
  - ["2022", Partner blog, "Building a coral segmentation model using sparse data", ML6, https://www.ml6.eu/blogpost/building-a-coral-segmentation-model-using-sparse-data]
  - ["2021", Press, "AI and satellite imagery speed up coral reef protection", TU Delft, https://www.tudelft.nl/en/2021/valorisatie/ai-and-satellite-imagery-speed-up-coral-reef-protection]
  - ["2021", Talk, "Climate Cleanup Festive Masterclass", Climate Cleanup, null]
  - ["2021", Talk, "Space Opportunities for Climate Challenges", Groundstation Space and Eurisy, null]
  - ["2021", Podcast, "ProfCast with Yohan Runhaar (Dutch)", ProfCast, "[TO CONFIRM]"]
  - ["2021", Ranking, "25 under 25", MT/Sprout, https://mtsprout.nl/ranglijst/25-onder-de-25-van-2021/reef-support]
  - ["2020", Press, "Coral rescuers win space prize", Delta, https://delta.tudelft.nl/en/article/coral-rescuers-win-space-prize]
  - ["2020", Press, "Satellite imagery and AI to protect the world's coral reefs", GIM International, https://www.gim-international.com/news/satellite-imagery-and-ai-to-protect-the-world-s-coral-reefs]
  - ["2020", Broadcast, "Interview on the Copernicus Masters prize", NOS, "[TO CONFIRM]"]
```

## 12. Policies, opportunities, contact

**Policies.** Kicker: About · Policies. H1: How we work responsibly. List: Data protection (GDPR) · Research data management and open data · Safeguarding and code of conduct · Anti-fraud and anti-corruption · Gender equality statement. Each is a short dated page signed by the Director. All text [TO CONFIRM] before launch.

**Opportunities.** H1: Work with us.
- Internships and thesis topics: We host MSc students and interns on projects that produce something others can use: an open model, a dataset or a documented method. Past topics include coral segmentation with superpixels (University of Amsterdam, 2022) and rugosity measurement from 3D photogrammetry (2022). Current topic areas: coral reef image segmentation and change detection; 3D photogrammetry workflows for restoration monitoring; mangrove survival and growth estimation from field records; combining satellite water quality products with in-situ data.
- Partnering on proposals: Research consortia and restoration organisations bring us in as the data and AI partner. If you are building a proposal and need monitoring design, data integration or reporting, write to us with the call, deadline and your role.

**Contact.** Kicker: Contact. H1: Tell us about your sites. Lead: We work with restoration organisations, research consortia and coastal authorities. Send a short note on where you work and what you need to measure, and we will reply within five working days. Left column: email, phone, registered address (as selectable text). Form: Name*, Organisation*, Email*, Country, Ecosystem (Coral reef, Mangrove, Seagrass, Coastal water, Other), Message*, consent checkbox "I agree that Reef Support stores this message to reply to me, as described in the privacy policy." Confirmation: "Thanks. Your message has reached the team."

## 13. Redirects (301 unless noted)

```yaml
redirects:
  - [/solutions, /work]
  - [/programs, /work/field-programmes]
  - [/programs/coral-lab, /projects/coral-lab-lombok]
  - [/programs/coral-lab/lombok, /projects/coral-lab-lombok]
  - [/coral-lab, /projects/coral-lab-lombok]
  - [/programs/hackathons, /research/hackathons]
  - [/hackathon-sign-up, /research/hackathons]
  - [/tools, /research/open-source]
  - [/tools/3d, /projects/photogrammetry-colombia]
  - [/mangroveai, /projects/mangrove-ai]
  - [/algae-tracker, /projects/algae-tracker]
  - [/global, /about]
  - [/why-reefs, /work]
  - [/partners-and-sponsors, /about/partners]
  - [/press, /about/media]
  - [/news/:path*, /insights]
  - [/blogs/:slug, /insights/:slug]
  - [/team, /about/team]
  - [/jobs, /about/opportunities]
  - [/play-your-part, /about/opportunities]
  - [/students, /work/field-programmes]
  - [/legal, /about]
  - [/reef-conservancy, /about]
  - [/ocean-data-types, /research/methods]
  - [/data-labelling, /research/open-source]
  - [/amba-stapert, /projects/coral-lab-lombok]
  - [/adopt-a-coral, https://indonesia-biru.com/, 302]
# Take offline: travel.reef.support; docs.reef.support (or rewrite without removed names)
```

## 14. llms.txt

Generate from section 1: name, short description, practice areas with one line each, project list (published only), team names and roles, contact email, social links. It must pass the grep check in `CLAUDE.md`.
