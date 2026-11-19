// llms.txt generated from company facts and published data (CONTENT.md section 14).
// Only published items; "[TO CONFIRM ...]" values are stripped or left out.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import company from '../data/company.json';
import team from '../data/team.json';
import about from '../data/about.json';
import research from '../data/research.json';
import { hasConfirm, stripConfirm, realUrl } from '../lib/confirm';

type Service = { id: string; title: string; summary: string };

// services.json is optional (owned by the services page); fall back to no section if absent.
const serviceModules = import.meta.glob<{ default: { services?: Service[] } }>('../data/services.json', { eager: true });
const services: Service[] = Object.values(serviceModules)[0]?.default?.services ?? [];

export const GET: APIRoute = async ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const areas = (await getCollection('areas')).sort((a, b) => a.data.no.localeCompare(b.data.no));
  const projects = (await getCollection('projects')).filter((p) => p.data.publish);
  const insights = (await getCollection('insights')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const clean = (s: string) => stripConfirm(s);
  const insightIds = new Set(insights.map((i) => i.id));

  const lines = [
    `# ${company.shortName}`,
    '',
    `> ${company.shortDescription}`,
    '',
    about.longDescription,
    '',
    `${company.legalName}, KvK ${company.kvk}, ${company.registeredAddress}. Working base: ${company.workingBase}. Active since ${company.founded}.`,
    '',
    '## Key facts',
    '',
    ...about.facts.map((f) => `- ${f.label}: ${f.value}`),
    '',
    '## Division of roles',
    '',
    'Reef Support designs monitoring, integrates partner data, runs AI analysis and produces reporting. It does not generate satellite products or carry out physical sampling; partners deliver those steps.',
    '',
    ...about.howWeWork.map((r) => `- ${r.role}: ${r.who}`),
    '',
    '## Practice areas',
    '',
    ...areas.map((a) => `- [${a.data.name}](${url(`/work/${a.id}`)}): ${a.data.tile}`),
    '',
    ...(services.length
      ? ['## Services', '', `Overview: ${url('/services')}`, '', ...services.map((s) => `- [${s.title}](${url(`/services#${s.id}`)}): ${clean(s.summary)}`), '']
      : []),
    '## Projects',
    '',
    ...projects.map((p) => `- [${p.data.title}](${url(`/projects/${p.id}`)}) (${clean(p.data.country)}, ${p.data.status}): ${clean(p.data.summary)}`),
    '',
    '## Research and open source',
    '',
    `- [Open source: Coral AI](${url('/research/open-source')}): YOLOv8 segmentation model that labels reef photos by coral type, algae, rubble and sand. MIT licence. The earlier GoogleNet classifier reached about 86% accuracy across six functional groups. For research and monitoring support with human review; not validated for regulatory reporting on its own.`,
    '- Coral AI model: https://huggingface.co/reefsupport/coral-ai',
    '- Coral AI browser demo: https://reefsupport-coral-ai-demo.hf.space',
    '- Code: https://github.com/reefsupport',
    `- [Methods](${url('/research/methods')}): the seven-step chain from monitoring design to reporting, with who is responsible for each step.`,
    `- [Publications](${url('/research/publications')}): models, papers and theses.`,
    `- [Hackathons](${url('/research/hackathons')}): open AI challenges since 2021.`,
    '',
    '### Publications',
    '',
    ...research.publications.map((p) => {
      const link = realUrl(p.url);
      const venue = hasConfirm(p.venue) ? '' : `, ${p.venue}`;
      return `- ${p.type}: ${link ? `[${p.title}](${link})` : p.title} (${p.authors}${venue}, ${p.year})`;
    }),
    '',
    '### Open AI challenges',
    '',
    ...research.hackathons.map((h) => {
      const link = realUrl(h.url);
      // Internal links only where the page exists (insight posts are migrated separately).
      const internalOk = link?.startsWith('/insights/') ? insightIds.has(link.slice('/insights/'.length)) : true;
      const href = link && internalOk ? (link.startsWith('/') ? url(link) : link) : undefined;
      return `- ${h.date}: ${href ? `[${h.title}](${href})` : h.title} (with ${h.partners})`;
    }),
    '',
    ...(insights.length
      ? ['## Insights', '', ...insights.slice(0, 20).map((i) => `- [${i.data.title}](${url(`/insights/${i.id}`)}) (${i.data.date.toISOString().slice(0, 10)}): ${clean(i.data.summary)}`), '']
      : []),
    '## Team',
    '',
    ...team.team.map((t) => `- ${t.name}, ${t.role}: ${t.focus}`),
    `- Team page: ${url('/about/team')}`,
    '',
    '## Key pages',
    '',
    `- [About](${url('/about')})`,
    `- [Partners and funders](${url('/about/partners')})`,
    `- [Awards and media](${url('/about/media')})`,
    `- [Work with us](${url('/about/opportunities')})`,
    `- [Policies](${url('/about/policies')})`,
    '',
    '## Contact',
    '',
    ...(hasConfirm(company.email) ? [] : [`- Email: ${company.email}`]),
    `- Phone: ${company.phone}`,
    `- Contact page: ${url('/contact')}`,
    ...company.social.map((s) => `- ${s.label}: ${s.url}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
