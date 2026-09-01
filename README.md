# DissLitClub v2

Astro static site for Cloudflare Workers static assets.

## Cloudflare
Build command: `npm run build`
Deploy command: `npx wrangler deploy`

## Content
All meeting data lives in `src/data/meetings.js`.
- Add `date`, `scores`, `youtube`, presentation path and photos there as the archive is restored.
- Each known meeting already has a generated clickable page.
- `Тревожные люди` — Фредрик Бакман is in Season 4, dated 17.04.2024, with its YouTube presentation linked.

## Local
`npm install`
`npm run dev`


## v6
- Isadora Cyr is loaded remotely for the hero slogan.
- Hero photo now dissolves gradually into the paper from farther left.
- Hero statistics are returned to normal document flow to prevent overlap.
