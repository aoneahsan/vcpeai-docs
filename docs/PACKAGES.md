# Packages

Last checked: 2026-11-10. This site uses Yarn 4 and keeps one `yarn.lock`.

| Group | Packages | Purpose |
|---|---|---|
| Site | `@docusaurus/core`, `@docusaurus/faster`, `@docusaurus/preset-classic`, `@docusaurus/theme-common`, `@docusaurus/plugin-content-docs` 3.10.2 | Static docs and search pages |
| Search and content | `@easyops-cn/docusaurus-search-local` 0.55.3, `@mdx-js/react` 3.1.1, `prism-react-renderer`, `clsx` | Local search, MDX, code blocks and class names |
| UI | `react`, `react-dom` 19.3.1 | Page rendering |
| Build and types | TypeScript 7.0.2, Docusaurus aliases and React types | Source checks and static build |

TypeScript 7 uses this site's own `tsconfig.json`. The removed `baseUrl` setting from `@docusaurus/tsconfig` is no longer inherited. The build and typecheck both pass. Direct Docusaurus peers are declared for the search plugin.
