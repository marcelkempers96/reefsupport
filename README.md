# ReefSupport website

A static one-page site (HTML, CSS and a little JavaScript). No build step.

## Files
- `index.html`: all page content. Edit text here.
- `assets/style.css`: colours and layout. The colour palette is at the top under `:root`.
- `assets/main.js`: mobile menu and footer year.
- `assets/favicon.svg`: logo / browser tab icon.

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Publish
`.github/workflows/pages.yml` deploys to GitHub Pages on every push to `main`.
Enable it once in the repo: **Settings → Pages → Source: GitHub Actions**.

## To do
- Replace placeholder impact figures in the "Impact so far" section.
- Change `hello@example.com` in the contact form to your real address (or use a form service like Formspree).
