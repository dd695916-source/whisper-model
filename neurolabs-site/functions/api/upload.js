import { json, requireAdmin } from '../../lib/api.js';

const TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
const MAX = 8 * 1024 * 1024;

// POST /api/upload  (admin, raw image body with Content-Type) → { url: '/media/uploads/....' }
export async function onRequestPost({ request, env }) {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!env.MEDIA) return json({ error: 'MEDIA (R2) binding missing — see README' }, 503);
  const type = (request.headers.get('content-type') || '').split(';')[0].trim();
  const ext = TYPES[type];
  if (!ext) return json({ error: 'Only PNG, JPG or WEBP' }, 400);
  const buf = await request.arrayBuffer();
  if (!buf.byteLength) return json({ error: 'No file' }, 400);
  if (buf.byteLength > MAX) return json({ error: 'File is larger than 8 MB' }, 400);
  const key = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  await env.MEDIA.put(key, buf, { httpMetadata: { contentType: type } });
  return json({ ok: true, url: '/media/' + key });
}
