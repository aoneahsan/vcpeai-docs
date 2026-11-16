# Packages

Last checked: 2026-11-10. This site uses Yarn 4 and keeps one `yarn.lock`.

| Group | Packages | Purpose |
|---|---|---|
| Site | `@docusaurus/core`, `@docusaurus/faster`, `@docusaurus/preset-classic`, `@docusaurus/theme-common`, `@docusaurus/plugin-content-docs` 3.10.2 | Static docs and search pages |
| Search and content | `@easyops-cn/docusaurus-search-local` 0.55.3, `@mdx-js/react` 3.1.1, `prism-react-renderer`, `clsx` | Local search, MDX, code blocks and class names |
| UI | `react`, `react-dom` 19.3.1 | Page rendering |
| Build and types | TypeScript 7.0.2, Docusaurus aliases and React types | Source checks and static build |

**Build workaround (2026-11-16):** on Node 26, Docusaurus's server-side render copies every global and Node prints
`ExperimentalWarning: localStorage is not available`, which breaks the zero-warning build gate. `yarn build` therefore
runs with `NODE_OPTIONS=--no-experimental-webstorage` (Node 24 and 26 accept it). Re-check on every Docusaurus or Node
major; remove it once a plain `docusaurus build` prints no warning.

TypeScript 7 uses this site's own `tsconfig.json`. The removed `baseUrl` setting from `@docusaurus/tsconfig` is no longer inherited. The build and typecheck both pass. Direct Docusaurus peers are declared for the search plugin.
