import { json, requireAdmin } from '../../lib/api.js';

// POST /api/auth — checks the admin password
export async function onRequestPost({ request, env }) {
  const denied = await requireAdmin(request, env);
  return denied || json({ ok: true, storage: { kv: !!env.PROJECTS_KV, r2: !!env.MEDIA } });
}
