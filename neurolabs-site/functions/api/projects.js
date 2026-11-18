import { json, requireAdmin, cleanProjects } from '../../lib/api.js';

// GET /api/projects  → { projects: [...] } or { projects: null } when nothing saved yet
export async function onRequestGet({ env }) {
  if (!env.PROJECTS_KV) return json({ projects: null, note: 'PROJECTS_KV binding missing' });
  const raw = await env.PROJECTS_KV.get('projects');
  return json({ projects: raw ? JSON.parse(raw) : null }, 200, { 'cache-control': 'public, max-age=0, must-revalidate' });
}

// PUT /api/projects  (admin)  body: { projects: [...] }
export async function onRequestPut({ request, env }) {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!env.PROJECTS_KV) return json({ error: 'PROJECTS_KV binding missing — see README' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  try {
    const projects = cleanProjects(body.projects);
    await env.PROJECTS_KV.put('projects', JSON.stringify(projects));
    await env.PROJECTS_KV.put('projects:backup:' + new Date().toISOString(), JSON.stringify(projects), { expirationTtl: 60 * 60 * 24 * 30 });
    return json({ ok: true, projects });
  } catch (e) {
    return json({ error: e.message }, 400);
  }
}
