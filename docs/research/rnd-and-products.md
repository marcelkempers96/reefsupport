# Research notes: R&D, products and regulation

Internal research file for the site build, compiled on 19 November 2026 by the "research-b" agent. Nothing in this file goes on the site. It records what public sources say about Reef Support's models, code, R&D projects and the regulations named on the coastal water page, so the owner can confirm facts, close open items in `CLAUDE.md` section 6 and clean up old public text. `CONTENT.md` remains the only source of facts for site copy; a finding here becomes usable only after the owner adds it to `CONTENT.md`.

Banned names from `CLAUDE.md` section 1 are quoted below only where a public source still uses them, so they can be cleaned up. They must never be copied into `src/` or `public/`.

## Tags

| Tag | Meaning |
| --- | --- |
| CONFIRMS | An outside source supports a fact already in `CONTENT.md` |
| FILLS OPEN ITEM | Could close an item in `CLAUDE.md` section 6, once the owner confirms it |
| NEW | A fact not in `CONTENT.md`; owner decides whether to add it |
| CONTRADICTS | A public source states something that conflicts with `CONTENT.md` or the accuracy rules |
| EXCLUDED | Relates to an item `CLAUDE.md` or `CONTENT.md` excludes; recorded for awareness only |

All "accessed" dates are 19 November 2026 unless stated. "Via search" means the text was read from a search engine extract because the host itself was unreachable from this session.

## Hosts that could not be reached

The build session can only reach GitHub directly. These hosts failed DNS resolution, so their content was read only through search extracts and should be checked by hand: reef.support, docs.reef.support, huggingface.co, reefsupport-coral-ai-demo.hf.space, www.ml6.eu, ubiops.com, www.sbicnoordwijk.nl, www.esa.int, business.esa.int, eur-lex.europa.eu, environment.ec.europa.eu, www.waterinsight.nl, www.ranmarine.io, www.globalresiliencepartnership.org, solve.mit.edu, indonesiabiru.org. GitHub pages (github.com, raw.githubusercontent.com) were read in full.

## 1. Coral AI (Hugging Face model and demo)

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 1.1 | CONFIRMS | The model repository `reefsupport/coral-ai` exists on Hugging Face under an MIT licence, with 5 commits. The model page shows no library tag and "Downloads are not tracked for this model". | https://huggingface.co/reefsupport/coral-ai (via search) |
| 1.2 | CONFIRMS | A Space `reefsupport/coral-ai-demo` exists and links to the model; the organisation's Space collection is described as "Demo Spaces for our Coral AI Models". The docs site points to https://reefsupport-coral-ai-demo.hf.space. | https://huggingface.co/rsyohan/activity/all, https://huggingface.co/reefsupport (via search) |
| 1.3 | TO CHECK | The model card text (classes, training data, metrics) could not be read, so "YOLOv8" in `CONTENT.md` is not yet confirmed from the card itself. Search extracts did not show a model card. Owner should confirm the architecture and the class list on the card, and add a short card if it is empty. | https://huggingface.co/reefsupport/coral-ai |
| 1.4 | NEW | A YOLOv8 segmentation pipeline for benthic photos trained on Reef Support's labelled data (`rs_labelled`, from a public GCP bucket `rs_storage_open`) sits in the `earthtoolsmaker/coralreef-conservation` GitHub repository, with model sizes nano to xlarge (`yolov8x-seg.pt`) and a Space `earthtoolsmaker/coral-segmentation-reef-support`. The README calls it a "collaboration" but names no authors, classes or metrics. If the Hugging Face weights came from this work, the site should credit EarthToolsMaker; it is not in `CONTENT.md`. | https://github.com/earthtoolsmaker/coralreef-conservation (read in full), https://huggingface.co/spaces/earthtoolsmaker/coral-segmentation-reef-support |
| 1.5 | CONFIRMS | The 86% figure: Zindi's IndabaX South Africa 2023 page (13 to 14 July 2023) describes a coral classification task over six functional groups (hard coral, soft coral, sponge, algae, other invertebrates, other) with a GoogleNet baseline at "roughly 86% accuracy", on a sample of the Seaview photo-quadrat dataset, plus a coral segmentation task. This matches the only accuracy figure `CLAUDE.md` allows. | https://zindi.africa/competitions/indabax-south-africa-2023 (via search) |
| 1.6 | CONFIRMS | Zindi "Coral Classification Challenge", 27 to 31 October 2021, linked to the Ocean Hackathon in Cape Town, with Reef Support as one of three challenge owners. Supports the Nov 2021 Ocean Innovation Africa entry. | https://zindi.africa/competitions/coral-classification-challenge (via search) |
| 1.7 | CONTRADICTS (naming) | The Zindi 2023 page and the old reef.support pages call the framework "Open Coral AI" or "OpenCoral AI". `CONTENT.md` uses "Coral AI". Harmless, but the site should keep one name; older pages are best linked rather than quoted. | Zindi page above; https://www.reef.support/mangroveai (via search) |
| 1.8 | NEW | The Hugging Face organisation also hosts `reefsupport/CoralSCOP` (image segmentation, Apache-2.0, weights `vit_b_coralscop.pth`). CoralSCOP is a third-party foundation model published at CVPR 2024 (Zheng et al.); the Reef Support copy appears to be a mirror. If listed on the site it must be credited to its authors, not presented as a Reef Support model. | https://huggingface.co/reefsupport/CoralSCOP, https://openaccess.thecvf.com/content/CVPR2024/html/Zheng_CoralSCOP_Segment_any_COral_Image_on_this_Planet_CVPR_2024_paper.html |
| 1.9 | NEW | A Hugging Face dataset `reefsupport/marine-data` (v1.2.0, published 1 November 2026) holds 34,794 images in its unified config. Reef Support's own contributions: benthic survey masks (1,226 images, CC BY 4.0), masks on Seaview photographs (2,696 images, masks CC BY 4.0, images CC BY 3.0 from University of Queensland) and bleaching masks from Tayrona, Colombia (635 rasters, CC BY 4.0). Code is Apache-2.0. Candidate entry for the Research "open source" page, if the owner wants it. | https://github.com/reefsupport/marine-data (README read in full) |

## 2. GitHub organisation `reefsupport`

Public repositories visible on 19 November 2026: `marine-data` (Python, updated 4 Nov 2026), `rs-ai-test-fixtures` (updated 21 Oct 2026, public smoke-test clips for an `rs-ai` worker; clips CC BY 4.0 from EPFL, Sauder et al., Zenodo 10624794) and `.github` (updated 24 Feb 2026). The repository `rs-ai` it refers to is not public.

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 2.1 | CONTRADICTS (cleanup) | The organisation profile `profile/README.md` still lists "MariMap Platform" as "Our primary application" and links to `https://marimap.reef.support`. It also uses "cutting-edge" and "innovative AI-driven solutions" and says "AI models for marine life detection". Needs rewriting to match `CLAUDE.md` (removed names, no hype words). Suggested plain replacement: describe Coral AI, the `marine-data` datasets and link to reef.support. | https://github.com/reefsupport/.github/blob/main/profile/README.md |
| 2.2 | CONTRADICTS (cleanup) | `CONTRIBUTING.md` in `.github` says contributions help "empower conservation efforts worldwide". Low priority, but generic. | https://github.com/reefsupport/.github/blob/main/CONTRIBUTING.md |
| 2.3 | CONFIRMS | `marine-data` and `rs-ai-test-fixtures` READMEs contain none of the banned names, places or claims (checked for MariMap, MariSight, MariSpot, MariField, Reef Ranger, travel.reef.support, CARMABI, STINAPA, STENAPA, Belize, Curaçao, St. Eustatius, seven countries, 13-class, early warning, forecasting, 10x, 200x). | Repositories above |
| 2.4 | NOTE | `CONTENT.md` sends "Code on GitHub" to https://github.com/reefsupport. A visitor landing there today sees the MariMap profile first, so 2.1 should be fixed before launch. | |

## 3. docs.reef.support and the old reef.support

Unreachable directly; search extracts show these pages are still indexed. This supports the open item "Clean or take offline: docs.reef.support".

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 3.1 | CONTRADICTS (cleanup) | docs.reef.support still has MariMap pages (`/marimap/changelog`, `/marimap/vision`) and a survey type "Survey: Mangrove Tree Growth" under MariMap. | https://docs.reef.support/marimap/vision (via search) |
| 3.2 | CONTRADICTS (cleanup) | The old site has `/solutions/marifield`, describing MariField as a mobile companion for offline field data with GPS, depth and media metadata. | https://www.reef.support/solutions/marifield (via search) |
| 3.3 | CONTRADICTS | The old Mangrove AI page describes a "mangrove health and canopy change" model that turns imagery into structured outputs, and exports in CSV or PDF. `CONTENT.md` describes Mangrove AI as GPS-tagged field observations with growth and carbon models in calibration. The docs page for Mangrove AI is marked "Coming Soon". The new site should follow `CONTENT.md`. | https://www.reef.support/mangroveai, https://docs.reef.support/ai (via search) |
| 3.4 | NOTE | An old `https://www.reef.support/llms.txt` is indexed; the new build should replace it. | via search |
| 3.5 | CONTRADICTS (redirects) | Old URLs seen in search: `/mangroveai`, `/programs/coral-lab/lombok`, `/ocean-data-types`, `/tools`, `/blogs/blog-ocean-innovation-africa`, `/solutions/marifield`, `/algae-tracker`. Check each has a redirect in `vercel.json` (MariField should go to a neutral page, not a product page). | via search |

## 4. Mangrove AI and Akar Biru Lombok

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 4.1 | OPEN ITEM NOT FILLED | No public source gives a start year for Mangrove AI or Akar Biru Lombok. The docs page was still "Coming Soon" when indexed. Keep `[TO CONFIRM start]`. | |
| 4.2 | CONFIRMS (partly) | The Global Resilience Partnership announced 89 finalists in its 2026 Innovation Challenge and the announcement mentions "mangrove cooperatives in Lombok" among them. The extract does not name the organisation, so this supports but does not prove the Akar Biru Lombok entry. Final proposals were due in September 2026. GRP's own pages give 44 countries in one place and 36 in another. | https://www.globalresiliencepartnership.org/?p=564631, https://www.globalresiliencepartnership.org/innovationpipeline/ (via search) |
| 4.3 | TO CHECK | The GRP challenge "TECH4Resilience" found in search is a separate, earlier AI track (15 finalists, winners announced at COP30). "TECH4Nature" in search results is an IUCN and Huawei awards programme, unrelated to GRP. `CONTENT.md` names the challenge "GRP Innovation Challenge (TECH4Resilience / TECH4Nature)". Owner should confirm the exact track name from the GRP letter, as the parenthesis may be wrong. | https://www.globalresiliencepartnership.org/announcing-the-finalists-of-the-tech4resilience-challenge/, https://blog.huawei.com/en/post/2025/9/26/tech4nature-awards-meet-finalists |
| 4.4 | TO CHECK | Since final proposals were due in September 2026, the outcome may now be known. Status discipline applies: if it is still in review, only "finalist" may be stated. | |
| 4.5 | NEW | IBF's own page gives its founding year as 2020. | indonesiabiru.org (via search, unverified) |

## 5. Algae Tracker and Plastic Tracker

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 5.1 | CONFIRMS | The old Algae Tracker page describes Sentinel-2 and Sentinel-3 data with AI to detect cyanobacteria through phycocyanin, plus turbidity, surface temperature and salinity, and says Algae Tracker was reached through the Plastic Tracker platform. | https://reef.support/algae-tracker (via search) |
| 5.2 | CONTRADICTS (wording) | The same page says RanMarine's WasteShark "allows for verification and close research of correlation between biomass pollution levels and aquatic toxicity levels". `CONTENT.md` uses the more careful "offered a way to compare detections with biomass actually removed". Keep the `CONTENT.md` wording. | same |
| 5.3 | OPEN ITEM NOT FILLED | No ESA, Copernicus or third-party page describing Plastic Tracker or its Netherlands and Romania case studies was found. Romanian results were unrelated projects (SYROCO on Copernicus Marine, by seamod.ro and NIMRD; Interreg Danube AQUATIC PLASTIC). Keep `[TO CONFIRM links]`. | https://marine.copernicus.eu/services/use-cases/protecting-romanian-beaches-plastic-pollution-romanian-coastal-monitoring |
| 5.4 | CONTRADICTS (capability) | The old pages present Reef Support as processing Copernicus imagery itself. `CLAUDE.md` says raw satellite processing is not a Reef Support capability and satellite water quality products come from Water Insight. The `CONTENT.md` project copy ("tested detection ... from enhanced Copernicus imagery") is past tense R&D and acceptable; do not extend it. | |

## 6. RanMarine and the 2023 R&D project

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 6.1 | OPEN ITEM NOT FILLED | No public source names the 2023 R&D project with RanMarine or its funder. RanMarine's "The Eye in the Sky for Ocean Waste" article is about EMIT, PACE and CYGNSS satellite data and does not mention Reef Support in the extract. | https://www.ranmarine.io/news/eye-in-the-sky/ (via search) |
| 6.2 | TO CHECK | Possible ambiguity: "MIT" in Dutch funding means MKB-innovatiestimulering Regio en Topsectoren (RVO), which funds R&D collaboration projects between SMEs. If the 2023 RanMarine project was an MIT R&D samenwerkingsproject, the site should write the funder in full ("MIT scheme, RVO") so it is not confused with MIT Solve. No source confirms this; owner to check. | |
| 6.3 | NEW | RanMarine sells a CyanoShark product for toxic bloom detection and an RM Connect data layer with pH, dissolved oxygen, turbidity and blue algae sensors. Relevant to the division of roles (in-situ collection by RanMarine). | https://www.ranmarine.io/cyanoshark/, https://www.ranmarine.io/rm-connect (via search) |
| 6.4 | NEW | European Commission BlueInvest article (13 March 2025): RanMarine technology is used in 33 markets; clients are marinas, ports, municipalities and commercial clients. The article's "early warning" idea is RanMarine's, not Reef Support's. | https://oceans-and-fisheries.ec.europa.eu/news/ranmarine-innovative-ocean-cleaning-supported-blueinvest-2025-03-13_en |

## 7. ML6 and UbiOps

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 7.1 | CONFIRMS | ML6 blog "Building a coral segmentation model using sparse data" is dated 28 March 2022. It describes a Christmas project with Reef Support on a challenge set with FruitPunch AI, using the Seaview dataset's sparse point labels, a rolling-window classifier and proposed unsupervised segmentation as next steps. `CONTENT.md` lists it as 2022. | https://www.ml6.eu/blogpost/building-a-coral-segmentation-model-using-sparse-data (via search) |
| 7.2 | CONTRADICTS (framing) | ML6 calls Reef Support "a startup building decision-support software for coral researchers". Fine to link, not to quote. | same |
| 7.3 | CONFIRMS | UbiOps case study "Diving into the world of coral reef conservation: how Reef Support trains AI with UbiOps", republished by SBIC Noordwijk in November 2023. `CONTENT.md` lists it as 2023. | https://ubiops.com/customer/coral-reef-conservation-deploy-and-train-ai-ubiops/, https://sbicnoordwijk.nl/?p=49433 (via search) |
| 7.4 | CONTRADICTS (do not repeat) | The SBIC title says Reef Support "uses satellite data to dive into coral reef monitoring", and the case study says the first model reached production "within 5 days" and that Reef Support runs "2 main models with 5/6 alternate versions". These are vendor statements; the satellite framing conflicts with `CLAUDE.md`, and the speed figure is not a documented benchmark. Link only. | same |
| 7.5 | NEW | UbiOps ended its SBIC technical partnership at the end of July 2024. | sbicnoordwijk.nl (via search) |

## 8. MIT-related items

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 8.1 | EXCLUDED | MIT Solve page "solutions/101802" is a Reef Support submission to the 2025 Global Climate Challenge. It pairs MariMap GIS software with "Open Coral AI" models, describes "near-real-time data on coral health" and a citizen science programme "Reef Rangers". No evidence of Solver or finalist status. Under `CLAUDE.md` and `CONTENT.md` (partners `excluded`), MIT Solve must never appear on the site, and the page uses three removed names. Owner may want to withdraw or edit the public submission. | https://solve.mit.edu/solutions/101802 (via search) |
| 8.2 | NOTE | Other "MIT" hits (MIT Sea Grant Reef Explorer, Arcturus) are unrelated to Reef Support. | |
| 8.3 | NOTE | See 6.2 on the Dutch MIT funding scheme. | |

## 9. Other press and funding found on the way

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 9.1 | CONFIRMS | ESA: Reef Support won the Copernicus Masters 2020 overall prize, presented on 8 December 2020 at the online Space Awards during European Space Week; 591 participants from 47 countries submitted 220 ideas. The team listed: Crystle Wee, Yohan Runhaar, Marcel Kempers, Marijn van der Laan and Eilidh Radcliff. | https://esa.int/Applications/Observing_the_Earth/Copernicus/Reef_Support_wins_Copernicus_Masters_top_prize (via search) |
| 9.2 | CONTRADICTS (do not repeat) | 2020 press and TU Delft coverage describe an "early warning system" and a predictive service called "Reef.io" covering fish farms, beaches, sediment plumes and debris. `CLAUDE.md` allows linking to such press but not repeating it. | https://delta.tudelft.nl/en/article/coral-rescuers-win-space-prize, https://www.tudelft.nl/en/2021/valorisatie/ai-and-satellite-imagery-speed-up-coral-reef-protection |
| 9.3 | CONTRADICTS (date) | One source gives the founding as June 2020 by Yohan Runhaar and Marcel Kempers in Delft; a TU Delft article gives May. `CONTENT.md` says "Founded: 2020, Delft", which both support. The exact incorporation date stays an open item (KvK). | MIT Solve page (via search), TU Delft FAST page |
| 9.4 | NEW | A TU Delft FAST "Ambitious Idea" grant of EUR 15,000 paid for datasets, software development and team growth. Not in `CONTENT.md`; could feed the funder-by-funder breakdown open item if the owner confirms it. | https://tudelft.nl/fast/inspiration-wall/students-help-preserve-the-coral-reefs-on-the-planet (via search) |
| 9.5 | EXCLUDED | A Global Fund for Coral Reefs "Reef+" profile of Reef Support exists. Global Fund for Coral Reefs is in the `excluded` partner list; do not cite. | https://globalfundcoralreefs.org/reef-plus/finance-solutions/reef-support/ |
| 9.6 | CONFIRMS | ESA commercialisation database lists Reef Support as an ESA BIC Noordwijk incubatee for 2021 to 2023. | commercialisation.esa.int (via search) |

## 10. Water Insight B.V.

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 10.1 | NEW | Water Insight is a spin-off of the Institute for Environmental Studies at the Free University (VU) Amsterdam, founded in 2005. It makes the WISP-3 handheld water quality scanner and the fixed WISPstation, used for example to validate Sentinel-3 OLCI turbidity in the Eems estuary (2020). | https://www.cnr.it/en/research-projects/project/27943, https://zenodo.org/records/4570188/files/S3VT_2020-WISPstation.pdf |
| 10.2 | NEW | Water Insight led the EU Horizon 2020 project CoastObs (November 2017 to April 2021, grant 776348) with the University of Stirling, CNR Italy and Université de Nantes, among others. Products: chlorophyll-a, algal blooms, harmful algae, turbidity, sediment plumes, seagrass cover, phytoplankton size classes and water surface temperature. Useful for describing Water Insight's role correctly; any list on the site should come from Water Insight's own wording. | https://cordis.europa.eu/project/id/776348, https://aquaculture.ec.europa.eu/knowledge-base/projects/commercial-service-platform-user-relevant-coastal-water-monitoring-services |

## 11. Regulation: Nature Restoration Regulation and Water Framework Directive

These support the coastal water lead in `CONTENT.md` ("Coastal authorities now report ecosystem condition under the EU Nature Restoration Regulation and the Water Framework Directive"). Exact article wording must be checked on EUR-Lex, which was unreachable.

| # | Tag | Finding | Source |
| --- | --- | --- | --- |
| 11.1 | CONFIRMS | Regulation (EU) 2024/1991 on nature restoration, adopted 24 June 2024. Article 5 sets marine restoration targets, Article 18 coordinates marine measures, Article 20 is "Monitoring" and Article 21 is "Reporting". Member States submit draft national restoration plans by 1 September 2026; the plan format is set by Implementing Regulation (EU) 2025/912. | https://eur-lex.europa.eu/eli/reg/2024/1991/oj, https://eur-lex.europa.eu/eli/reg_impl/2025/912/oj |
| 11.2 | CONFIRMS | The Commission's key dates table gives 30 June 2028 for first Member State reporting under Article 21(1); secondary summaries say reporting then follows at least every three years, with an EEA technical overview every six years. | https://green-forum.ec.europa.eu/nature-and-biodiversity/nature-restoration-regulation-implementation_en, https://www.climatecouncil.ie (factsheet) |
| 11.3 | NEW | Marine guidance: Seas At Risk and Oceana, "Implementing the EU Nature Restoration Regulation at Sea" (updated December 2025); EEA explanatory notes for the NRR reference portal (29 September 2025). | https://europe.oceana.org/reports/implementing-the-eu-nature-restoration-regulation-at-sea/, https://biodiversity.europa.eu/europes-biodiversity/nature-restoration |
| 11.4 | CONFIRMS | Water Framework Directive 2000/60/EC: Article 8 requires monitoring programmes; Annex V sets surveillance, operational and investigative monitoring and the status definitions for coastal waters, with phytoplankton bloom frequency and intensity as part of the biological quality elements. The minimum frequencies in Annex V section 1.3.4 (from memory of the Directive: phytoplankton every 6 months, other aquatic flora and macroinvertebrates every 3 years, physico-chemical elements every 3 months) were not confirmed by any retrieved source and must be checked on EUR-Lex before use. | https://eur-lex.europa.eu/eli/dir/2000/60/oj, CIS Guidance No. 7 on monitoring: https://circabc.europa.eu/sd/a/63f7715f-0f45-4955-b7cb-58ca305e42a8/GuidanceNo7%E2%80%94Monitoring(WG%202.7).pdf |
| 11.5 | NOTE | `CONTENT.md` says indicators are "delivered with accredited partners". No source here names an accredited partner; the site should not add one. | |

## 12. Prioritised confirm list for the owner

1. **Clean the GitHub profile** (`reefsupport/.github/profile/README.md`): remove the MariMap link and the hype words before launch, because the new site links to github.com/reefsupport (2.1, 2.4).
2. **Withdraw or edit the MIT Solve submission** (solve.mit.edu/solutions/101802), which names MariMap and Reef Rangers in public (8.1). Never mention it on the site.
3. **Coral AI model card**: confirm architecture (YOLOv8?), class list, training data and any metric on the Hugging Face card, and whether the weights came from the EarthToolsMaker collaboration, which would then need a credit (1.3, 1.4).
4. **GRP Innovation Challenge**: confirm the exact track name (TECH4Resilience and TECH4Nature appear to be different programmes), that the Lombok finalist is Akar Biru Lombok under IBF, and whether the September 2026 final round has an outcome (4.2 to 4.4).
5. **Take offline or clean docs.reef.support and old reef.support pages** (MariMap, MariField, imagery-based mangrove model) and add redirects for the old URLs listed in 3.5.
6. **2023 RanMarine R&D project**: name and funder; if it was the Dutch MIT scheme (RVO), write it in full (6.1, 6.2).
7. **CoralSCOP mirror and `marine-data` dataset**: decide whether either belongs on the Research page; CoralSCOP must be credited to its CVPR 2024 authors (1.8, 1.9).
8. **TU Delft FAST grant (EUR 15,000)**: confirm for the funder breakdown open item (9.4).
9. **Plastic Tracker case studies (Netherlands, Romania)** and **Mangrove AI / Akar Biru start years**: no public source found; still needed from internal records (5.3, 4.1).
10. **Regulation wording**: check NRR Articles 20 and 21 and WFD Annex V 1.3.4 on EUR-Lex before any frequency or deadline is quoted on the site (11.1 to 11.4).
