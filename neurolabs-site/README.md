# NeuroLabs — сайт

HTML + CSS + JavaScript, сборка через Vite. Библиотеки: Three.js, GSAP (ScrollTrigger), Lenis.

## Запуск на Mac
Нужен Node.js 18+ (`brew install node` или https://nodejs.org).

```bash
cd neurolabs-site
npm install      # один раз
npm run dev      # запустит сайт и откроет его в браузере (http://localhost:5173)
```

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
