# Design system

Structure, spacing and restraint follow the RITA prototype (https://rita-woad.vercel.app). The look is blue on pure white: no beige, cream or warm tones anywhere. Headlines and body are set in Poppins; IBM Plex Mono appears only in small metadata. The home page opens with a full-bleed video hero.

## Principles

1. Pure white backgrounds and blue only. Colour signals a practice area or an action, never decoration.
2. Square corners everywhere (`border-radius: 0`). No shadows, glows or blur.
3. Type does the work: heavy, tight Poppins headlines, calm Poppins body.
4. One practice colour per card, tile or section.
5. Generous white space, strong left edge, left-aligned text.
6. Evidence first: numbers, dates and named partners beat adjectives.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | #0A1F33 | Text, primary buttons, footer, dark sections |
| `--white` | #FFFFFF | Page background and cards (the only background) |
| `--mist` | #EAF2FA | Light blue panels: statements, side panels, key facts |
| `--line` | #D3E0EC | 1 px rules and card borders (cards on white always get one) |
| `--line-soft` | #E6EEF6 | Table row dividers |
| `--mute` | #55697D | Secondary text on white |
| `--mute-dark` | #34495E | Body text on mist |
| `--on-dark` | #FFFFFF | Text on ink and on the hero |
| `--on-dark-mute` | #BFD3E6 | Secondary text on ink |
| `--placeholder` | #DCE8F3 | Photo placeholders |
| `--hero-bg` | #05213D | Hero fallback behind the video |
| `--hero-shade` | rgba(5,24,46,.42) | Flat overlay on the hero video for text contrast |

Practice areas (one colour each, used for tiles, card bars and kicker squares):

| No. | Area | Token | Hex | Text on it |
| --- | --- | --- | --- | --- |
| 01 | Coral reef intelligence | `--royal` | #1458B8 | White |
| 02 | Mangroves and blue carbon | `--navy` | #0B3A6E | White |
| 03 | Coastal water and earth observation | `--teal` | #0A7EA4 | White |
| 04 | Field programmes and open innovation | `--sky` | #9CCBF2 | Ink only |

Link hover colour is `--teal`. Contrast rules: white text on ink, royal, navy and teal; ink text on white, mist and sky; never blue text on a blue fill. Single light theme; no dark mode at launch.

## Typography

Poppins for display, headings, body, navigation, buttons and kickers. IBM Plex Mono only for dates, years, legal line, photo credits and small metadata.

| Role | Desktop / mobile | Font | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Hero display | 96 / 46 px | Poppins | 800 | 1.05 | -0.025em |
| Display (other pages) | 76 / 42 px | Poppins | 800 | 1.05 | -0.025em |
| H1 | 48 / 32 px | Poppins | 700 | 1.1 | -0.02em |
| H2 | 32 / 24 px | Poppins | 700 | 1.15 | -0.02em |
| H3 card title | 21 / 18 px | Poppins | 600 | 1.3 | -0.01em |
| Lead | 20 / 17 px | Poppins | 400 (500 on hero) | 1.5 | 0 |
| Body | 16 px | Poppins | 400 | 1.6 | 0 |
| Small, caption | 14 px | Poppins | 400 | 1.5 | 0 |
| Kicker (uppercase) | 12 px | Poppins | 600 | 1.4 | +0.1em |
| Metadata (dates, credits) | 12 to 13 px | Plex Mono | 400–500 | 1.4 | +0.04em |
| Big number | 64 / 48 px | Poppins | 700 | 1.0 | -0.03em |

Use `clamp()` between mobile and desktop sizes. Headlines in sentence case with `text-wrap: balance`. Running text no wider than 680 px. Buttons, nav links and labels at Poppins 600.

## Layout

- Container max width 1200 px; side margins 16 px (<640), 32 px (640–1024), 64 px (>1024), each wrapped in `max(..., env(safe-area-inset-*))`.
- 12-column grid, 24 px gutter.
- Spacing scale only: 8, 16, 24, 32, 48, 64, 96, 128 px. Sections 72 px top and bottom (48 px tight).
- Card grids: 3 columns desktop, 2 at ≤860 px, 1 at ≤600 px. Practice tiles: 4, then 2, then 1.

## Full-bleed video hero (home page only)

- Spans the full viewport width, edge to edge, directly under the sticky header. Height `clamp(520px, 82vh, 820px)`.
- `<video autoplay muted loop playsinline preload="metadata" poster="/video/hero-poster.webp">` with WebM and MP4 sources, `object-fit: cover`, behind a flat `--hero-shade` overlay (no gradient on the overlay).
- Content sits bottom-left inside the normal container: kicker, hero display headline in white (Poppins 800), lead in white at 500, then two buttons (primary white fill with ink text, secondary 2 px white outline).
- A bottom strip inside the hero, separated by a 1 px white rule at 22% opacity: left a credit for the footage in Plex Mono, right "Featured: Coral Lab, Lombok →" and a square Pause/Play button.
- `prefers-reduced-motion: reduce` shows the poster only. The video starts after first paint and pauses when scrolled out of view.
- Footage brief: underwater reef or Coral Lab tanks in Lombok, slow movement, natural light, no on-screen text, 1920×1080, 10–20 s seamless loop, under 5 MB.

## Components

| Component | Spec |
| --- | --- |
| Demo/notice bar | Optional ink strip above header, Plex Mono 12 px |
| Header | White, sticky at `top: env(safe-area-inset-top)`, 1 px bottom rule, 68 px tall; logo left; nav Work, Projects, Research, Insights, About (Poppins 500, 15 px, 2 px ink underline on the active item); "Contact" solid ink button; mobile "Menu" button opening a full-width list |
| Logo | Ink square with three rising bars in royal, sky and teal, then "Reef Support" in Poppins 700. White square version on ink. |
| Kicker | Poppins 600 uppercase 12 px, parts joined by ` · `, optional 12 px square in the practice colour |
| Practice tile | Filled with its practice colour, 32 px padding, min-height 240 px, kicker "01 · Practice area", H3 name, one-line description at the bottom |
| Card | White with 1 px `--line` border; 16:9 image; 6 px practice colour bar under it; kicker (area · country); H3; one-line summary; Plex Mono meta (years · status) |
| Facts strip | 5 label/value pairs, each with a 3 px ink rule on the left; label uppercase 11 px Poppins 600 mute; value 17 px Poppins 600 |
| Statement panel | Mist fill, 4 px ink top rule, one sentence at 22–34 px Poppins 700, a text link below |
| Partner wall | Grid of equal cells (6 / 3 / 2 columns) with 1 px borders; logos greyscale at 60% opacity, full colour on hover; plain name in the cell when no logo permission |
| List row | 1 px dividers under an ink top rule; columns: type label with colour square, title (500), source (mute), year right-aligned in Plex Mono |
| Status label | Outlined uppercase chip: Ongoing in teal, Completed in ink, Closed and Superseded in mute |
| Timeline | Vertical 1 px ink line, square ink markers, date in Plex Mono left column, text right |
| Person card | 4:5 portrait, 6 px practice bar, kicker role, H3 name, one-line focus |
| Buttons | Primary: ink fill, white Poppins 600, 12×20 px. Secondary: 2 px ink outline. On dark: white fill/ink text, or white outline. Square. |
| Filter chips | White, 1 px line border; selected state ink fill with white text |
| Footer | Ink background; white logo and one-line description; columns Work, Company, Connect (headings uppercase in sky); legal line in Plex Mono: "Reef Support B.V. · KvK 82884064 · Herengracht 551, 1017 BW Amsterdam" and Privacy · Cookies · Accessibility |
| Photo placeholder | `--placeholder` with fine diagonal lines and a bottom-left Plex Mono label on a 72% ink chip |

## Photography

Real field images only: Coral Lab tanks in Kecinan Bay, divers on transects, mangrove nurseries in East Lombok, Colombian restoration sites, Dutch coasts, people at work. Natural light, one photo per block, 16:9 or 4:3. Credit bottom-left in Plex Mono 12 px on a 72% ink chip. No stock globes, lightbulbs or handshakes. Text never sits directly on a busy photo.

## Motion

Hero video only, plus 150 ms colour and underline transitions on hover and a short fade between pages. Everything respects `prefers-reduced-motion`.

## Tokens

```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Poppins:wght@400;500;600;700;800&display=swap");

:root {
  --ink: #0A1F33; --white: #FFFFFF; --mist: #EAF2FA;
  --line: #D3E0EC; --line-soft: #E6EEF6; --mute: #55697D; --mute-dark: #34495E;
  --on-dark: #FFFFFF; --on-dark-mute: #BFD3E6; --placeholder: #DCE8F3;
  --hero-bg: #05213D; --hero-shade: rgba(5, 24, 46, .42);
  --royal: #1458B8; --navy: #0B3A6E; --teal: #0A7EA4; --sky: #9CCBF2;

  --sans: "Poppins", "Helvetica Neue", Arial, sans-serif;
  --mono: "IBM Plex Mono", "Courier New", ui-monospace, monospace;
  --fs-hero: clamp(46px, 7.4vw, 96px);
  --fs-display: clamp(42px, 6.2vw, 76px);
  --fs-h1: clamp(32px, 4vw, 48px);
  --fs-h2: clamp(24px, 2.8vw, 32px);
  --fs-h3: clamp(18px, 1.7vw, 21px);
  --fs-lead: clamp(17px, 1.6vw, 20px);
  --fs-body: 16px; --fs-small: 14px; --fs-kicker: 12px;

  --s-1: 8px; --s-2: 16px; --s-3: 24px; --s-4: 32px; --s-5: 48px; --s-6: 64px; --s-7: 96px; --s-8: 128px;
  --max: 1200px; --measure: 680px; --gutter: 24px; --margin: 16px; --radius: 0; --bar: 6px;
}
@media (min-width: 640px) { :root { --margin: 32px; } }
@media (min-width: 1024px) { :root { --margin: 64px; } }

html, body { background: var(--white); color: var(--ink); font-family: var(--sans); font-size: var(--fs-body); line-height: 1.6; }
h1, h2, h3 { font-weight: 700; text-wrap: balance; margin: 0; }
.kicker { font: 600 var(--fs-kicker)/1.4 var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--mute); }
a:hover { color: var(--teal); }
:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
* { border-radius: var(--radius); box-shadow: none; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
```
