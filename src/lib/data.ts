import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { isDev } from './confirm';

export type Area = CollectionEntry<'areas'>;
export type Project = CollectionEntry<'projects'>;
export type Insight = CollectionEntry<'insights'>;

export const colourVar = (c: string) => `var(--${c})`;
/** Text colour that passes contrast on a practice-colour fill (DESIGN.md). */
export const onColour = (c: string) => (c === 'sky' ? 'var(--ink)' : 'var(--white)');

export async function getAreas(): Promise<Area[]> {
  const areas = await getCollection('areas');
  return areas.sort((a, b) => a.data.no.localeCompare(b.data.no));
}

export async function getArea(id: string): Promise<Area> {
  const a = await getEntry('areas', id);
  if (!a) throw new Error(`Unknown practice area: ${id}`);
  return a;
}

/** Published projects only in production; dev also shows unpublished ones. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.filter((p) => p.data.publish || isDev);
}

export async function getInsights(): Promise<Insight[]> {
  const all = await getCollection('insights');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Drop links to /insights/<slug> posts that have not been migrated yet. */
export async function liveUrl(url?: string | null): Promise<string | null | undefined> {
  if (!url || !url.startsWith('/insights/')) return url;
  const ids = new Set((await getCollection('insights')).map((i) => i.id));
  return ids.has(url.slice('/insights/'.length)) ? url : null;
}
