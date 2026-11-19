// llms.txt generated from company facts and published data (CONTENT.md section 14).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import company from '../data/company.json';
import team from '../data/team.json';
import { hasConfirm } from '../lib/confirm';

export const GET: APIRoute = async ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const areas = (await getCollection('areas')).sort((a, b) => a.data.no.localeCompare(b.data.no));
  const projects = (await getCollection('projects')).filter((p) => p.data.publish);
  const lines = [
    `# ${company.shortName}`,
    '',
    `> ${company.shortDescription}`,
    '',
    `${company.legalName}, KvK ${company.kvk}, ${company.registeredAddress}. Working base: ${company.workingBase}. Active since ${company.founded}.`,
    '',
    '## Practice areas',
    '',
    ...areas.map((a) => `- [${a.data.name}](${url(`/work/${a.id}`)}): ${a.data.tile}`),
    '',
    '## Projects',
    '',
    ...projects.map((p) => `- [${p.data.title}](${url(`/projects/${p.id}`)}) (${p.data.country}, ${p.data.status}): ${p.data.summary}`),
    '',
    '## Team',
    '',
    ...team.team.map((t) => `- ${t.name}, ${t.role}`),
    '',
    '## Contact',
    '',
    ...(hasConfirm(company.email) ? [] : [`- Email: ${company.email}`]),
    `- Contact page: ${url('/contact')}`,
    ...company.social.map((s) => `- ${s.label}: ${s.url}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
