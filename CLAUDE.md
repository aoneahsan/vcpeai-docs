# Video Controls Plus Documentation Site Guide

**Last Updated:** 2026-11-27

This public repository builds the Video Controls Plus Docusaurus site, served at
`https://vcpeai-docs.aoneahsan.com` from GitHub Pages. `CLAUDE.md` and `AGENTS.md` are mirrors; read
only the file native to the active agent and change both together. Product source lives in the
sibling `../video-controls-plus-extension/` repository, which is private.

<!-- fleet:node-26-13-1 v1 --> Node 26.13.1 LTS (.nvmrc), packages latest — 2026-11-16

## Stack

Docusaurus 3.10.2 (`future.v4`, `@docusaurus/faster`), React 19, TypeScript ~7.0.2, Node 26.13.1 LTS (`.nvmrc`), Yarn 4
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
| `posts/` | Posts at `/blog` (author `team` in `posts/authors.yml`, marker `<!-- truncate -->`, no tags). The posts blog, its `/blog/rss.xml` and `/blog/atom.xml`, its search entries and the Blog links load only once `posts/` holds a post; commit a post before building, because its git date is its sitemap `lastmod`. `/feed.xml` stays the changelog |
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
- `trailingSlash: true` (GitHub Pages 404s the slashed form otherwise); every internal and `llms.txt` link uses the
  slashed form. Pages carry no `tags` front matter (`onInlineTags: 'throw'`); old tag addresses redirect through
  `plugins/seo-redirects.ts`, and a moved page gets an entry there in the same commit.
- `yarn build` ends with `yarn seo:contract` (`plugins/seo-contract.ts`): one title, description, `<h1>` and
  self-canonical per page, no `noindex` outside 404 and search, the site JSON-LD graph, the sitemap and every redirect.
  Search-console fix records live in `docs/search-consoles/` (excluded from the build).
