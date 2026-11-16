# Packages

Last checked: 2026-11-16 (Node 26.13.1 fleet pass: `.nvmrc` 24 → 26.13.1, `engines.node >=26.13.1`; every package already at latest stable). Earlier 2026-11-10. This site uses Yarn 4 and keeps one `yarn.lock`. Internal record: excluded from the site by `exclude` in `docusaurus.config.ts` since 2026-11-16 (before that it was published at `/docs/PACKAGES`).

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

## Workaround — `NODE_OPTIONS=--no-experimental-webstorage` in `build`

- **Why:** on Node 26, Docusaurus 3.10's SSG renderer loads through the `eval` package, which copies every global; reading
  Node's experimental `localStorage` getter prints an `ExperimentalWarning`. The build must print zero warnings. The flag
  removes that global; the docs never use it at build time.
- **Re-check when:** Docusaurus is upgraded, or Node's web storage leaves experimental status.
- **Remove:** drop the prefix from `build`, run `yarn build`, and confirm no `ExperimentalWarning` line.
