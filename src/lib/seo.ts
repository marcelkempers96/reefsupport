// Search metadata helpers: canonical paths, per-page OG images, meta descriptions for
// collection pages, and page-level structured data (schema.org JSON-LD).
// Every value here comes from CONTENT.md via src/data and the content collections.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getEntry } from 'astro:content';
import company from '../data/company.json';
import team from '../data/team.json';
import { stripConfirm } from './confirm';

/**
 * Clean public path for canonical and og:url. With build.format 'file', Astro.url.pathname
 * ends in ".html" during the build ("/about.html"), while Vercel serves clean URLs
 * (cleanUrls: true, trailingSlash: false), so strip both.
 */
export function cleanPath(pathname: string): string {
  const p = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/**
 * Per-page Open Graph image rendered by scripts/og.mjs into public/og/<path>.png
 * (for example /og/work/coral-reefs.png). Falls back to the default image.
 */
export function ogImageFor(path: string): string {
  if (path === '/') return '/og/default.png';
  const rel = `/og${path}.png`;
  // Resolve from the project root: import.meta.url points into the bundle during a build.
  return existsSync(join(process.cwd(), 'public', rel)) ? rel : '/og/default.png';
}

/** Alt text for the OG image (the image shows the page title, kicker and the site name). */
export function ogImageAlt(title?: string): string {
  return title ? `${title}, Reef Support` : 'Reef Support: evidence for healthy coasts';
}

/** Meta descriptions (140 to 160 characters) for practice area pages, keyed by area id. */
export const areaDescriptions: Record<string, string> = {
  'coral-reefs':
    'Coral reef monitoring with open AI: Coral AI segments survey photos for coral cover, and 3D photogrammetry measures structure for reef restoration monitoring.',
  'mangroves-blue-carbon':
    'Mangrove monitoring for community restoration: GPS-tagged field records, survival and growth tracking and blue carbon estimates, with Indonesia Biru Foundation.',
  'coastal-water':
    'Coastal water quality monitoring: partner satellite products, sensor and field data combined into indicators for Nature Restoration Regulation and WFD reports.',
  'field-programmes':
    'Coral Lab in Lombok with Indonesia Biru Foundation, six open AI challenges since 2021, and student research with TU Delft and the University of Amsterdam.',
};

/** Meta descriptions for case studies, keyed by project id. Projects not listed use their summary. */
export const projectDescriptions: Record<string, string> = {
  'coral-lab-lombok':
    'Land-based coral lab in Kecinan Bay, West Lombok, built in 2021 with Indonesia Biru Foundation and four TU Delft students, and run by IBF day to day.',
  'coral-ai':
    'Coral AI is an open YOLOv8 model that segments reef survey photos into coral, algae, rubble and sand for cover estimates, on Hugging Face under an MIT licence.',
  'photogrammetry-colombia':
    '3D photogrammetry for coral reef restoration in Colombia: a twin-camera rig and 3D reef models with Corales de Paz, funded by WWF Netherlands INNO-fonds (2023).',
  'akar-biru-lombok':
    'Community mangrove programme in Lombok with women-majority cooperatives, led by Indonesia Biru Foundation, with Reef Support as technical partner.',
  'mangrove-ai':
    'Mangrove AI records planting, survival and growth through GPS-tagged field observations and estimates growth and carbon uptake; the models are in calibration.',
  'algae-tracker':
    'Algae Tracker R&D tested detection of cyanobacteria, turbidity, temperature and salinity in European waters from Copernicus Sentinel-2 and Sentinel-3 imagery.',
  'plastic-tracker':
    'Plastic Tracker (2022 to 2023) trained models to detect floating debris in rivers and coastal water from satellite imagery, with Dutch and Romanian case studies.',
  'coastal-gis':
    "Reef Support's first earth observation product, built in 2021 to 2023 at ESA BIC Noordwijk, showing coastal ocean and weather conditions from satellite data.",
};

export const areaDescription = (id: string, fallback: string) => areaDescriptions[id] ?? fallback;
export const projectDescription = (id: string, fallback: string) => projectDescriptions[id] ?? fallback;

// ---------------------------------------------------------------------------
// Structured data
// ---------------------------------------------------------------------------

type Ld = Record<string, unknown>;
const abs = (p: string, site: URL) => new URL(p, site).href;
const orgRef = (site: URL) => ({ '@id': abs('/#organization', site) });

/** WebSite with a sitelinks search box pointing at the Pagefind search page (/search?q=). */
function websiteLd(site: URL): Ld {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website', site),
    url: site.href,
    name: company.shortName,
    description: company.tagline,
    inLanguage: 'en-GB',
    publisher: orgRef(site),
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: abs('/search', site) + '?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Coral AI, the open model on /research/open-source (CONTENT.md section 6). */
function coralAiLd(site: URL): Ld {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': abs('/research/open-source#coral-ai', site),
    name: 'Coral AI',
    description:
      'A YOLOv8 segmentation model that labels reef photos by coral type, algae, rubble and sand, so cover estimates for transects come straight from survey images. For research and monitoring support with human review; not validated for regulatory reporting on its own.',
    url: 'https://huggingface.co/reefsupport/coral-ai',
    codeRepository: 'https://github.com/reefsupport',
    license: 'https://opensource.org/licenses/MIT',
    datePublished: '2024-11',
    keywords: ['coral reef monitoring', 'image segmentation', 'YOLOv8', 'coral cover'],
    author: orgRef(site),
    publisher: orgRef(site),
    targetProduct: {
      '@type': 'SoftwareApplication',
      name: 'Coral AI demo',
      url: 'https://reefsupport-coral-ai-demo.hf.space',
      applicationCategory: 'Image analysis',
      operatingSystem: 'Web browser',
    },
  };
}

/** The three core team members on /about/team (CONTENT.md section 9). */
function teamLd(site: URL): Ld[] {
  const tud = { '@type': 'CollegeOrUniversity', name: 'TU Delft', url: 'https://www.tudelft.nl/' };
  const alumni: Record<string, Ld[]> = {
    'marcel-kempers': [tud],
    'yohan-runhaar': [tud],
  };
  return team.team.map((p) => ({
    '@type': 'Person',
    '@id': abs(`/about/team#${p.slug}`, site),
    name: p.name,
    jobTitle: p.role,
    description: p.focus,
    url: abs(`/about/team#${p.slug}`, site),
    worksFor: orgRef(site),
    ...(alumni[p.slug] ? { alumniOf: alumni[p.slug] } : {}),
    ...(p.links?.length ? { sameAs: p.links.map((l) => l.url) } : {}),
  }));
}

/** Organisation names from a CONTENT.md partner or funder string, with notes removed. */
function orgNames(value?: string): string[] {
  if (!value || /^\s*\[TO CONFIRM/.test(value)) return [];
  return stripConfirm(value)
    .split(',')
    .map((s) => s.replace(/\s*\([^)]*\)/g, '').replace(/\s+incubation$/i, '').trim())
    .filter(Boolean);
}

/** A published case study as a ResearchProject, with partners and funder where present. */
async function projectLd(slug: string, site: URL): Promise<Ld | undefined> {
  const entry = await getEntry('projects', slug);
  if (!entry || !entry.data.publish) return undefined;
  const p = entry.data;
  const area = await getEntry('areas', p.area);
  const place = p.country === 'Global' ? undefined : p.country.split(',').map((c) => c.trim());
  const funders = orgNames(p.funder ?? undefined);
  const partners = orgNames(p.partners ?? undefined);
  return {
    '@type': 'ResearchProject',
    '@id': abs(`/projects/${slug}#project`, site),
    name: p.title,
    description: projectDescription(slug, stripConfirm(p.summary)),
    url: abs(`/projects/${slug}`, site),
    ...(area ? { knowsAbout: area.data.name } : {}),
    ...(place ? { location: place.map((name) => ({ '@type': 'Place', name })) } : {}),
    ...(funders.length ? { funder: funders.map((name) => ({ '@type': 'Organization', name })) } : {}),
    member: [orgRef(site), ...partners.map((name) => ({ '@type': 'Organization', name }))],
  };
}

/**
 * Page-level JSON-LD for the given clean path. Organization is emitted by the home and about
 * pages, Article by insight pages, ItemList of Service by /services and BreadcrumbList by
 * the Breadcrumbs component, so none of those are repeated here.
 */
export async function pageLd(path: string, site: URL): Promise<Ld[]> {
  if (path === '/') return [websiteLd(site)];
  if (path === '/research/open-source') return [coralAiLd(site)];
  if (path === '/about/team') return teamLd(site);
  const m = path.match(/^\/projects\/([a-z0-9-]+)$/);
  if (m) {
    const ld = await projectLd(m[1], site);
    return ld ? [ld] : [];
  }
  return [];
}
