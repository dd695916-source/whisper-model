// Shared helpers for Cloudflare Pages Functions
export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });

const enc = new TextEncoder();
async function sha(s) { return new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s))); }

// Checks "Authorization: Bearer <password>" against env.ADMIN_PASSWORD (constant-time)
export async function requireAdmin(request, env) {
  if (!env.ADMIN_PASSWORD) return json({ error: 'ADMIN_PASSWORD is not configured on the server' }, 503);
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const [a, b] = await Promise.all([sha(given), sha(env.ADMIN_PASSWORD)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0 && given.length > 0 ? null : json({ error: 'Wrong password' }, 401);
}

const LANGS = ['en', 'ru', 'uz'];
const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
const ml = (v, max) => {
  if (typeof v === 'string') return str(v, max);
  const o = {};
  if (v && typeof v === 'object') for (const l of LANGS) o[l] = str(v[l], max);
  return o;
};
const mlList = v => {
  const o = {};
  for (const l of LANGS) o[l] = Array.isArray(v?.[l]) ? v[l].filter(x => typeof x === 'string' && x.trim()).slice(0, 30).map(x => x.slice(0, 300)) : [];
  if (Array.isArray(v)) { const a = v.filter(x => typeof x === 'string').slice(0, 30); for (const l of LANGS) o[l] = a; }
  return o;
};
const safeUrl = u => (typeof u === 'string' && /^(https?:\/\/|tg:\/\/)/i.test(u.trim()) ? u.trim().slice(0, 500) : '');
const safeImg = u => (typeof u === 'string' && /^(\/media\/|\/projects\/|https:\/\/)/.test(u) ? u.slice(0, 500) : null);

// Validates and normalises the projects list coming from the admin panel
export function cleanProjects(input) {
  if (!Array.isArray(input)) throw new Error('projects must be an array');
  if (input.length > 200) throw new Error('too many projects');
  const seen = new Set();
  return input.map((p, i) => {
    const id = str(p?.id, 40).toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error(`Project #${i + 1}: id must be latin letters, digits or "-"`);
    if (seen.has(id)) throw new Error(`Duplicate id "${id}"`);
    seen.add(id);
    const links = {};
    for (const k of ['googlePlay', 'appStore', 'website', 'telegram']) links[k] = safeUrl(p?.links?.[k]);
    return {
      id,
      title: str(p.title, 80) || id,
      category: ml(p.category, 120),
      short: ml(p.short, 400),
      description: ml(p.description, 3000),
      features: mlList(p.features),
      tags: (Array.isArray(p.tags) ? p.tags : []).filter(t => typeof t === 'string' && t.trim()).slice(0, 12).map(t => t.trim().slice(0, 30)),
      year: str(p.year, 20),
      platforms: str(p.platforms, 80),
      links,
      screenshots: (Array.isArray(p.screenshots) ? p.screenshots : []).map(safeImg).filter(Boolean).slice(0, 12),
      mock: ['delivery', 'community', 'ai'].includes(p.mock) ? p.mock : 'delivery',
      hidden: !!p.hidden,
    };
  });
}
