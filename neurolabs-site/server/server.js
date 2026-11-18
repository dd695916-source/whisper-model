// NeuroLabs production server for a regular VPS (no Cloudflare needed).
// Serves the built site from ../dist and the admin API:
//   GET  /api/projects   PUT /api/projects   POST /api/auth   POST /api/upload   GET /media/uploads/*
// Data: ./data/projects.json, ./data/uploads/   Config: .env (ADMIN_PASSWORD, PORT, HOST)
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { cleanProjects } from '../lib/api.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// minimal .env loader
try {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {}

const PORT = +(process.env.PORT || 3000);
const HOST = process.env.HOST || '127.0.0.1';
const PASSWORD = process.env.ADMIN_PASSWORD || '';
const DIST = path.join(ROOT, 'dist');
const DATA = path.join(ROOT, 'data');
const UPLOADS = path.join(DATA, 'uploads');
const PROJECTS_FILE = path.join(DATA, 'projects.json');
fs.mkdirSync(UPLOADS, { recursive: true });

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.woff2': 'font/woff2' };
const IMG = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
const MAX_UPLOAD = 8 * 1024 * 1024;

const send = (res, status, body, headers = {}) => { res.writeHead(status, headers); res.end(body); };
const json = (res, status, data) => send(res, status, JSON.stringify(data), { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });

function isAdmin(req) {
  if (!PASSWORD) return false;
  const given = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const a = crypto.createHash('sha256').update(given).digest(), b = crypto.createHash('sha256').update(PASSWORD).digest();
  return given.length > 0 && crypto.timingSafeEqual(a, b);
}
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    req.on('data', c => { size += c.length; if (size > limit) { reject(Object.assign(new Error('Too large'), { code: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
// simple brute-force protection for the admin password
const fails = new Map();
function tooMany(ip) { const f = fails.get(ip); return f && f.n >= 10 && Date.now() - f.t < 15 * 60e3; }
function fail(ip) { const f = fails.get(ip) || { n: 0, t: 0 }; f.n++; f.t = Date.now(); fails.set(ip, f); }

async function serveFile(res, file, cache) {
  try {
    const st = await fsp.stat(file);
    if (!st.isFile()) throw 0;
    res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'content-length': st.size, 'cache-control': cache });
    fs.createReadStream(file).pipe(res);
    return true;
  } catch { return false; }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = decodeURIComponent(url.pathname);
  const ip = String(req.headers['x-real-ip'] || req.socket.remoteAddress);
  try {
    // ---------- API ----------
    if (p.startsWith('/api/')) {
      const needsAdmin = !(p === '/api/projects' && req.method === 'GET');
      if (needsAdmin) {
        if (!PASSWORD) return json(res, 503, { error: 'ADMIN_PASSWORD is not configured on the server (.env)' });
        if (tooMany(ip)) return json(res, 429, { error: 'Too many attempts, try again in 15 minutes' });
        if (!isAdmin(req)) { fail(ip); return json(res, 401, { error: 'Wrong password' }); }
        fails.delete(ip);
      }
      if (p === '/api/projects' && req.method === 'GET') {
        try { return json(res, 200, { projects: JSON.parse(await fsp.readFile(PROJECTS_FILE, 'utf8')) }); }
        catch { return json(res, 200, { projects: null }); }
      }
      if (p === '/api/auth' && req.method === 'POST') return json(res, 200, { ok: true, storage: { kv: true, r2: true } });
      if (p === '/api/projects' && req.method === 'PUT') {
        let body; try { body = JSON.parse((await readBody(req, 2 * 1024 * 1024)).toString('utf8')); } catch { return json(res, 400, { error: 'Invalid JSON' }); }
        let projects; try { projects = cleanProjects(body.projects); } catch (e) { return json(res, 400, { error: e.message }); }
        const tmp = PROJECTS_FILE + '.tmp';
        await fsp.writeFile(tmp, JSON.stringify(projects, null, 2));
        try { await fsp.copyFile(PROJECTS_FILE, path.join(DATA, `projects.backup-${Date.now()}.json`)); } catch {}
        await fsp.rename(tmp, PROJECTS_FILE);
        // keep the 20 newest backups
        const backs = (await fsp.readdir(DATA)).filter(f => f.startsWith('projects.backup-')).sort();
        for (const f of backs.slice(0, -20)) await fsp.unlink(path.join(DATA, f)).catch(() => {});
        return json(res, 200, { ok: true, projects });
      }
      if (p === '/api/upload' && req.method === 'POST') {
        const type = String(req.headers['content-type'] || '').split(';')[0].trim();
        const ext = IMG[type]; if (!ext) return json(res, 400, { error: 'Only PNG, JPG or WEBP' });
        let buf; try { buf = await readBody(req, MAX_UPLOAD); } catch (e) { return json(res, e.code || 400, { error: 'File is larger than 8 MB' }); }
        if (!buf.length) return json(res, 400, { error: 'No file' });
        const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
        await fsp.writeFile(path.join(UPLOADS, name), buf);
        return json(res, 200, { ok: true, url: '/media/uploads/' + name });
      }
      return json(res, 404, { error: 'Not found' });
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');

    // ---------- uploaded media ----------
    if (p.startsWith('/media/uploads/')) {
      const name = path.basename(p);
      if (!/^[\w.-]+$/.test(name) || !(await serveFile(res, path.join(UPLOADS, name), 'public, max-age=31536000, immutable'))) send(res, 404, 'Not found');
      return;
    }
    // ---------- static site ----------
    let rel = p === '/' ? '/index.html' : (p === '/admin' || p === '/admin/') ? '/admin.html' : p;
    const file = path.join(DIST, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
    if (!file.startsWith(DIST)) return send(res, 403, 'Forbidden');
    const cache = rel.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache';
    if (await serveFile(res, file, cache)) return;
    if (await serveFile(res, path.join(DIST, 'index.html'), 'no-cache')) return; // unknown path → home
    send(res, 404, 'Not found');
  } catch (e) {
    console.error(e);
    if (!res.headersSent) json(res, 500, { error: 'Server error' });
  }
});
server.listen(PORT, HOST, () => console.log(`NeuroLabs running on http://${HOST}:${PORT}` + (PASSWORD ? '' : '  (⚠ ADMIN_PASSWORD not set — admin disabled)')));
