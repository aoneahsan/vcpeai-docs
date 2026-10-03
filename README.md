# Video Controls Plus documentation

The public documentation site for **Video Controls Plus**, a browser extension for video playback
control. Built with [Docusaurus](https://docusaurus.io/) and served from GitHub Pages.

<a id="links"></a>
## 🔗 Links&nbsp;[#](#links)

| What | Where |
|---|---|
| Live docs | <https://vcpeai-docs.aoneahsan.com> |
| Product website | <https://vcpeai.aoneahsan.com> |
| This repository | <https://github.com/aoneahsan/vcpeai-docs> |

<a id="develop"></a>
## 🚀 Develop&nbsp;[#](#develop)

```bash
corepack enable     # use the pinned Yarn version (yarn@4.17.1)
yarn install
yarn start          # local dev server on port 5911
```

<a id="build"></a>
## 🧪 Build&nbsp;[#](#build)

```bash
yarn typecheck      # TypeScript, no emit
yarn build          # production build; fails on any broken link or anchor
yarn serve          # serve the built site on port 5911
```

A page with `draft: true` in its front matter is left out of the production build and its sidebar.
The build reads page dates from Git, so it needs at least one commit in the repository.

<a id="deploy"></a>
## 📦 Deploy&nbsp;[#](#deploy)

Pushing to `main` builds and deploys to GitHub Pages through
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). The custom domain is set
by [`static/CNAME`](static/CNAME). This site is never deployed to any other host.

<a id="structure"></a>
## 🗂 Structure&nbsp;[#](#structure)

| Path | Holds |
|---|---|
| `docs/` | The documentation pages, in nested topic folders. `docs/MANUAL-TASKS.md` and `docs/story/` are excluded from the build. |
| `blog/` | Changelog entries, served at `/changelog`; source of the RSS and Atom feeds. |
| `docusaurus.config.ts`, `sidebars.ts` | Site configuration and navigation. |
| `src/css/custom.css` | Brand theme, light and dark. |
| `src/pages/index.tsx` | Landing page. |
| `src/pages/sitemap.tsx`, `src/pages/feed.tsx` | The `/sitemap` and `/feed` pages. `/feed.xml` is copied from `changelog/rss.xml` at build time. |
| `static/` | Logo, share image, `robots.txt`, `llms.txt`, `CNAME`. |

<a id="contributing"></a>
## 🤝 Contributing&nbsp;[#](#contributing)

See [CONTRIBUTING.md](CONTRIBUTING.md). Questions go to the Video Controls Plus team through the
[contact page](https://vcpeai.aoneahsan.com/contact).
