// Renders the Open Graph images (1200x630 PNG) into public/og/:
//   default.png                 home page and fallback
//   work/<area>.png             one per practice area, with the area colour bar
//   projects/<slug>.png         one per published project, with its area colour bar
//   <section>.png               main section pages listed in `sections` below
// src/lib/seo.ts picks up /og/<path>.png automatically for the page at <path>.
// Usage: npm run og   (needs Playwright with Chromium available; fonts come from @fontsource, no network)
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = new URL('../', import.meta.url);
const json = (p) => JSON.parse(readFileSync(new URL(p, root), 'utf8'));
const company = json('src/data/company.json');
const areas = json('src/data/areas.json');
const projects = json('src/data/projects.json');

// Practice colours and text tokens from DESIGN.md.
const C = { ink: '#0A1F33', mute: '#55697D', line: '#D3E0EC', royal: '#1458B8', navy: '#0B3A6E', teal: '#0A7EA4', sky: '#9CCBF2' };

const font = (pkg, file) =>
  readFileSync(new URL(`node_modules/@fontsource/${pkg}/files/${file}`, root)).toString('base64');
const faces = [
  ['Poppins', 600, font('poppins', 'poppins-latin-600-normal.woff2')],
  ['Poppins', 400, font('poppins', 'poppins-latin-400-normal.woff2')],
  ['IBM Plex Mono', 500, font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2')],
]
  .map(([f, w, b]) => `@font-face{font-family:'${f}';font-weight:${w};src:url(data:font/woff2;base64,${b}) format('woff2')}`)
  .join('');

// "[TO CONFIRM ...]" markers never appear in images (they are production assets).
const clean = (s = '') => s.replace(/\[TO CONFIRM[^\]]*\]/g, '').replace(/\s{2,}/g, ' ').replace(/\s+([.,;:)])/g, '$1').trim();
const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const logo = `<svg width="44" height="44" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" fill="${C.ink}"/><rect x="7" y="18" width="4" height="8" fill="${C.royal}"/><rect x="14" y="13" width="4" height="13" fill="${C.sky}"/><rect x="21" y="7" width="4" height="19" fill="${C.teal}"/></svg>`;
const fourBars = `<div class="bars four"><span style="background:${C.royal}"></span><span style="background:${C.navy}"></span><span style="background:${C.teal}"></span><span style="background:${C.sky}"></span></div>`;

function page({ kicker = [], colour, title, text, meta }) {
  const size = title.length > 46 ? 62 : title.length > 34 ? 72 : title.length > 22 ? 84 : 96;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><style>
  ${faces}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #FFFFFF; color: ${C.ink}; font-family: Poppins, sans-serif;
         padding: 64px 80px 78px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .logo { display: flex; align-items: center; gap: 16px; font-weight: 600; font-size: 28px; letter-spacing: -0.01em; }
  .url { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 18px; color: ${C.mute}; letter-spacing: .04em; }
  .kicker { margin-top: auto; display: flex; align-items: center; gap: 14px; font-family: 'IBM Plex Mono', monospace;
            font-weight: 500; font-size: 20px; letter-spacing: .08em; text-transform: uppercase; color: ${C.mute}; }
  .sq { width: 18px; height: 18px; flex: none; }
  h1 { font-weight: 600; font-size: ${size}px; line-height: 1.04; letter-spacing: -0.015em; margin-top: 20px; max-width: 1000px;
       display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  p { font-weight: 400; font-size: 26px; color: ${C.mute}; margin-top: 22px; max-width: 980px; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .meta { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 18px; color: ${C.mute}; margin-top: 28px; letter-spacing: .04em; }
  .bars { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; }
  .bars.four { display: grid; grid-template-columns: repeat(4, 1fr); }
</style></head><body>
  <div class="top"><div class="logo">${logo}Reef Support</div><div class="url">reef.support</div></div>
  ${kicker.length ? `<div class="kicker">${colour ? `<span class="sq" style="background:${C[colour]}"></span>` : ''}${kicker.map(esc).join(' · ')}</div>` : '<div class="kicker"></div>'}
  <h1>${esc(title)}</h1>
  ${text ? `<p>${esc(text)}</p>` : ''}
  ${meta ? `<div class="meta">${esc(meta)}</div>` : ''}
  ${colour ? `<div class="bars" style="background:${C[colour]}"></div>` : fourBars}
</body></html>`;
}

const areaById = Object.fromEntries(areas.map((a) => [a.id ?? a.slug, a]));
const jobs = [
  {
    out: 'default.png',
    html: page({
      title: 'Evidence for healthy coasts',
      text: 'AI, field data and earth observation for coral reefs, mangroves and coastal waters.',
      meta: `${company.legalName} · KvK ${company.kvk}`,
    }),
  },
  ...areas.map((a) => ({
    out: `work/${a.id ?? a.slug}.png`,
    html: page({ kicker: [a.no, 'Practice area'], colour: a.colour, title: a.name, text: clean(a.tile) }),
  })),
  ...projects
    .filter((p) => p.publish)
    .map((p) => {
      const area = areaById[p.area];
      return {
        out: `projects/${p.id ?? p.slug}.png`,
        html: page({
          kicker: ['Project', area?.name, clean(p.country)].filter(Boolean),
          colour: area?.colour,
          title: clean(p.title),
          text: clean(p.summary),
          meta: [clean(p.years), clean(p.status)].filter(Boolean).join(' · '),
        }),
      };
    }),
];

// Main section pages (titles and leads from CONTENT.md).
const sections = [
  ['work', ['Work'], 'What we do', 'Four practice areas: coral reefs, mangroves and blue carbon, coastal water and field programmes.'],
  ['projects', ['Projects'], 'Projects and case studies', 'Case studies with the partners who led the field work and the funders who supported it.'],
  ['research', ['Research'], 'Open models, publications and challenges', 'We publish what we can, so others can test, reuse and improve it.'],
  ['research/open-source', ['Research', 'Open source'], 'Coral AI', 'An open YOLOv8 segmentation model for reef survey photos, MIT licence, on Hugging Face.'],
  ['research/methods', ['Research', 'Methods'], 'From field data to a report a funder can check', 'Seven steps from monitoring design to reporting, each with a named responsible party.'],
  ['about', ['About'], 'Marine technology built with the people who protect coasts', 'Founded in Delft in 2020, and winner of the ESA Copernicus Masters Overall Prize the same year.'],
  ['about/team', ['About', 'Team'], 'Team', 'Marcel Kempers, Yohan Runhaar and Nikole Gualdron Chaparro.'],
  ['contact', ['Contact'], 'Tell us about your sites', 'Restoration organisations, research consortia and coastal authorities.'],
];
try {
  if (readFileSync(new URL('src/pages/services.astro', root))) {
    sections.push(['services', ['Services'], 'What we can do for you', 'Monitoring design, data integration, AI analysis and reporting for reefs, mangroves and coastal waters.']);
  }
} catch {}
for (const [out, kicker, title, text] of sections) jobs.push({ out: `${out}.png`, html: page({ kicker, title, text }) });

const browser = await chromium.launch();
const pw = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const job of jobs) {
  const path = new URL(`public/og/${job.out}`, root).pathname;
  mkdirSync(dirname(path), { recursive: true });
  await pw.setContent(job.html, { waitUntil: 'load' });
  await pw.evaluate(() => document.fonts.ready);
  await pw.screenshot({ path });
  console.log(`Wrote public/og/${job.out}`);
}
await browser.close();
