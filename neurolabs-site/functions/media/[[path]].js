// GET /media/<key> — serves uploaded images from R2
export async function onRequestGet({ params, env }) {
  if (!env.MEDIA) return new Response('Not found', { status: 404 });
  const key = (params.path || []).join('/');
  if (!key.startsWith('uploads/')) return new Response('Not found', { status: 404 });
  const obj = await env.MEDIA.get(key);
  if (!obj) return new Response('Not found', { status: 404 });
  return new Response(obj.body, {
    headers: {
      'content-type': obj.httpMetadata?.contentType || 'application/octet-stream',
      'cache-control': 'public, max-age=31536000, immutable',
      etag: obj.httpEtag,
    },
  });
}
