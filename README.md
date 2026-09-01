# DissLitClub — prototype

Первый рабочий прототип сайта книжного клуба.

## Как запустить на Mac

1. Установите Node.js LTS, если его ещё нет.
2. Откройте Terminal.
3. Перейдите в папку проекта:
   ```bash
   cd ~/Downloads/disslitclub-site
   ```
4. Установите зависимости:
   ```bash
   npm install
   ```
5. Запустите сайт:
   ```bash
   npm run dev
   ```
6. Откройте адрес, который покажет Terminal — обычно:
   `http://localhost:4321`

## Где менять встречи

`src/data/meetings.js`

## Где менять дизайн

`src/styles/global.css`

## Где лежит главная

`src/pages/index.astro`

## Логотип

`public/images/disslit-logo.png`

## Следующие шаги

- заменить демонстрационные встречи реальными;
- добавить отдельную страницу каждой встречи;
- добавить YouTube и PDF-презентации;
- подключить форму заявки;
- опубликовать на Cloudflare Pages / Vercel;
- подключить `disslit.club`.
