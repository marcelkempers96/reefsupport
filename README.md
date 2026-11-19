# reef.support

Website for Reef Support B.V. Astro (static output) + TypeScript, deployed on Vercel.

Read `CLAUDE.md`, `DESIGN.md` and `CONTENT.md` before changing code or copy. All facts come from `CONTENT.md`; never add one that is not there.

## Commands

```bash
npm install
npm run dev          # dev server; shows yellow [TO CONFIRM] markers and unpublished items
npm run build        # type check, static build into dist/, then the Pagefind search index
npm run preview      # serve dist/ (search works here, not in dev)
npm run check:names  # banned-names check from CLAUDE.md section 5; must print nothing
npm run og           # regenerate public/og/default.png (needs Playwright + Chromium)
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/*.json` | Company facts, practice areas, projects, partners, team, timeline, awards, media, research lists, navigation (converted from `CONTENT.md`) |
| `src/content.config.ts` | Content collections: `areas` and `projects` (from the JSON files) and `insights` (Markdown in `src/content/insights/`) |
| `src/components/` | Design-system components from `DESIGN.md` (VideoHero, PracticeTile, ProjectCard, FactsStrip, StatementPanel, PartnerWall, ListRows, Timeline, PersonCard, StatusLabel, PhotoPlaceholder, …) |
| `src/pages/` | One file per route in the `CONTENT.md` sitemap |
| `src/styles/global.css` | Tokens and base styles |
| `src/lib/confirm.ts` | `[TO CONFIRM]` handling: visible in dev, removed in production |
| `vercel.json` | Redirects from the old site, clean URLs, headers |
| `src/pages/llms.txt.ts` | `llms.txt`, generated from the data files |

## Content rules built into the code

- Text containing `[TO CONFIRM ...]` shows a yellow marker in dev. In production the marker is removed, and a fact whose whole value is unconfirmed is left out.
- Projects and partners with `"publish": false` never appear in production.
- Partner logos render only with `"logo": "granted"`; otherwise the name shows in the same cell.
- Alumni render only with `"consent": true`.
- Links to `/insights/<slug>` are dropped automatically until that post exists.

## Adding things

- **Insight post:** add `src/content/insights/<old-slug>.md` with frontmatter `title`, `date`, `author`, `type` (`Field note`, `News` or `Event`), optional `area`, `summary`, optional `originalUrl`. Keep the old slug so `/blogs/<slug>` redirects work.
- **Hero video:** put `hero.mp4`, `hero.webm` and `hero-poster.webp` in `public/video/`, then set the `video` constant in `src/pages/index.astro`.
- **Photos:** AVIF/WebP in `public/images/` with width, height, alt text and credit; replace the matching `PhotoPlaceholder`.
- **Forms:** set `PUBLIC_CONTACT_ENDPOINT` and `PUBLIC_NEWSLETTER_ENDPOINT` in Vercel (see `.env.example`).

## Deploy

Import the repository in Vercel. `vercel.json` sets the build command, output directory and redirects.
