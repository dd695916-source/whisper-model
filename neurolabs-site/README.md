# NeuroLabs — сайт

Статический сайт: `index.html`, `style.css`, `main.js` и библиотеки в `vendor/`. Сборка не нужна.

## Контакты
Откройте `main.js` и в самом верху замените значения в `CONFIG`: Telegram, почту и телефон.

## Локальный просмотр
```
python3 -m http.server 8000
```
Затем откройте http://localhost:8000. Если открыть `index.html` двойным кликом, работать не будет: модулям нужен сервер.

## Деплой на Cloudflare Pages (neurolabs.uz)
1. Cloudflare → Workers & Pages → Create → Pages → Upload assets.
2. Перетащите папку `neurolabs-site` целиком (или распакованный архив).
3. После деплоя: Custom domains → добавьте `neurolabs.uz` и `www.neurolabs.uz`.
