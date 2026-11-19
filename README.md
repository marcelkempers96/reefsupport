# reef.support

Website for Reef Support B.V. Built with Astro (static output), deployed on Vercel.

Read `CLAUDE.md`, `DESIGN.md` and `CONTENT.md` before changing code or copy.

```bash
npm install
npm run dev          # local dev server, shows [TO CONFIRM] markers
npm run build        # type check + static build into dist/
npm run check:names  # must pass before every commit (CLAUDE.md section 5)
```

## Structure

- `src/styles/global.css`: design tokens and base styles
- `src/data/*.json`: company facts and navigation, converted from `CONTENT.md`
- `src/components/`: Header, Footer, Logo, SEO head, ToConfirm
- `src/layouts/Base.astro`: page shell with skip link, header and footer
