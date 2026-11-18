import { PROJECTS as DEFAULTS } from './projects.js';

const $ = s => document.querySelector(s);
const LANGS = ['ru', 'en', 'uz'];
const ML = ['category', 'short', 'description', 'features'];
const LINKS = ['googlePlay', 'appStore', 'website', 'telegram'];

let pw = '';
let projects = [];
let sel = -1;
let lang = 'ru';
let dirty = false;

/* ---------- helpers ---------- */
function toast(msg, bad = false) {
  const t = $('#toast');
  t.textContent = msg; t.classList.toggle('bad', bad); t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), bad ? 5000 : 2600);
}
async function api(path, opts = {}) {
  const r = await fetch(path, { ...opts, headers: { ...(opts.headers || {}), Authorization: 'Bearer ' + pw } });
  let data = {};
  try { data = await r.json(); } catch (e) {}
  if (r.status === 401) { logout(); throw new Error('Сессия истекла — войдите снова'); }
  if (!r.ok) throw new Error(data.error || 'Ошибка сервера (' + r.status + ')');
  return data;
}
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const TR = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ы:'y',э:'e',ю:'yu',я:'ya',ў:'o',қ:'q',ғ:'g',ҳ:'h' };
const slug = s => s.toLowerCase().split('').map(c => TR[c] ?? c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);

// make every project have the same shape
function normalize(p) {
  const o = { ...p };
  for (const f of ML) {
    const v = p[f];
    const isList = f === 'features';
    const empty = isList ? [] : '';
    if (v == null) o[f] = { ru: empty, en: empty, uz: empty };
    else if (typeof v === 'string' || Array.isArray(v)) o[f] = { en: v, ru: empty, uz: empty };
    else o[f] = { ru: v.ru ?? empty, en: v.en ?? empty, uz: v.uz ?? empty };
  }
  o.links = { googlePlay: '', appStore: '', website: '', telegram: '', ...(p.links || {}) };
  o.tags = Array.isArray(p.tags) ? p.tags : [];
  o.screenshots = Array.isArray(p.screenshots) ? p.screenshots : [];
  o.mock = p.mock || 'delivery';
  o.hidden = !!p.hidden;
  o.year = p.year || ''; o.platforms = p.platforms || ''; o.title = p.title || ''; o.id = p.id || '';
  return o;
}
function setDirty(v = true) {
  dirty = v;
  $('#savebar').classList.toggle('dirty', v);
  $('#dirtyMsg').textContent = v ? 'Есть несохранённые изменения' : 'Все изменения сохранены';
}

/* ---------- auth ---------- */
async function login(password) {
  pw = password;
  const r = await fetch('/api/auth', { method: 'POST', headers: { Authorization: 'Bearer ' + pw } });
  let d = {}; try { d = await r.json(); } catch (e) {}
  if (!r.ok) {
    if (r.status === 404) throw new Error('API не найден. Запустите сайт командой npm run dev');
    throw new Error(d.error === 'Wrong password' ? 'Неверный пароль' : (d.error || 'Ошибка входа'));
  }
  try { sessionStorage.setItem('nl-admin', pw); } catch (e) {}
  return d;
}
function logout() {
  pw = ''; try { sessionStorage.removeItem('nl-admin'); } catch (e) {}
  $('#app').hidden = true; $('#login').hidden = false; $('#pw').value = ''; $('#pw').focus();
}
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  $('#loginErr').textContent = '';
  try { const info = await login($('#pw').value); await start(info); }
  catch (err) { $('#loginErr').textContent = err.message; }
});
$('#logout').addEventListener('click', () => { if (!dirty || confirm('Есть несохранённые изменения. Выйти?')) logout(); });

/* ---------- load ---------- */
async function start(info) {
  $('#login').hidden = true; $('#app').hidden = false;
  const banner = $('#banner');
  const missing = [];
  if (!info.storage?.kv) missing.push('KV (PROJECTS_KV) — хранилище проектов');
  if (!info.storage?.r2) missing.push('R2 (MEDIA) — хранилище картинок');
  const r = await fetch('/api/projects', { cache: 'no-store' }).then(r => r.json()).catch(() => ({}));
  if (Array.isArray(r.projects)) {
    projects = r.projects.map(normalize);
    banner.hidden = !missing.length;
  } else {
    projects = DEFAULTS.map(normalize);
    banner.hidden = false;
    banner.classList.remove('bad');
    banner.innerHTML = 'Сейчас на сайте проекты из файла <b>projects.js</b>. Отредактируйте их и нажмите <b>«Сохранить на сайт»</b> — дальше всё будет управляться отсюда.';
    setDirty(true);
  }
  if (missing.length) {
    banner.hidden = false; banner.classList.add('bad');
    banner.innerHTML = 'На сервере не подключено: ' + missing.join(', ') + '. Сохранение не сработает — см. README, раздел «Админка».';
  }
  $('#status').textContent = projects.length + ' проектов';
  sel = projects.length ? 0 : -1;
  renderList(); renderForm();
}

/* ---------- list ---------- */
function renderList() {
  $('#plist').innerHTML = projects.map((p, i) => `
    <li class="${i === sel ? 'on' : ''}" data-i="${i}">
      <span class="thumb">${p.screenshots[0] ? `<img src="${esc(p.screenshots[0])}" alt="">` : esc((p.title || '?')[0].toUpperCase())}</span>
      <span class="pt"><strong>${esc(p.title || 'Без названия')}</strong><small>${esc(p.id || '—')}</small></span>
      ${p.hidden ? '<span class="badge">скрыт</span>' : ''}
      <span class="mv"><button type="button" data-mv="-1" title="Выше">▲</button><button type="button" data-mv="1" title="Ниже">▼</button></span>
    </li>`).join('');
  $('#status').textContent = projects.length + ' проектов';
}
$('#plist').addEventListener('click', e => {
  const li = e.target.closest('li'); if (!li) return;
  const i = +li.dataset.i;
  const mv = e.target.closest('[data-mv]');
  if (mv) {
    const j = i + +mv.dataset.mv;
    if (j < 0 || j >= projects.length) return;
    [projects[i], projects[j]] = [projects[j], projects[i]];
    if (sel === i) sel = j; else if (sel === j) sel = i;
    setDirty(); renderList(); return;
  }
  sel = i; renderList(); renderForm();
});
$('#addBtn').addEventListener('click', () => {
  projects.unshift(normalize({ id: '', title: '' }));
  sel = 0; setDirty(); renderList(); renderForm();
  F('title').focus();
});

/* ---------- form ---------- */
const form = $('#form');
const F = name => form.elements.namedItem(name);
function renderForm() {
  const p = projects[sel];
  $('#empty').hidden = !!p; form.toggleAttribute('hidden', !p);
  if (!p) return;
  $('#edTitle').textContent = p.title || 'Новый проект';
  F('title').value = p.title; F('id').value = p.id; F('year').value = p.year; F('platforms').value = p.platforms;
  F('tags').value = p.tags.join(', ');
  F('hidden').checked = p.hidden;
  F('mock').value = p.mock;
  for (const k of LINKS) F('link_' + k).value = p.links[k] || '';
  $('#previewBtn').href = '/#project/' + encodeURIComponent(p.id);
  fillLang(); renderShots();
}

function fillLang() {
  const p = projects[sel]; if (!p) return;
  document.querySelectorAll('.ml').forEach(box => {
    const f = box.dataset.field, el = box.querySelector('input,textarea');
    const v = p[f][lang];
    el.value = Array.isArray(v) ? v.join('\n') : (v || '');
  });
  document.querySelectorAll('#ltabs button').forEach(b => {
    b.classList.toggle('on', b.dataset.l === lang);
    b.classList.toggle('filled', ML.some(f => { const v = p[f][b.dataset.l]; return Array.isArray(v) ? v.length : v; }));
  });
}
$('#ltabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; lang = b.dataset.l; fillLang(); });

form.addEventListener('input', e => {
  const p = projects[sel]; if (!p) return;
  const t = e.target;
  const ml = t.closest('.ml');
  if (ml) {
    const f = ml.dataset.field;
    p[f][lang] = f === 'features' ? t.value.split('\n').map(s => s.trim()).filter(Boolean) : t.value;
    fillLangDots();
  } else if (t.name === 'title') {
    const autoId = !p.id || p.id === slug(p.title);
    p.title = t.value;
    if (autoId) { p.id = slug(t.value); F('id').value = p.id; }
    $('#edTitle').textContent = p.title || 'Новый проект';
  } else if (t.name === 'id') {
    p.id = t.value.toLowerCase().replace(/[^a-z0-9-]/g, ''); t.value = p.id;
  } else if (t.name === 'tags') {
    p.tags = t.value.split(',').map(s => s.trim()).filter(Boolean);
  } else if (t.name === 'hidden') {
    p.hidden = t.checked;
  } else if (t.name?.startsWith('link_')) {
    p.links[t.name.slice(5)] = t.value.trim();
  } else if (t.name === 'year' || t.name === 'platforms') {
    p[t.name] = t.value;
  }
  $('#previewBtn').href = '/#project/' + encodeURIComponent(p.id);
  setDirty(); renderList();
});
form.addEventListener('change', e => { if (e.target.name === 'mock') { projects[sel].mock = e.target.value; setDirty(); } });
form.addEventListener('submit', e => e.preventDefault());
function fillLangDots() {
  const p = projects[sel];
  document.querySelectorAll('#ltabs button').forEach(b =>
    b.classList.toggle('filled', ML.some(f => { const v = p[f][b.dataset.l]; return Array.isArray(v) ? v.length : v; })));
}

$('#delBtn').addEventListener('click', () => {
  const p = projects[sel]; if (!p) return;
  if (!confirm(`Удалить проект «${p.title || p.id || 'без названия'}»?`)) return;
  projects.splice(sel, 1);
  sel = Math.min(sel, projects.length - 1);
  setDirty(); renderList(); renderForm();
});

/* ---------- screenshots ---------- */
function renderShots() {
  const p = projects[sel];
  $('#shots').innerHTML = p.screenshots.map((s, i) => `
    <div class="shot" data-i="${i}">
      <img src="${esc(s)}" alt="">
      <span class="n">${i + 1}</span>
      <div class="sb">
        <button type="button" data-a="left" title="Левее">←</button>
        <button type="button" class="rm" data-a="rm" title="Удалить">✕</button>
        <button type="button" data-a="right" title="Правее">→</button>
      </div>
    </div>`).join('');
}
$('#shots').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const p = projects[sel], i = +b.closest('.shot').dataset.i, a = p.screenshots;
  if (b.dataset.a === 'rm') a.splice(i, 1);
  if (b.dataset.a === 'left' && i > 0) [a[i - 1], a[i]] = [a[i], a[i - 1]];
  if (b.dataset.a === 'right' && i < a.length - 1) [a[i + 1], a[i]] = [a[i], a[i + 1]];
  setDirty(); renderShots(); renderList();
});

// shrink big images in the browser before upload
async function prepare(file) {
  if (file.size < 600 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 1290 / bmp.width, 2800 / bmp.height);
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise(r => c.toBlob(r, 'image/webp', 0.88));
    return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, '.webp'), { type: 'image/webp' }) : file;
  } catch (e) { return file; }
}
async function upload(files) {
  const p = projects[sel]; if (!p) return;
  for (const f of files) {
    if (!/^image\/(png|jpeg|webp)$/.test(f.type)) { toast(`${f.name}: нужен PNG, JPG или WEBP`, true); continue; }
    const ph = document.createElement('div'); ph.className = 'shot loading'; ph.textContent = 'Загрузка…'; $('#shots').appendChild(ph);
    try {
      const file = await prepare(f);
      const d = await api('/api/upload', { method: 'POST', headers: { 'content-type': file.type }, body: file });
      p.screenshots.push(d.url); setDirty();
    } catch (err) { toast(err.message, true); }
    renderShots(); renderList();
  }
}
$('#file').addEventListener('change', e => { upload([...e.target.files]); e.target.value = ''; });
const drop = $('#drop');
['dragenter', 'dragover'].forEach(ev => form.addEventListener(ev, e => { if (e.dataTransfer?.types.includes('Files')) { e.preventDefault(); drop.classList.add('over'); } }));
['dragleave', 'drop'].forEach(ev => form.addEventListener(ev, () => drop.classList.remove('over')));
form.addEventListener('drop', e => { if (e.dataTransfer?.files.length) { e.preventDefault(); upload([...e.dataTransfer.files]); } });

/* ---------- save ---------- */
$('#saveBtn').addEventListener('click', async () => {
  // validate
  const ids = new Set();
  for (const [i, p] of projects.entries()) {
    if (!p.title.trim()) { sel = i; renderList(); renderForm(); return toast('Укажите название проекта', true); }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(p.id)) { sel = i; renderList(); renderForm(); return toast(`«${p.title}»: ID — только латиница, цифры и «-»`, true); }
    if (ids.has(p.id)) { sel = i; renderList(); renderForm(); return toast(`ID «${p.id}» уже занят другим проектом`, true); }
    ids.add(p.id);
    for (const k of LINKS) if (p.links[k] && !/^(https?:\/\/|tg:\/\/)/i.test(p.links[k])) {
      sel = i; renderList(); renderForm(); return toast(`«${p.title}»: ссылка должна начинаться с https://`, true);
    }
  }
  const btn = $('#saveBtn'); btn.disabled = true; btn.textContent = 'Сохраняю…';
  try {
    const d = await api('/api/projects', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ projects }) });
    projects = d.projects.map(normalize);
    setDirty(false); renderList(); renderForm();
    if (!$('#banner').classList.contains('bad')) $('#banner').hidden = true;
    toast('Сохранено! Обновите сайт, чтобы увидеть изменения ✓');
  } catch (err) { toast(err.message, true); }
  btn.disabled = false; btn.textContent = 'Сохранить на сайт';
});
addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); if (!$('#app').hidden) $('#saveBtn').click(); } });
addEventListener('beforeunload', e => { if (dirty && pw) { e.preventDefault(); e.returnValue = ''; } });

/* ---------- auto-login within the tab ---------- */
(async () => {
  let saved = '';
  try { saved = sessionStorage.getItem('nl-admin') || ''; } catch (e) {}
  if (saved) { try { await start(await login(saved)); } catch (e) { logout(); } }
})();
