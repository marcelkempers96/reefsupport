# Assets brief: footage, photos and portraits

This brief is for the owner and any photographer or videographer working for Reef Support B.V. It lists every image the site is waiting for, the formats the site needs, where each file goes in the repository and what permission must be in hand before it is published. Facts and project names come from `CONTENT.md`; rules come from `CLAUDE.md` and `DESIGN.md`.

The site uses real field material only. No stock images (globes, lightbulbs, handshakes), no AI-generated or composited imagery of reefs, mangroves or people, and no photos from other organisations without their written permission. Until a real file arrives, the page shows a `PhotoPlaceholder` with a label naming the shot it is waiting for.

## 1. Hero video (home page)

| Item | Requirement |
| --- | --- |
| Subject | Underwater reef or the Coral Lab tanks in Kecinan Bay, Lombok |
| Movement | Slow and steady, natural light, no fast pans or zooms |
| On-screen content | No text, logos, watermarks or recognisable faces unless the person has signed consent |
| Source resolution | 1920 x 1080, landscape 16:9 |
| Length | 10 to 20 s, cut as a seamless loop (first and last frames match) |
| Audio | None (the video plays muted) |
| Delivery to the site | `hero.mp4` (H.264) and `hero.webm` (VP9 or AV1), each under 5 MB |
| Poster | `hero-poster.webp`, 1920 x 1080, a still frame from the clip; it is the LCP image, so keep it under 200 KB |
| Credit | Name of the person who filmed it, for the Plex Mono credit in the hero strip |

Files go in `public/video/`. Then set the `video` constant in `src/pages/index.astro` (an example line is in the file), including the `credit` text.

Suggested encoding commands, run on the master file:

```bash
ffmpeg -i master.mov -an -vf "scale=1920:-2,fps=25" -c:v libx264 -profile:v high -crf 28 -preset slow -movflags +faststart public/video/hero.mp4
ffmpeg -i master.mov -an -vf "scale=1920:-2,fps=25" -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 public/video/hero.webm
ffmpeg -ss 2 -i master.mov -frames:v 1 -vf "scale=1920:-2" -q:v 75 public/video/hero-poster.webp
```

Raise the `-crf` value if a file is over 5 MB.

## 2. Field photos per published project

One lead photo per project, landscape. `DESIGN.md` asks for 16:9 or 4:3; deliver 16:9 where possible because cards and case studies crop to 16:9. Natural light, people at work rather than posed, and no text placed over a busy photo. The label in the right-hand column is the placeholder text the site shows today (from `src/data/projects.json`).

| Project (slug) | Shot wanted | Placeholder label today |
| --- | --- | --- |
| Coral Lab, Lombok (`coral-lab-lombok`) | Coral Lab tanks in Kecinan Bay, West Lombok, ideally with IBF staff at work | Coral Lab tanks, Kecinan Bay |
| Coral AI (`coral-ai`) | A real reef survey photo next to its Coral AI segmentation output (screenshot from the Hugging Face demo is fine if the source photo is ours or licensed) | Segmented reef transect |
| 3D photogrammetry for reef restoration (`photogrammetry-colombia`) | The twin-camera rig built by Corales de Paz in use on the Caribbean coast of Colombia, or a render of one of the 3D reef models | Twin-camera rig, Caribbean coast |
| Akar Biru Lombok (`akar-biru-lombok`) | Mangrove nursery in East Lombok with the community team; the programme is led by Indonesia Biru Foundation, so IBF chooses and approves the image | Mangrove nursery, East Lombok |
| Mangrove AI (`mangrove-ai`) | Seedlings being recorded with a GPS-tagged field record (phone or tablet in hand) | GPS-tagged seedlings |
| Algae Tracker (`algae-tracker`) | A map from the project showing bloom indicators, with the satellite data source credited (Copernicus Sentinel-2 or -3) | Sentinel-2 bloom map |
| Plastic Tracker (`plastic-tracker`) | A map or image from the Netherlands or Romania case study showing a debris hotspot | River debris hotspot |
| Coastal GIS and satellite data tool (`coastal-gis`) | A screenshot of the tool showing a mapped coastal area | Coastal conditions map |

Projects marked `publish: false` in `CONTENT.md` (the Singapore Oceanarium pilot) get no photo work until written consent to be named exists.

Useful extra shots for practice pages and insights, from the `DESIGN.md` photography list: divers on transects, Colombian restoration sites, Dutch coasts.

## 3. Team portraits

| Person | Role (from `CONTENT.md`) | Status |
| --- | --- | --- |
| Marcel Kempers | Co-founder and Director | Portrait needed |
| Yohan Runhaar | Co-founder and Technical Lead | Portrait needed |
| Nikole Gualdron Chaparro | Director of Marine Science | Portrait needed |

- Portrait format 4:5, minimum 1600 x 2000 px at source.
- Plain, light background or a real work setting (lab, field, office) in natural light; head and shoulders; consistent framing across the three.
- No heavy retouching, filters or cut-out backgrounds.
- Alumni and students appear only with `consent: true` in `src/data/team.json`, so do not shoot or publish portraits of them without that.

## 4. File naming

Lower case, hyphens, no spaces, the subject first, then a short descriptor and the width:

```
<slug>-<descriptor>-<width>.<ext>
coral-lab-lombok-tanks-1280.avif
coral-lab-lombok-tanks-1280.webp
marcel-kempers-portrait-640.avif
```

- Project photos start with the project slug from `CONTENT.md`.
- Portraits start with the team slug (`marcel-kempers`, `yohan-runhaar`, `nikole-gualdron-chaparro`).
- Never use a removed name from `CLAUDE.md` in a filename, folder or metadata field.

## 5. Sizes and formats

| Use | Aspect | Widths to export | Formats |
| --- | --- | --- | --- |
| Project and insight photos | 16:9 | 640, 1280, 1920 | AVIF and WebP |
| Team portraits | 4:5 | 640, 1280 | AVIF and WebP |
| Hero poster | 16:9 | 1920 | WebP |

- Keep the original master files outside the repository (shared drive); only the exported sizes go into `public/`.
- Targets: under 150 KB at 1280 px for AVIF, under 250 KB for WebP.
- Strip GPS and camera EXIF data before export, unless the location is meant to be public.
- Example with `sharp-cli` or `squoosh`: export each width once as AVIF (quality about 50) and once as WebP (quality about 75).

## 6. Where each file goes

| File | Location | Hooked up in |
| --- | --- | --- |
| Hero video and poster | `public/video/` | `video` constant in `src/pages/index.astro` |
| Project photos | `public/images/projects/` | Replace `PhotoPlaceholder` in `src/components/ProjectCard.astro` and `src/pages/projects/[slug].astro` |
| Team portraits | `public/images/team/` | Replace `PhotoPlaceholder` in `src/components/PersonCard.astro` |
| Insight images | `public/images/insights/` | Frontmatter of the post in `src/content/insights/` |
| Press photos | `public/brand/photos/` | Press kit section in `src/pages/about/media.astro` |
| Logo pack and favicons | `public/brand/`, `public/` | Generated by `node scripts/brand.mjs` (see below) |

Each published image needs width and height attributes, real alt text describing what is in the photo (not "image of"), and a credit rendered in Plex Mono on the 72% ink chip bottom-left.

## 7. Credit and permission checklist

Tick every line before a file is committed:

- [ ] Photographer or videographer name recorded for the credit line
- [ ] Written permission from the rights holder for use on reef.support and in the press kit (email is enough), saved with the master file
- [ ] Partner approval where the image shows a partner's site or programme (IBF for Coral Lab and Akar Biru Lombok, Corales de Paz for Colombia)
- [ ] Signed consent from every recognisable person; for minors, consent from a parent or guardian, or do not use the image
- [ ] No partner logo visible unless that partner's logo is `granted` in `src/data/partners.json`
- [ ] Satellite products credited to their source (Copernicus Sentinel data, or Water Insight B.V. for their water quality products)
- [ ] Caption checked against `CONTENT.md`: no claim, number or result that is not there (Coral Lab's 500 m² is a target, not a result)
- [ ] Location and date of capture noted for the caption
- [ ] EXIF location removed where the site should not be pinpointed
- [ ] Filename and alt text pass the grep check in `CLAUDE.md` section 5

## 8. Logo pack and favicons

The logo pack in `public/brand/` and the favicon set in `public/` are generated from the three-bar mark (`public/favicon.svg`) by:

```bash
node scripts/brand.mjs   # needs Playwright with Chromium; Poppins comes from @fontsource
```

It writes `favicon.ico` (16 and 32 px), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `site.webmanifest`, and in `public/brand/` the mark and horizontal lockup as SVG (dark on white, white on ink) with PNG exports at 512 and 1024 px wide, plus `colours.json` with the `DESIGN.md` tokens. The wordmark is set in Poppins 600; the SVG lockups embed the font so they render correctly in a browser. If the owner decides to keep the current mark instead of the three-bar mark (open item in `CLAUDE.md`), update the geometry in the script and run it again.
