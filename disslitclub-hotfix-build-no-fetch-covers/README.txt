DissLitClub build hotfix

Change:
- package.json build command changed from:
  node scripts/fetch-covers.mjs && astro build
  to:
  astro build

Purpose:
- Stop downloading covers from bookcover.longitood.com during every Cloudflare build.
- Use the local cover assets already stored in the repository.
- Prevent Cloudflare build timeouts caused by external cover requests.

Upload package.json to the repository root and replace the existing file.
