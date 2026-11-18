# NeuroLabs — сайт + админка

Сайт: HTML + CSS + JavaScript, сборка через Vite (Three.js, GSAP, Lenis).
Админка и API: Cloudflare Pages Functions, проекты хранятся в KV, картинки в R2.

## Запуск на Mac
Нужен Node.js 18 или новее (`brew install node`).

```bash
cd neurolabs-site
npm install
npm run dev
```

- Сайт: http://localhost:5173
- Админка: http://localhost:5173/admin

Пароль для локальной админки лежит в файле `.dev.vars`:
```
ADMIN_PASSWORD=neurolabs-admin
```
Если файла нет, создайте его с этой строкой. Локальные проекты и картинки хранятся в папке `.wrangler/`. Это имитация Cloudflare, на настоящий сайт они не попадают.

## Админка
В админке можно добавлять, редактировать, скрывать и удалять проекты, менять их порядок, заполнять тексты на RU / EN / UZ, вставлять ссылки (Google Play, App Store, сайт, Telegram) и загружать скриншоты перетаскиванием. Сохраняется кнопкой «Сохранить на сайт» или сочетанием ⌘S.

Пока в админке ничего не сохранено, сайт показывает проекты из `projects.js`. После первого сохранения сайт берёт проекты из админки.

У каждого проекта есть своя ссылка: `https://neurolabs.uz/#project/<id>`.

## Публикация на Cloudflare (neurolabs.uz)
1. **Хранилища** в панели Cloudflare:
   - Storage & Databases → **KV** → Create → имя `neurolabs-projects`
   - **R2** → Create bucket → имя `neurolabs-media`
2. **Проект Pages:** Workers & Pages → Create → Pages → **Connect to Git** → выберите репозиторий:
   - Root directory: `neurolabs-site`
   - Build command: `npm run build`
   - Build output directory: `dist`
3. В проекте Pages откройте **Settings → Bindings** и добавьте:
   - KV namespace: имя переменной `PROJECTS_KV` → `neurolabs-projects`
   - R2 bucket: имя переменной `MEDIA` → `neurolabs-media`
4. **Settings → Variables and Secrets** → Add → тип *Secret*, имя `ADMIN_PASSWORD`, значение — придумайте надёжный пароль.
5. **Deployments** → Retry deployment, чтобы привязки подхватились.
6. **Custom domains** → добавьте `neurolabs.uz` и `www.neurolabs.uz`.

Готово: админка будет по адресу **https://neurolabs.uz/admin**.

Вместо подключения к Git можно публиковать из терминала: `npx wrangler login`, затем `npm run deploy`. Шаги 3–6 всё равно делаются в панели.

## Свой сервер (VPS) вместо Cloudflare
Серверу нужен только Node.js 18 или новее. Файл `server/server.js` отдаёт собранный сайт и обслуживает API админки. Проекты хранятся в `data/projects.json`, картинки в `data/uploads/`.

```bash
npm run build                                       # собрать dist/
echo "ADMIN_PASSWORD=надёжный-пароль" > .env       # пароль админки
echo "PORT=3000" >> .env
npm start                                           # http://127.0.0.1:3000
```
Перед сервером ставится nginx с HTTPS: он проксирует запросы на `127.0.0.1:3000`.

## Контакты
Telegram (@jorayevma) и телефон (+998 20 029 9898) задаются в начале `main.js`, в блоке `CONFIG`. Там же можно добавить почту.
