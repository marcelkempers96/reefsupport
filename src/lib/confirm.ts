// Helpers for "[TO CONFIRM ...]" markers in CONTENT.md data.
// Dev builds show the marker; production builds hide it (CLAUDE.md).
const MARKER = /\[TO CONFIRM[^\]]*\]/g;

export const isDev = import.meta.env.DEV;

export function hasConfirm(value?: string | null): boolean {
  return !!value && value.includes('[TO CONFIRM');
}

/** Remove markers and tidy the spacing/punctuation left behind. */
export function stripConfirm(value: string): string {
  return value
    .replace(MARKER, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:)])/g, '$1')
    .replace(/\(\s*\)/g, '')
    .trim();
}

export type Part = { text: string } | { confirm: string };

/** Split a string into plain text and marker parts, for inline rendering. */
export function splitConfirm(value: string): Part[] {
  const out: Part[] = [];
  let last = 0;
  for (const m of value.matchAll(MARKER)) {
    if (m.index! > last) out.push({ text: value.slice(last, m.index) });
    const note = m[0].replace(/^\[TO CONFIRM:?\s*/, '').replace(/\]$/, '');
    out.push({ confirm: note });
    last = m.index! + m[0].length;
  }
  if (last < value.length) out.push({ text: value.slice(last) });
  return out;
}

/** A value that is entirely a marker or depends on one: hide it in production. */
export function showValue(value?: string | null): value is string {
  if (!value) return false;
  return isDev || !hasConfirm(value);
}

/** A usable URL (not null, not a marker). */
export function realUrl(url?: string | null): string | undefined {
  return url && !hasConfirm(url) ? url : undefined;
}
