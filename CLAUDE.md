# Video Controls Plus Documentation Site Guide

**Last Updated:** 2026-10-03

This public repository builds the Video Controls Plus Docusaurus site, served at
`https://vcpeai-docs.aoneahsan.com` from GitHub Pages. `CLAUDE.md` and `AGENTS.md` are mirrors; read
only the file native to the active agent and change both together. Product source lives in the
sibling `../video-controls-plus-extension/` repository, which is private.

## Stack

Docusaurus 3.10.2 (`future.v4`, `@docusaurus/faster`), React 19, TypeScript ~6.0.3, Yarn 4
(`nodeLinker: node-modules`), `@easyops-cn/docusaurus-search-local`. No analytics, no environment
variables, no backend.

## Commands

```bash
corepack enable
yarn install --immutable
yarn typecheck
yarn build
```

`yarn start` and `yarn serve` use port **5912**. Do not start either unless the owner asks or a
render check needs it. Use Yarn only; never npm or pnpm.

## Map

| Path | Purpose |
|---|---|
| `docs/` | Documentation pages in nested topic folders |
| `blog/` | Changelog entries at `/changelog`; source of the feeds |
| `sidebars.ts` | Curated navigation; update it in the same change as a page |
| `docusaurus.config.ts` | Site config and the inline `vcpeai-discovery` plugin (data for `/sitemap` and `/feed`, copies `changelog/rss.xml` to `/feed.xml`) |
| `src/css/custom.css` | Brand theme on Infima, light and dark |
| `src/pages/index.tsx` | Landing page; the `SECTIONS` array holds one `to` per section card |
| `src/pages/sitemap.tsx`, `src/pages/feed.tsx` | Human `/sitemap` and `/feed` |
| `static/` | Logo, share image (SVG master plus PNG), `robots.txt`, `llms.txt`, `CNAME` |
| `docs/MANUAL-TASKS.md` | Owner-only tasks; append rows, never tick them off |

## Public-repo rules

- No secret, `.env` file, key, test password or internal record ever enters this repository.
- No private planning text and no story files. `docs/story/` and `docs/MANUAL-TASKS.md` are
  excluded from the build by the docs plugin's `exclude` list; keep both entries, and keep the
  restated defaults beside them because `exclude` replaces the default list.
- GitHub Pages only. Never add Firebase files or another host.
- Product copy speaks as "the Video Controls Plus team".

## Content rules

- Claims come only from the product's shipped-feature list and are verified against product source
  before they are written here. An unverified fact is left out, not guessed.
- Every page carries `title` and `description` (155 characters or fewer) front matter.
- A page that is not approved carries `draft: true`; it is dropped from the production build and
  sidebar. Never ship placeholder prose, and never link to a draft from a published page.
- `onBrokenLinks`, `onBrokenAnchors` and broken Markdown links all throw, so the build is the link
  checker. Re-point the landing cards, footer links and `static/llms.txt` when a page is published.
- Moved pages get a redirect.

## Build notes

- The build reads page dates from Git (`showLastUpdateTime`, sitemap `lastmod`) and fails in a
  repository with no commits.
- Do not read or edit `node_modules/`, `build/` or `.docusaurus/`.
