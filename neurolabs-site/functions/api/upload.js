import { json, requireAdmin } from '../../lib/api.js';

const TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
const MAX = 8 * 1024 * 1024;

// POST /api/upload  (admin, multipart "file") → { url: '/media/uploads/....' }
export async function onRequestPost({ request, env }) {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!env.MEDIA) return json({ error: 'MEDIA (R2) binding missing — see README' }, 503);
  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') return json({ error: 'No file' }, 400);
  const ext = TYPES[file.type];
  if (!ext) return json({ error: 'Only PNG, JPG or WEBP' }, 400);
  if (file.size > MAX) return json({ error: 'File is larger than 8 MB' }, 400);
  const key = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  await env.MEDIA.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
  return json({ ok: true, url: '/media/' + key });
}
