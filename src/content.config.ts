import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const colour = z.enum(['royal', 'navy', 'teal', 'sky']);
const areaId = z.enum(['coral-reefs', 'mangroves-blue-carbon', 'coastal-water', 'field-programmes']);

const areas = defineCollection({
  loader: file('src/data/areas.json'),
  schema: z.object({
    no: z.string(),
    name: z.string(),
    colour,
    tile: z.string(),
    lead: z.string(),
    whatWeDo: z.array(z.object({ title: z.string(), text: z.string() })),
    projects: z.array(z.string()),
    partners: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    title: z.string(),
    area: areaId,
    secondaryArea: areaId.optional(),
    country: z.string(),
    years: z.string(),
    status: z.string(),
    partners: z.string().optional(),
    funder: z.string().optional(),
    image: z.string(),
    summary: z.string(),
    problem: z.string(),
    whatWeDid: z.string(),
    toConfirm: z.string().optional(),
    outputs: z.array(z.object({ label: z.string(), url: z.string().optional(), toConfirm: z.string().optional() })),
    publish: z.boolean(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    type: z.enum(['Field note', 'News', 'Event']),
    area: areaId.optional(),
    summary: z.string(),
    originalUrl: z.string().url().optional(),
  }),
});

export const collections = { areas, projects, insights };
