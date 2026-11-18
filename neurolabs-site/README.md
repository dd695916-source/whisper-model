# NeuroLabs — сайт

HTML + CSS + JavaScript, сборка через Vite. Библиотеки: Three.js, GSAP (ScrollTrigger), Lenis.

## Запуск на Mac
Нужен Node.js 18+ (`brew install node` или https://nodejs.org).

```bash
cd neurolabs-site
npm install      # один раз
npm run dev      # запустит сайт и откроет его в браузере (http://localhost:5173)
```

## Что внутри
- 3D-частицы (Three.js) меняют форму по секциям: мозг → волна → галактика → ДНК → логотип; разлетаются от курсора.
- Анимации на скролле (GSAP ScrollTrigger), плавный скролл (Lenis).
- Языки EN / RU / UZ, мобильное меню, полоса прогресса.
- SEO: Open Graph, favicon, robots.txt, sitemap.xml, JSON-LD.
- Без WebGL сайт тоже работает (просто без 3D).

## Как добавить или изменить проект
Все проекты хранятся в файле **`projects.js`**. Подробная инструкция написана прямо в нём, в комментарии вверху.

1. Скопируйте блок проекта `{ ... }` и поменяйте поля: название, описание, возможности, технологии.
2. Ссылки впишите в `links`: `googlePlay`, `appStore`, `website`, `telegram`. Пустые ссылки на сайте не показываются.
3. Скриншоты положите в `public/projects/<id>/` и перечислите в `screenshots: ['/projects/<id>/1.png']`.
4. У каждого проекта есть своя ссылка: `https://neurolabs.uz/#project/<id>`.

## Контакты
В начале `main.js` замените значения в `CONFIG`: Telegram, почту и телефон.

## Сборка для публикации
```bash
npm run build    # готовый сайт появится в папке dist/
npm run preview  # посмотреть собранную версию
```

## Деплой на Cloudflare Pages (neurolabs.uz)
**Вариант А, вручную:** `npm run build`, затем Cloudflare → Workers & Pages → Create → Pages → Upload assets → перетащите папку `dist`.

**Вариант Б, через GitHub (автодеплой):** Create → Pages → Connect to Git → выберите репозиторий и укажите:
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `neurolabs-site`

Затем Custom domains → добавьте `neurolabs.uz` и `www.neurolabs.uz`.
