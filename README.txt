DissLitClub cover hotfix

Upload ALL contents of this archive into the ROOT of the repository, preserving folders.
This update changes the build so approved Season 1–5 covers are fetched by Cloudflare during build and then served locally from /images/covers/.
Files:
- package.json
- scripts/fetch-covers.mjs
- src/data/cover-manifest.js
- src/pages/season/[id].astro
