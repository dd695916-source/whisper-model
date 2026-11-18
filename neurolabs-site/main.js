import * as THREE from './vendor/three.module.min.js';

/* ============================================================
   CONFIG — замените контакты на свои
   ============================================================ */
const CONFIG = {
  telegram: 'https://t.me/your_username',   // ← ваш Telegram
  email: 'hello@neurolabs.uz',              // ← ваша почта
  phone: '+998 00 000 00 00',               // ← ваш телефон
};

/* ============================================================
   i18n
   ============================================================ */
const T = {
  en: {
    'nav.services': 'Services', 'nav.work': 'Work', 'nav.process': 'Process', 'nav.cta': 'Start a project',
    'hero.eyebrow': 'Mobile · Web · AI — by Qayo Tech',
    'hero.sub': 'We turn bold ideas into powerful apps, websites and AI products — from first sketch to millions of users.',
    'hero.cta1': 'Start a project', 'hero.cta2': 'See our work', 'hero.scroll': 'Scroll',
    'mani': "We don't just write code. We design experiences people love, build systems that scale, and bring artificial intelligence into everyday products.",
    'mani.hl': 'love,|scale,|artificial|intelligence',
    'svc.title': 'What we build',
    'svc.1t': 'Mobile apps', 'svc.1d': 'Native-quality iOS & Android apps with Flutter, Kotlin and Swift. Smooth, fast, beautiful.',
    'svc.2t': 'Websites & platforms', 'svc.2d': 'Landing pages that convert, dashboards, marketplaces and complex web platforms.',
    'svc.3t': 'AI solutions', 'svc.3d': 'Chatbots, assistants, speech & vision models — AI that actually solves business problems.',
    'svc.4t': 'Backend & Cloud', 'svc.4d': 'Reliable APIs, payments, real-time chat and infrastructure that grows with you.',
    'svc.5t': 'UI/UX Design', 'svc.5d': 'Interfaces that feel effortless. Research, prototypes and pixel-perfect design systems.',
    'svc.6t': 'Bots & automation', 'svc.6d': 'Telegram bots, CRM integrations and automations that save hours every day.',
    'work.title': 'Selected work',
    'work.1c': 'Food delivery · Mobile', 'work.1d': 'A fast food & grocery delivery app: restaurants, live order tracking and payments in a few taps.',
    'work.2c': 'Education · Community', 'work.2d': 'A learning community with channels, voice rooms, video calls and file sharing — built for students.',
    'work.3c': 'Artificial Intelligence', 'work.3d': 'An AI assistant that understands speech, answers in Uzbek, Russian and English, and plugs into any business.',
    'work.4t': 'Your project<br>could be next.', 'work.4b': "Let's talk →",
    'proc.title': 'From idea to launch',
    'proc.1t': 'Discover', 'proc.1d': 'We dive into your idea, users and goals, and shape a clear plan.',
    'proc.2t': 'Design', 'proc.2d': 'Prototypes and visual design you can click through before a line of code.',
    'proc.3t': 'Build', 'proc.3d': 'Agile sprints, weekly demos, clean scalable code and real testing.',
    'proc.4t': 'Launch & grow', 'proc.4d': 'App Store, Google Play, servers — and support as your product grows.',
    'ct.eyebrow': "Let's build something great", 'ct.t1': 'Got an idea?', 'ct.t2': "Let's make it real.",
  },
  ru: {
    'nav.services': 'Услуги', 'nav.work': 'Проекты', 'nav.process': 'Процесс', 'nav.cta': 'Обсудить проект',
    'hero.eyebrow': 'Mobile · Web · AI — by Qayo Tech',
    'hero.sub': 'Превращаем смелые идеи в мощные приложения, сайты и AI-продукты — от первого эскиза до миллионов пользователей.',
    'hero.cta1': 'Обсудить проект', 'hero.cta2': 'Наши работы', 'hero.scroll': 'Листайте',
    'mani': 'Мы не просто пишем код. Мы создаём продукты, которые люди любят, строим системы, которые масштабируются, и встраиваем искусственный интеллект в повседневную жизнь.',
    'mani.hl': 'любят,|масштабируются,|искусственный|интеллект',
    'svc.title': 'Что мы делаем',
    'svc.1t': 'Мобильные приложения', 'svc.1d': 'iOS и Android приложения на Flutter, Kotlin и Swift. Плавные, быстрые, красивые.',
    'svc.2t': 'Сайты и платформы', 'svc.2d': 'Продающие лендинги, личные кабинеты, маркетплейсы и сложные веб-платформы.',
    'svc.3t': 'AI-решения', 'svc.3d': 'Чат-боты, ассистенты, распознавание речи и изображений — AI, который решает задачи бизнеса.',
    'svc.4t': 'Backend и облако', 'svc.4d': 'Надёжные API, платежи, чаты в реальном времени и инфраструктура, которая растёт вместе с вами.',
    'svc.5t': 'UI/UX дизайн', 'svc.5d': 'Интерфейсы, которыми легко пользоваться. Исследования, прототипы и дизайн-системы.',
    'svc.6t': 'Боты и автоматизация', 'svc.6d': 'Telegram-боты, интеграции с CRM и автоматизация, которая экономит часы каждый день.',
    'work.title': 'Наши проекты',
    'work.1c': 'Доставка еды · Mobile', 'work.1d': 'Быстрая доставка еды и продуктов: рестораны, отслеживание заказа и оплата в пару касаний.',
    'work.2c': 'Образование · Сообщество', 'work.2d': 'Учебное сообщество с каналами, голосовыми комнатами, видеозвонками и обменом файлами.',
    'work.3c': 'Искусственный интеллект', 'work.3d': 'AI-ассистент, который понимает речь, отвечает на узбекском, русском и английском и встраивается в любой бизнес.',
    'work.4t': 'Ваш проект<br>может быть следующим.', 'work.4b': 'Обсудить →',
    'proc.title': 'От идеи до запуска',
    'proc.1t': 'Погружение', 'proc.1d': 'Разбираемся в идее, пользователях и целях — и составляем чёткий план.',
    'proc.2t': 'Дизайн', 'proc.2d': 'Кликабельные прототипы и дизайн — ещё до первой строчки кода.',
    'proc.3t': 'Разработка', 'proc.3d': 'Спринты, еженедельные демо, чистый масштабируемый код и тестирование.',
    'proc.4t': 'Запуск и рост', 'proc.4d': 'App Store, Google Play, серверы — и поддержка по мере роста продукта.',
    'ct.eyebrow': 'Давайте создадим что-то крутое', 'ct.t1': 'Есть идея?', 'ct.t2': 'Воплотим её.',
  },
  uz: {
    'nav.services': 'Xizmatlar', 'nav.work': 'Loyihalar', 'nav.process': 'Jarayon', 'nav.cta': 'Loyiha boshlash',
    'hero.eyebrow': 'Mobile · Web · AI — by Qayo Tech',
    'hero.sub': "Jasur g'oyalarni kuchli ilovalar, veb-saytlar va AI mahsulotlarga aylantiramiz — birinchi eskizdan millionlab foydalanuvchilargacha.",
    'hero.cta1': 'Loyiha boshlash', 'hero.cta2': 'Ishlarimiz', 'hero.scroll': 'Pastga',
    'mani': "Biz shunchaki kod yozmaymiz. Odamlar sevadigan mahsulotlar yaratamiz, kengayadigan tizimlar quramiz va sun'iy intellektni kundalik hayotga olib kiramiz.",
    'mani.hl': 'sevadigan|kengayadigan|sun\'iy|intellektni',
    'svc.title': 'Nima qilamiz',
    'svc.1t': 'Mobil ilovalar', 'svc.1d': 'Flutter, Kotlin va Swift’da iOS va Android ilovalar. Silliq, tez, chiroyli.',
    'svc.2t': 'Veb-saytlar va platformalar', 'svc.2d': 'Sotuvchi landinglar, shaxsiy kabinetlar, marketpleyslar va murakkab platformalar.',
    'svc.3t': 'AI yechimlar', 'svc.3d': "Chat-botlar, assistentlar, nutq va tasvirni tanish — biznes muammolarini hal qiladigan AI.",
    'svc.4t': 'Backend va bulut', 'svc.4d': "Ishonchli API, to'lovlar, real-vaqt chat va siz bilan o'sadigan infratuzilma.",
    'svc.5t': 'UI/UX dizayn', 'svc.5d': 'Foydalanish oson interfeyslar. Tadqiqot, prototiplar va dizayn-tizimlar.',
    'svc.6t': 'Botlar va avtomatlashtirish', 'svc.6d': 'Telegram-botlar, CRM integratsiyalari va har kuni soatlab vaqt tejaydigan avtomatlashtirish.',
    'work.title': 'Loyihalarimiz',
    'work.1c': 'Ovqat yetkazish · Mobile', 'work.1d': "Tezkor ovqat va mahsulot yetkazish: restoranlar, buyurtmani kuzatish va bir necha bosishda to'lov.",
    'work.2c': "Ta'lim · Hamjamiyat", 'work.2d': "Kanallar, ovozli xonalar, video qo'ng'iroqlar va fayl almashish bilan o'quv hamjamiyati.",
    'work.3c': "Sun'iy intellekt", 'work.3d': "Nutqni tushunadigan, o'zbek, rus va ingliz tillarida javob beradigan AI assistent.",
    'work.4t': 'Keyingi loyiha<br>sizniki bo‘lishi mumkin.', 'work.4b': 'Gaplashamiz →',
    'proc.title': "G'oyadan ishga tushirishgacha",
    'proc.1t': "O'rganish", 'proc.1d': "G'oyangiz, foydalanuvchilar va maqsadlarni o'rganib, aniq reja tuzamiz.",
    'proc.2t': 'Dizayn', 'proc.2d': 'Bir qator kod yozilmasdan oldin bosib ko‘rish mumkin bo‘lgan prototiplar.',
    'proc.3t': 'Ishlab chiqish', 'proc.3d': 'Sprintlar, haftalik demo, toza va kengayadigan kod, real testlar.',
    'proc.4t': "Ishga tushirish va o'sish", 'proc.4d': "App Store, Google Play, serverlar — va mahsulot o'sishida qo'llab-quvvatlash.",
    'ct.eyebrow': 'Keling, zo‘r narsa yaratamiz', 'ct.t1': "G'oyangiz bormi?", 'ct.t2': 'Uni hayotga tatbiq etamiz.',
  },
};

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = matchMedia('(max-width: 900px)').matches;

/* ============================================================
   THREE — morphing golden particle field
   ============================================================ */
const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
const DPR = Math.min(devicePixelRatio, isMobile ? 1.5 : 2);
renderer.setPixelRatio(DPR);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0, 9);

const N = isMobile ? 4500 : 9000;
const rnd = (a, b) => a + Math.random() * (b - a);
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

function shapeBrain() {
  const out = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const inner = i % 6 === 0;
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    let x = Math.cos(th) * r, z = Math.sin(th) * r;
    // two hemispheres + folds
    const fold = 1 + 0.08 * Math.sin(x * 14) * Math.cos(y * 12) + 0.05 * Math.sin(z * 18);
    let R = (inner ? rnd(0.3, 2.2) : 2.6) * fold;
    let px = x * R * 1.18, py = y * R * 0.95, pz = z * R;
    px += Math.sign(px) * 0.12; // split hemispheres
    out.set([px, py, pz], i * 3);
  }
  return out;
}
function shapeWave(t = 0) {
  const out = new Float32Array(N * 3);
  const cols = Math.ceil(Math.sqrt(N * 1.8)), rows = Math.ceil(N / cols);
  for (let i = 0; i < N; i++) {
    const cx = (i % cols) / cols, cz = Math.floor(i / cols) / rows;
    const x = (cx - 0.5) * 22, z = (cz - 0.5) * 12 - 2;
    const y = Math.sin(x * 0.45 + t * 0.9) * 0.7 + Math.cos(z * 0.6 + t * 0.7) * 0.6 + Math.sin((x + z) * 0.25 + t * 0.5) * 0.5 - 2.6;
    out.set([x, y, z], i * 3);
  }
  return out;
}
function shapeGalaxy() {
  const out = new Float32Array(N * 3);
  const arms = 4;
  for (let i = 0; i < N; i++) {
    const r = Math.pow(Math.random(), 0.7) * 6.2 + 0.2;
    const arm = (i % arms) / arms * Math.PI * 2;
    const a = arm + r * 0.75 + gauss() * 0.35 / (0.4 + r * 0.2);
    out.set([Math.cos(a) * r, gauss() * 0.25 * (1.2 - r / 7), Math.sin(a) * r], i * 3);
  }
  return out;
}
function shapeHelix() {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const t = (i / N) * 2 - 1;
    const y = t * 6.5;
    const strand = i % 3;
    const a = y * 1.1 + (strand === 1 ? Math.PI : 0);
    let x, z;
    if (strand === 2) { // rungs
      const k = Math.random() * 2 - 1;
      x = Math.cos(y * 1.1) * 1.6 * k; z = Math.sin(y * 1.1) * 1.6 * k;
    } else {
      x = Math.cos(a) * 1.6 + gauss() * 0.08; z = Math.sin(a) * 1.6 + gauss() * 0.08;
    }
    out.set([x, y, z], i * 3);
  }
  return out;
}
function shapeLogo() {
  const out = new Float32Array(N * 3);
  const S = 2.6;
  const hex = [...Array(6)].map((_, k) => { const a = Math.PI / 2 + k * Math.PI / 3; return [Math.cos(a) * S, Math.sin(a) * S]; });
  const segs = [];
  for (let k = 0; k < 6; k++) segs.push([hex[k], hex[(k + 1) % 6]]);
  const n = [[-0.95, -1.25], [-0.95, 1.25], [0.95, -1.25], [0.95, 1.25]];
  segs.push([n[0], n[1]], [n[1], n[2]], [n[2], n[3]]);
  for (let i = 0; i < N; i++) {
    if (i % 7 === 0) { // halo dust
      const a = Math.random() * Math.PI * 2, r = rnd(3, 7);
      out.set([Math.cos(a) * r, Math.sin(a) * r, gauss() * 1.5], i * 3); continue;
    }
    const s = segs[i % segs.length], t = Math.random();
    const x = s[0][0] + (s[1][0] - s[0][0]) * t, y = s[0][1] + (s[1][1] - s[0][1]) * t;
    out.set([x + gauss() * 0.06, y + gauss() * 0.06, gauss() * 0.12], i * 3);
  }
  return out;
}
const shapes = [shapeBrain(), shapeWave(0), shapeGalaxy(), shapeHelix(), shapeLogo()];
const shapeTransforms = [ // per-shape group rotation offsets
  { rx: 0, ry: 0, s: 1 }, { rx: 0.25, ry: 0, s: 1 }, { rx: 0.9, ry: 0, s: 1 }, { rx: 0.15, ry: 0, s: 0.95 }, { rx: 0, ry: 0, s: 1 },
];

const geo = new THREE.BufferGeometry();
const pos = new Float32Array(N * 3);
// start exploded
for (let i = 0; i < N; i++) { pos[i * 3] = gauss() * 30; pos[i * 3 + 1] = gauss() * 30; pos[i * 3 + 2] = gauss() * 30; }
const col = new Float32Array(N * 3), size = new Float32Array(N), speed = new Float32Array(N), seed = new Float32Array(N);
const palette = ['#f7e3a1', '#e9c46a', '#d4a64a', '#fff1c9', '#b8862f', '#5fd3b0'].map(c => new THREE.Color(c));
for (let i = 0; i < N; i++) {
  const c = Math.random() < 0.1 ? palette[5] : palette[Math.floor(Math.random() * 5)];
  col.set([c.r, c.g, c.b], i * 3);
  size[i] = Math.random() < 0.04 ? rnd(2.2, 3.5) : rnd(0.6, 1.4);
  speed[i] = rnd(0.025, 0.075);
  seed[i] = Math.random() * 100;
}
geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));

const mat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
  uniforms: { uTime: { value: 0 }, uPR: { value: DPR }, uBoost: { value: 0 }, uDim: { value: 1 } },
  vertexShader: `
    attribute float aSize; attribute float aSeed;
    uniform float uTime; uniform float uPR; uniform float uBoost;
    varying vec3 vColor; varying float vTw;
    void main(){
      vec4 mv = modelViewMatrix * vec4(position,1.0);
      float tw = 0.65 + 0.35*sin(uTime*2.0 + aSeed);
      vTw = tw;
      gl_PointSize = aSize * (1.0 + uBoost) * uPR * (55.0 / -mv.z) * (0.8 + tw*0.4);
      gl_Position = projectionMatrix * mv;
      vColor = color;
    }`,
  fragmentShader: `
    varying vec3 vColor; varying float vTw; uniform float uDim;
    void main(){
      float d = length(gl_PointCoord - 0.5);
      if(d > 0.5) discard;
      float core = smoothstep(0.5, 0.0, d);
      float a = pow(core, 1.8);
      gl_FragColor = vec4(vColor * (0.7 + vTw*0.6), a * uDim);
    }`,
});
const points = new THREE.Points(geo, mat);
const group = new THREE.Group();
group.add(points);
scene.add(group);

// faint connecting web on hero brain (static lines sampled from shape 0)
const lineGeo = new THREE.BufferGeometry();
{
  const s = shapes[0], L = [];
  const pick = isMobile ? 500 : 1000;
  for (let k = 0; k < pick; k++) {
    const i = Math.floor(Math.random() * N), j = (i + 1 + Math.floor(Math.random() * 40)) % N;
    const dx = s[i*3]-s[j*3], dy = s[i*3+1]-s[j*3+1], dz = s[i*3+2]-s[j*3+2];
    if (dx*dx+dy*dy+dz*dz < 0.9) L.push(s[i*3], s[i*3+1], s[i*3+2], s[j*3], s[j*3+1], s[j*3+2]);
  }
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(L, 3));
}
const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xe9c46a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
group.add(lines);

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.position.z = camera.aspect < 0.8 ? 14 : 9;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

let shapeIdx = 0, mouseX = 0, mouseY = 0, smx = 0, smy = 0, velocity = 0, spin = 0;
const shapeSections = [...document.querySelectorAll('[data-shape]')];
function currentShape() {
  const mid = innerHeight * 0.5;
  for (const el of shapeSections) {
    const box = (el.parentElement.classList.contains('pin-spacer') ? el.parentElement : el).getBoundingClientRect();
    if (box.top <= mid && box.bottom >= mid) return +el.dataset.shape;
  }
  return shapeIdx;
}
addEventListener('pointermove', e => { mouseX = e.clientX / innerWidth - 0.5; mouseY = e.clientY / innerHeight - 0.5; });

const clock = new THREE.Clock();
let started = false;
function tick() {
  const t = clock.getElapsedTime();
  mat.uniforms.uTime.value = t;
  const next = currentShape();
  if (next !== shapeIdx) shapeIdx = next;
  if (shapeIdx === 1) shapes[1] = shapeWave(t);
  const target = shapes[shapeIdx];
  if (started) {
    for (let i = 0; i < N * 3; i += 3) {
      const k = speed[i / 3];
      pos[i] += (target[i] - pos[i]) * k;
      pos[i + 1] += (target[i + 1] - pos[i + 1]) * k;
      pos[i + 2] += (target[i + 2] - pos[i + 2]) * k;
    }
    geo.attributes.position.needsUpdate = true;
  }
  smx += (mouseX - smx) * 0.05; smy += (mouseY - smy) * 0.05;
  const tf = shapeTransforms[shapeIdx];
  spin += 0.0018 + Math.min(Math.abs(velocity) * 0.0006, 0.04);
  group.rotation.y = spin * (shapeIdx === 1 ? 0 : 1) + smx * 0.6;
  group.rotation.x += ((tf.rx + smy * 0.35) - group.rotation.x) * 0.05;
  if (shapeIdx === 4) group.rotation.y = Math.sin(t * 0.4) * 0.35 + smx * 0.6;
  mat.uniforms.uBoost.value += (Math.min(Math.abs(velocity) * 0.02, 0.8) - mat.uniforms.uBoost.value) * 0.1;
  lines.material.opacity += ((shapeIdx === 0 && started ? 0.12 : 0) - lines.material.opacity) * 0.05;
  const dimT = [0.75, 0.9, 0.42, 0.7, 1][shapeIdx];
  mat.uniforms.uDim.value += (dimT - mat.uniforms.uDim.value) * 0.05;
  velocity *= 0.92;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* ============================================================
   Smooth scroll + GSAP
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);
let lenis = null;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', e => { ScrollTrigger.update(); velocity = e.velocity; });
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
} else {
  addEventListener('scroll', () => { velocity = 10; });
}
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href'); if (id.length < 2 && id !== '#') return;
  const el = id === '#top' ? 0 : document.querySelector(id); if (el === null) return;
  e.preventDefault();
  lenis ? lenis.scrollTo(el, { duration: 1.6 }) : (el === 0 ? scrollTo(0, 0) : el.scrollIntoView({ behavior: 'smooth' }));
}));

// nav
ScrollTrigger.create({ start: 80, onUpdate: s => document.querySelector('.nav').classList.toggle('solid', s.scroll() > 80) });

// split helpers
function splitChars(el) {
  const txt = el.textContent; el.textContent = '';
  [...txt].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c === ' ' ? ' ' : c; el.appendChild(s); });
}
document.querySelectorAll('.hero-title .split').forEach(splitChars);

// HERO intro (played after loader)
function heroIntro() {
  const tl = gsap.timeline();
  tl.from('.hero-title .ch', { rotateX: -100, y: 140, z: -200, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.05 })
    .from('.hero .reveal-up', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12 }, '-=1.0')
    .from('.nav', { y: -40, opacity: 0, duration: .8, ease: 'power3.out' }, '-=0.9')
    .from('.scroll-hint', { opacity: 0, duration: .8 }, '-=0.4');
}
// hero scroll-out: 3D push into depth
gsap.to('.hero-inner', {
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  z: 300, rotateX: 18, opacity: 0, filter: 'blur(8px)', ease: 'none', transformPerspective: 900,
});

gsap.to('.scroll-hint', { scrollTrigger: { trigger: '.hero', start: 'top top', end: '20% top', scrub: true }, opacity: 0 });

// MANIFESTO word-by-word light-up
let maniST;
function buildManifesto(lang) {
  const el = document.querySelector('.mani-text');
  const hl = new Set((T[lang]['mani.hl'] || '').split('|'));
  el.innerHTML = T[lang].mani.split(' ').map(w => `<span class="w${hl.has(w) ? ' hl' : ''}">${w}</span>`).join(' ');
  maniST && maniST.kill();
  maniST = gsap.to(el.querySelectorAll('.w'), {
    opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: '.manifesto', start: 'top 70%', end: 'bottom 70%', scrub: true },
  });
}

// SERVICES — 3D fly-in + tilt
gsap.utils.toArray('.card').forEach((c, i) => {
  gsap.from(c, {
    scrollTrigger: { trigger: c, start: 'top 92%', end: 'top 55%', scrub: 1 },
    rotateX: 55, rotateY: (i % 3 - 1) * -25, y: 160, z: -300, opacity: 0, ease: 'power2.out', transformPerspective: 1200,
  });
});
if (matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', x * 100 + '%'); card.style.setProperty('--my', y * 100 + '%');
      gsap.to(card, { rotateY: (x - 0.5) * 16, rotateX: (0.5 - y) * 16, duration: 0.5, ease: 'power2.out', transformPerspective: 900 });
    });
    card.addEventListener('pointerleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,0.5)' }));
  });
}

// section titles — 3D flip-up
gsap.utils.toArray('.sec-title').forEach(t => gsap.from(t, {
  scrollTrigger: { trigger: t, start: 'top 90%', end: 'top 50%', scrub: 1 },
  rotateX: -80, y: 80, opacity: 0, transformOrigin: '50% 100%', transformPerspective: 800,
}));

// WORK — pinned horizontal with rotating 3D phones
const track = document.querySelector('.work-track');
const hTween = gsap.to(track, {
  x: () => -(track.scrollWidth - innerWidth), ease: 'none',
  scrollTrigger: { trigger: '.work', pin: true, scrub: 1, end: () => '+=' + (track.scrollWidth - innerWidth) * 1.1, invalidateOnRefresh: true, anticipatePin: 1 },
});
gsap.utils.toArray('.panel').forEach(p => {
  const ph = p.querySelector('.phone'), txt = p.querySelector('.panel-text') || p;
  if (ph) gsap.fromTo(ph, { rotateY: 55, rotateX: 12, rotateZ: -6, z: -200 }, {
    rotateY: -40, rotateX: -6, rotateZ: 4, z: 0, ease: 'none',
    scrollTrigger: { trigger: p, containerAnimation: hTween, start: 'left right', end: 'right left', scrub: true },
  });
  gsap.from(txt.children, {
    x: 120, opacity: 0, stagger: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: p, containerAnimation: hTween, start: 'left 80%', end: 'left 30%', scrub: 1 },
  });
});

// PROCESS — glowing line + steps
gsap.to('.steps-line i', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 60%', end: 'bottom 60%', scrub: true } });
gsap.utils.toArray('.step').forEach(s => gsap.from(s, {
  scrollTrigger: { trigger: s, start: 'top 85%', end: 'top 55%', scrub: 1 },
  x: -80, rotateY: 30, opacity: 0, transformPerspective: 1000, transformOrigin: 'left center',
}));

// CONTACT — big title 3D
gsap.from('.contact-title', {
  scrollTrigger: { trigger: '.contact', start: 'top 85%', end: 'top 25%', scrub: 1 },
  scale: 0.6, rotateX: 50, z: -400, opacity: 0, transformPerspective: 1000,
});
gsap.from('.contact-btns > *', {
  scrollTrigger: { trigger: '.contact-btns', start: 'top 95%', end: 'top 70%', scrub: 1 },
  y: 60, opacity: 0, stagger: 0.1,
});

/* contacts */
const btns = document.getElementById('contactBtns');
btns.innerHTML = `
  <a class="btn magnetic" href="${CONFIG.telegram}" target="_blank" rel="noopener">✈ Telegram</a>
  <a class="btn btn-ghost magnetic" href="mailto:${CONFIG.email}">✉ ${CONFIG.email}</a>
  <a class="btn btn-ghost magnetic" href="tel:${CONFIG.phone.replace(/\s/g, '')}">☎ ${CONFIG.phone}</a>`;
document.getElementById('yr').textContent = new Date().getFullYear();

/* magnetic buttons + cursor */
const cursor = document.getElementById('cursor');
if (matchMedia('(hover:hover)').matches) {
  const cx = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' }), cy = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', e => { cx(e.clientX); cy(e.clientY); });
  document.addEventListener('pointerover', e => cursor.classList.toggle('big', !!e.target.closest('a,button,.card')));
  document.querySelectorAll('.magnetic').forEach(m => {
    m.addEventListener('pointermove', e => {
      const r = m.getBoundingClientRect();
      gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' });
    });
    m.addEventListener('pointerleave', () => gsap.to(m, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' }));
  });
}

/* language */
function setLang(lang) {
  if (!T[lang]) lang = 'en';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T[lang][el.dataset.i18n]; if (v != null && el.dataset.i18n !== 'mani') el.innerHTML = v;
  });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  buildManifesto(lang);
  try { localStorage.setItem('nl-lang', lang); } catch (e) {}
  ScrollTrigger.refresh();
}
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
let initLang = 'en';
try { initLang = localStorage.getItem('nl-lang') || (navigator.language || 'en').slice(0, 2); } catch (e) {}
setLang(initLang);

/* loader */
document.body.classList.add('loading');
lenis && lenis.stop();
const num = document.getElementById('ldNum');
const prog = { v: 0 };
gsap.to(prog, {
  v: 100, duration: 1.8, ease: 'power2.inOut',
  onUpdate: () => (num.textContent = Math.round(prog.v)),
  onComplete: () => {
    gsap.to('#loader', {
      opacity: 0, duration: 0.6, onComplete: () => {
        document.getElementById('loader').remove();
        document.body.classList.remove('loading');
        lenis && lenis.start();
        started = true;
        heroIntro();
        ScrollTrigger.refresh();
      },
    });
  },
});
