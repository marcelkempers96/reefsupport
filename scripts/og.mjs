// Renders the default Open Graph image (1200x630) to public/og/default.png.
// Usage: npm run og   (needs Playwright with Chromium available)
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const company = JSON.parse(readFileSync(new URL('../src/data/company.json', import.meta.url), 'utf8'));

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Poppins:wght@600;800&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #FFFFFF; color: #0A1F33; font-family: Poppins, sans-serif;
         padding: 72px 80px; display: flex; flex-direction: column; position: relative; }
  .logo { display: flex; align-items: center; gap: 16px; font-weight: 600; font-size: 30px; letter-spacing: -0.01em; }
  h1 { font-weight: 800; font-size: 96px; line-height: 1.02; letter-spacing: -0.03em; margin-top: auto; max-width: 900px; }
  p { font-size: 26px; color: #55697D; margin-top: 24px; max-width: 900px; line-height: 1.4; }
  .meta { font-family: 'IBM Plex Mono', monospace; font-size: 18px; color: #55697D; margin-top: 40px; letter-spacing: .04em; }
  .bars { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; display: grid; grid-template-columns: repeat(4, 1fr); }
</style></head><body>
  <div class="logo"><svg width="48" height="48" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0A1F33"/><rect x="7" y="18" width="4" height="8" fill="#1458B8"/><rect x="14" y="13" width="4" height="13" fill="#9CCBF2"/><rect x="21" y="7" width="4" height="19" fill="#0A7EA4"/></svg>Reef Support</div>
  <h1>Evidence for healthy coasts</h1>
  <p>AI, field data and earth observation for coral reefs, mangroves and coastal waters.</p>
  <div class="meta">reef.support · ${company.legalName} · KvK ${company.kvk}</div>
  <div class="bars"><span style="background:#1458B8"></span><span style="background:#0B3A6E"></span><span style="background:#0A7EA4"></span><span style="background:#9CCBF2"></span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('../public/og/default.png', import.meta.url).pathname });
await browser.close();
console.log('Wrote public/og/default.png');
