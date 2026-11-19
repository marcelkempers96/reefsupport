// Generates the favicon set and the logo pack from the three-bar mark in DESIGN.md.
//   public/favicon.ico            16 + 32 px (PNG-in-ICO)
//   public/apple-touch-icon.png   180 px
//   public/icon-192.png, icon-512.png, icon-maskable-512.png
//   public/site.webmanifest
//   public/brand/*.svg, *.png, colours.json
// Usage: node scripts/brand.mjs   (needs Playwright with Chromium; Poppins comes from @fontsource, no network)
// The mark geometry matches public/favicon.svg and src/components/Logo.astro.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = new URL('../', import.meta.url);
const out = (p) => new URL(`public/${p}`, root);
mkdirSync(out('brand/'), { recursive: true });

// Tokens from DESIGN.md (colour table and practice areas).
const tokens = {
  core: {
    ink: { hex: '#0A1F33', use: 'Text, primary buttons, footer, dark sections' },
    white: { hex: '#FFFFFF', use: 'Page background and cards' },
    mist: { hex: '#EAF2FA', use: 'Light blue panels: statements, side panels, key facts' },
    line: { hex: '#D3E0EC', use: '1 px rules and card borders' },
    'line-soft': { hex: '#E6EEF6', use: 'Table row dividers' },
    mute: { hex: '#55697D', use: 'Secondary text on white' },
    'mute-dark': { hex: '#34495E', use: 'Body text on mist' },
    'on-dark': { hex: '#FFFFFF', use: 'Text on ink and on the hero' },
    'on-dark-mute': { hex: '#BFD3E6', use: 'Secondary text on ink' },
    placeholder: { hex: '#DCE8F3', use: 'Photo placeholders' },
    'hero-bg': { hex: '#05213D', use: 'Hero fallback behind the video' },
    'hero-shade': { value: 'rgba(5, 24, 46, .42)', use: 'Flat overlay on the hero video' },
  },
  practice: {
    royal: { hex: '#1458B8', no: '01', area: 'Coral reef intelligence', textOn: '#FFFFFF' },
    navy: { hex: '#0B3A6E', no: '02', area: 'Mangroves and blue carbon', textOn: '#FFFFFF' },
    teal: { hex: '#0A7EA4', no: '03', area: 'Coastal water and earth observation', textOn: '#FFFFFF' },
    sky: { hex: '#9CCBF2', no: '04', area: 'Field programmes and open innovation', textOn: '#0A1F33' },
  },
  type: {
    sans: 'Poppins (400, 500, 600, 700, 800); headlines 600',
    mono: 'IBM Plex Mono (400, 500); dates, credits and metadata only',
  },
};
const C = Object.fromEntries(
  [...Object.entries(tokens.core), ...Object.entries(tokens.practice)].map(([k, v]) => [k, v.hex ?? v.value]),
);

// Mark: 32-unit square with three rising bars (royal, sky, teal).
const bars = (s = 1, cx = 16, cy = 16) =>
  [
    [7, 18, 4, 8, C.royal],
    [14, 13, 4, 13, C.sky],
    [21, 7, 4, 19, C.teal],
  ]
    .map(([x, y, w, h, f]) => {
      const t = (v, c) => +(c + (v - c) * s).toFixed(3);
      return `<rect x="${t(x, cx)}" y="${t(y, cy)}" width="${+(w * s).toFixed(3)}" height="${+(h * s).toFixed(3)}" fill="${f}"/>`;
    })
    .join('');
const markSvg = (square = C.ink, size = 32, scale = 1) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><rect width="32" height="32" fill="${square}"/>${bars(scale)}</svg>`;

const poppins600 = readFileSync(new URL('node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2', root)).toString('base64');
const fontFace = `@font-face{font-family:'Poppins';font-weight:600;font-style:normal;src:url(data:font/woff2;base64,${poppins600}) format('woff2')}`;

const browser = await chromium.launch();
const page = await browser.newPage();

// Measure the wordmark with the real font so the SVG viewBox fits it exactly.
const H = 64; // mark height in the horizontal lockup (SVG units)
const FS = 40; // wordmark font size
const GAP = 20;
await page.setContent(`<!doctype html><style>${fontFace}</style><span id="w" style="font:600 ${FS}px Poppins;letter-spacing:-0.01em;white-space:nowrap">Reef Support</span>`);
await page.evaluate(() => document.fonts.ready);
const textW = Math.ceil(await page.$eval('#w', (el) => el.getBoundingClientRect().width));
const W = H + GAP + textW + 2;
// Baseline that centres Poppins cap height (about 0.70 em) on the mark.
const baseline = +(H / 2 + FS * 0.35).toFixed(2);

const lockupSvg = ({ bg, square, text, embedFont }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Reef Support">` +
  (embedFont ? `<style>${fontFace}</style>` : '') +
  (bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : '') +
  `<g transform="scale(${H / 32})"><rect width="32" height="32" fill="${square}"/>${bars()}</g>` +
  `<text x="${H + GAP}" y="${baseline}" fill="${text}" font-family="Poppins, 'Helvetica Neue', Arial, sans-serif" font-weight="600" font-size="${FS}" letter-spacing="-0.4">Reef Support</text></svg>`;

// White-on-ink lockup gets padding so the white square reads against the ink field.
const PAD = 16;
const lockupOnInk = (embedFont) => {
  const inner = lockupSvg({ square: C.white, text: C['on-dark'], embedFont: false });
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W + PAD * 2}" height="${H + PAD * 2}" viewBox="0 0 ${W + PAD * 2} ${H + PAD * 2}" role="img" aria-label="Reef Support">` +
    (embedFont ? `<style>${fontFace}</style>` : '') +
    `<rect width="${W + PAD * 2}" height="${H + PAD * 2}" fill="${C.ink}"/><g transform="translate(${PAD} ${PAD})">${inner.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g></svg>`
  );
};

const files = {
  'brand/reef-support-mark.svg': markSvg(C.ink, 512),
  'brand/reef-support-mark-white.svg': markSvg(C.white, 512),
  'brand/reef-support-logo.svg': lockupSvg({ square: C.ink, text: C.ink, embedFont: true }),
  'brand/reef-support-logo-white-on-ink.svg': lockupOnInk(true),
};
for (const [p, s] of Object.entries(files)) writeFileSync(out(p), s + '\n');

// Rasterise an SVG string at a given pixel width (height follows the aspect ratio).
async function png(svg, width, path, { transparent = false } = {}) {
  const [, vw, vh] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);
  const height = Math.round((width * vh) / vw);
  const sized = svg.replace(/width="[\d.]+" height="[\d.]+"/, `width="${width}" height="${height}"`);
  await page.setViewportSize({ width, height });
  await page.setContent(
    `<!doctype html><style>${fontFace}html,body{margin:0;background:transparent}svg{display:block}</style>${sized}`,
  );
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ omitBackground: transparent, clip: { x: 0, y: 0, width, height } });
  if (path) writeFileSync(out(path), buf);
  return buf;
}

// Logo pack PNGs (the dark lockup on a transparent background, the rest as drawn).
for (const w of [512, 1024]) {
  await png(files['brand/reef-support-mark.svg'], w, `brand/reef-support-mark-${w}.png`);
  await png(files['brand/reef-support-mark-white.svg'], w, `brand/reef-support-mark-white-${w}.png`);
  await png(files['brand/reef-support-logo.svg'], w, `brand/reef-support-logo-${w}.png`, { transparent: true });
  await png(files['brand/reef-support-logo-white-on-ink.svg'], w, `brand/reef-support-logo-white-on-ink-${w}.png`);
}

// Favicons and app icons.
const mark = markSvg(C.ink, 32);
await png(mark, 180, 'apple-touch-icon.png');
await png(mark, 192, 'icon-192.png');
await png(mark, 512, 'icon-512.png');
// Maskable: full-bleed ink, bars scaled to 80% so they stay inside the 40% radius safe zone.
await png(markSvg(C.ink, 32, 0.8), 512, 'icon-maskable-512.png');

// favicon.ico with PNG-encoded 16 and 32 px images.
const icoImages = [await png(mark, 16), await png(mark, 32)];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);
let offset = 6 + 16 * icoImages.length;
const dir = icoImages.map((buf, i) => {
  const size = [16, 32][i];
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
writeFileSync(out('favicon.ico'), Buffer.concat([header, ...dir, ...icoImages]));

await browser.close();

writeFileSync(
  out('site.webmanifest'),
  JSON.stringify(
    {
      name: 'Reef Support',
      short_name: 'Reef Support',
      start_url: '/',
      display: 'browser',
      theme_color: C.ink,
      background_color: C.white,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ) + '\n',
);

writeFileSync(
  out('brand/colours.json'),
  JSON.stringify({ source: 'DESIGN.md', ...tokens }, null, 2) + '\n',
);

console.log('Wrote favicon set, site.webmanifest and public/brand/ (lockup', W, 'x', H, ')');
