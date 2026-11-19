# Reef Support website (reef.support)

Rebuild of reef.support for Reef Support B.V., a Dutch marine technology company working on coral reefs, mangroves and coastal waters. The site must read as official to grant evaluators and partner organisations, who check it before scoring proposals.

This repo is driven by three files. Read all three before writing code or copy:

1. `CLAUDE.md` (this file): rules, stack, build order, quality bar, open items
2. `DESIGN.md`: blue-on-white visual system, Poppins type, full-bleed video hero, components, tokens
3. `CONTENT.md`: company facts, sitemap, all page copy, and every list (projects, partners, team, press, timeline, redirects) as data to turn into JSON or content collections

Never invent a fact that is not in `CONTENT.md`. Where copy needs a missing fact, render a visible `[TO CONFIRM: ...]` in dev builds, hide it in production, and add it to the open items list at the end of this file.

## 1. Accuracy rules (non-negotiable)

These come from proposal audits where plausible but false claims had to be removed. They apply to every page, caption, alt text, meta tag, filename, code comment, `llms.txt` and README.

### Removed names: never write or link

| Do not use | Write instead |
| --- | --- |
| MariMap, MariSight, MariSpot, MariField, marimap.com | "monitoring and reporting workflows", "data integration", "field data collection" |
| Reef Ranger (programme, expeditions, profiles, brochure, webinar), travel.reef.support | Coral Lab students and interns, named only with consent |
| Adopt-a-coral pages, data-labelling vouchers, photogrammetry price list | Link to Indonesia Biru Foundation for coral adoption |

### Claims that must never appear

- Deployments with Dutch Caribbean authorities (CARMABI, STINAPA, STENAPA, Nature Foundation St. Maarten)
- Curaçao or St. Eustatius habitat classifications, or any "13-class" classification
- Belize machine learning or Sentinel-2 work
- "Seven countries", "30+ organizations", "75% of the world's reefs by 2030"
- "10x faster", "200x faster" or any speed-up without a documented benchmark
- Predictive alerts, early warning or forecasting as a current capability (older press used this framing; link to it, never repeat it)
- Raw satellite image processing as a Reef Support capability (satellite water quality products come from Water Insight B.V.)

### Status discipline

| Status | Where it may appear |
| --- | --- |
| Delivered / completed | Project page, track record, timeline |
| Ongoing | Project page with an "Ongoing" label |
| Submitted or in review | Only in the plain-text "In development with partners" list: no logos, no amounts, no outcome |
| Competition submission | Nowhere as an award (MIT Solve is excluded) |

### Division of roles (state it plainly on the site)

Reef Support designs monitoring, integrates partner data, runs AI analysis and produces reporting. Satellite water quality products: Water Insight B.V. Autonomous vessels and in-situ collection: RanMarine Technology B.V. Local leadership and field teams: Indonesia Biru Foundation (Lombok) and AV Soluciones S.A.S. (Colombia). For Akar Biru Lombok always write "led by Indonesia Biru Foundation, with Reef Support as technical partner".

### Consent and permission flags

- Items marked `publish: false` in `CONTENT.md` never render in production (Singapore Oceanarium pilot until written consent; AV Soluciones until a joint project is awarded; FFplus until confirmed).
- Partner logos render only where `logo: granted`; otherwise show the plain name in the same grid cell.
- People beyond the three core team members appear only with `consent: true`.
- "Over EUR 1.2 million in EU, UN and ESA funding" stays hidden behind `flags.showFundingTotal = false` until a funder-by-funder breakdown exists.
- Coral AI accuracy: quote only the documented 86% (GoogleNet, six functional groups, IndabaX 2023 brief).
- Coral Lab "500 m² restoration" was a 2021 target, not a result.

### Copy style

British spelling (organisation, programme, colour). Sentence-case headlines; only small kickers are uppercase. No em dashes. No short standalone sentences. No hype words (cutting-edge, revolutionary, world-class, leverage, unlock, game-changer) and no jargon (value proposition, storytelling, elevator pitch). Numbers, dates and named partners over adjectives. Left-align all text.

## 2. Stack

- Astro (static output) + TypeScript, deployed on Vercel.
- Content collections for projects, practice areas and insights, built from `CONTENT.md`; lists converted to `src/data/*.json`.
- Plain CSS with the custom properties in `DESIGN.md`. No Tailwind, no UI kits, so the square, flat look stays exact.
- Fonts from Google Fonts: Poppins (400, 500, 600, 700, 800) and IBM Plex Mono (400, 500), `display=swap`, preconnect.
- Hero video: self-hosted MP4 (H.264) + WebM in `public/video/`, under 5 MB, 10 to 20 s loop, muted, `playsinline`, with a poster image. See `DESIGN.md`.
- Client JS only for: mobile menu, nav dropdowns, hero video pause control, project filter, search. Keep each island small.
- Images in `public/images/` as AVIF/WebP with width, height, real alt text and a photographer credit.

## 3. Build order (stop after each step for review)

1. Base layout: sticky white header with dropdown nav and mobile menu, navy footer, skip link, SEO head component, global tokens.
2. Components from `DESIGN.md`: Kicker, VideoHero, PracticeTile, Card, ListRow, FactsStrip, StatementPanel, Button, PartnerWall, PersonCard, Timeline, StatusLabel, PhotoPlaceholder.
3. Home page.
4. Work index and the four practice area pages.
5. Projects index with practice-area filter, and the case study template.
6. Research: open source, publications, hackathons, methods.
7. Insights index and article template (migrate the posts listed in `CONTENT.md`).
8. About, Team, Partners, Media, Policies, Opportunities, Contact, legal pages, 404.
9. `vercel.json` redirects, `sitemap.xml`, `robots.txt`, `llms.txt` generated from the company facts, OG image template, JSON-LD (`Organization` on home and about, `Article` on insights).
10. Accessibility and performance pass at 360 px and 1440 px.

## 4. Quality bar

- Lighthouse 95+ on all four scores (hero video lazy-starts after first paint; poster is the LCP image).
- WCAG 2.2 AA: contrast per the token table, visible focus ring, skip link, landmarks, hero video pausable and paused under `prefers-reduced-motion`.
- No horizontal scroll at 360 px; 16 px minimum side gutter.
- Unique `<title>` ("Page · Reef Support"), meta description, canonical and OG image on every page.
- Forms: contact form posts to a Vercel serverless function or Formspree; newsletter to the provider chosen later. Both show an on-page confirmation.

## 5. Check before finishing any task

```bash
grep -riE "marimap|marisight|marispot|marifield|reef ranger|travel\.reef|carmabi|stinapa|stenapa|belize|seven countries" src public
```

It must return nothing. Then build, and look at every changed page at 360 px and 1440 px.

## 6. Open items (do not fill with guesses)

- [ ] Incorporation date from the KvK extract, and the VAT number
- [ ] Breakdown of the EUR 1.2 million (funder, year, amount), or drop the figure
- [ ] Singapore Oceanarium written consent to be named
- [ ] Written logo permission: IBF, RanMarine, Water Insight, AV Soluciones, Corales de Paz, TU Delft, WWF NL, SOA, ESA BIC
- [ ] Policies text: GDPR, research data management, safeguarding, anti-fraud, gender equality
- [ ] Nikole Gualdron Chaparro: degrees, field record, publications, portrait
- [ ] Yohan Runhaar: MSc institution and year, portrait; Marcel portrait
- [ ] Name and funder of the 2023 R&D project with RanMarine; FFplus grant details
- [ ] Start years for Mangrove AI and Akar Biru Lombok; Coral Lab planting numbers achieved
- [ ] Links: El Tiempo article, NOS interview, ProfCast, FD 50, "Superpixels to the Rescue", Baauw thesis
- [ ] One contact email: hello@reef.support or info@reef.support
- [ ] Hero video clip (reef or Coral Lab footage, with rights) and poster frame
- [ ] Field photos with photographer credit and permission
- [ ] Logo: keep current mark or adopt the three-bar mark in `DESIGN.md`
- [ ] Clean or take offline: docs.reef.support, GitHub READMEs, Hugging Face Space text
- [ ] Whether a Reef Support foundation or NGO branch exists before mentioning one
- [ ] Contact form endpoint (Formspree or Vercel function) for `PUBLIC_CONTACT_ENDPOINT`
- [ ] Newsletter provider and endpoint for `PUBLIC_NEWSLETTER_ENDPOINT` (until then production shows a LinkedIn link)
- [ ] Migrate the old blog posts listed in `CONTENT.md` section 7 into `src/content/insights/` (the build session could not reach reef.support)
- [ ] Privacy policy: form and newsletter processors, retention period, legal review and publication date
- [ ] Policy pages: each policy text, date and Director signature
