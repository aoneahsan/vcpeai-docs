# Search-console fix log — vcpeai-docs (vcpeai-docs.aoneahsan.com)

Newest entry first, one section per filed issue. This folder is excluded from the published site
(`docusaurus.config.ts` docs `exclude: 'search-consoles/**'`), and the build contract fails if it is ever published.
`live-verified` is ours; `indexed` belongs to Google. The website half is in `aoneahsan/video-controls-plus-extension`
→ `docs/search-consoles/fix-log.md`.

## vcpeai-docs#1 — [SEO][URGENT][PENDING] URL-level indexing + AEO fix list (audit 2026-11-27) · 2026-11-27 · commit `<pending>`

Status: **built and contract-verified locally; deploy and live retest pending** (GitHub Pages publish is the main
session's). Google outcome: google-pending. Also answers video-controls-plus-extension#3 body 5 and its AEO comment.

| Box | SA | What was wrong (evidence) | Root fix (file:line) | Contract test | Live proof (after deploy) |
|---|---|---|---|---|---|
| 1 · trailing-slash 404 | SA-P26 | `curl /docs/white-label/` → 404, `/docs/white-label` → 200 (probed 2026-11-27); `trailingSlash: false` wrote `page.html` | `docusaurus.config.ts:264` `trailingSlash: true`; sitemap ignore patterns in the slashed form `:391`; `static/llms.txt` links slashed; the website's links into these docs slashed (website fix-log) | `plugins/seo-contract.ts:87` (`checkBuild`: config is `true`, every page is `<route>/index.html`, canonicals and sitemap slashed) | R1 |
| 2 · home not indexed | SA-P32, P20 | the landing page's description was the shared tagline and the page held only section cards | `src/pages/index.tsx:10` (own description in this product's numbers), `:15` (four facts with their pages: 0.1x–16x, Ctrl + Alt keys, 62 · 52 · 48 extras, what needs an account), `:59` (credit naming Zaions and Ahsan Mahmood, do-follow, plus a link to the website's guides); the website guides and docs platform pages now link both ways | `seo-contract.ts:46` (one title, description, `<h1>`, self-canonical) | R2 |
| 3 · 3 compare pages | SA-P32 | pages had dated prices and sources but no "who should pick which" | each of the 17 `docs/compare/<rival>.md` pages gains "## Which one fits you" from the hub's verified `strongerThere` / `strongerHere` (checked 2026-11-07), `last_update` 2026-11-27 | `seo-contract.ts:46` | R3 |
| 4 · 7 white-label pages | SA-P32 | the pages read like the fleet template | `docs/white-label/what-you-get.md:22` ("What the Video Controls Plus build is made of": WXT MV3/MV2 build, the 62/52/48 registries, the connect-by-code sign-in, the companion website, the backend), `docs/white-label/faq.md:33`, `:37` (product-specific questions); dates 2026-11-27 | `seo-contract.ts:46` (no `noindex`) | R3 |
| 5 · 8 tag pages | SA-P32, P31 | `/docs/tags/*` lists generated from front-matter tags, noindexed by two theme wrappers | tags removed from all 13 pages; `onInlineTags: 'throw'` `docusaurus.config.ts:345`; the noindex wrappers `src/theme/DocTagsListPage`, `src/theme/DocTagDocListPage` deleted; every old tag URL redirects to the page that covers it: `plugins/seo-redirects.ts` (`@docusaurus/plugin-client-redirects`, `docusaurus.config.ts:289`) | `seo-contract.ts:87` (no tag page in the output or sitemap, every redirect written and its target exists) | R4 |
| 6 · feeds / llms.txt / .md mirrors | SA-P33 | the docs publish no `.md` mirror (`/docs/intro.md` → 404); the four URLs are feeds, `llms.txt` and the sitemap | none needed: feeds and `llms.txt` "crawled, not indexed" is expected; GitHub Pages cannot send headers | — | R5 |
| 7 · `/feed.xml` duplicate without canonical | SA-P33 | `/feed.xml` was a byte copy of `/changelog/rss.xml` with no self reference | `docusaurus.config.ts:248` writes `/feed.xml` with `<atom:link href=".../feed.xml" rel="self">` | `seo-contract.ts:87` (feed self link) | R5 |
| 8 · 19 other pages | SA-P32 | — | every page is in the sidebar and `/sitemap`; the platform pages now link the website's per-feature guides (`docs/platforms/youtube.md`, `netflix.md`, `linkedin.md`) and the website guides link back; `lastmod` stays the page's git or `last_update` date | `seo-contract.ts:87` (sitemap URLs exist) | R2 |
| 9 · AEO: no JSON-LD | SA-P30 | no `application/ld+json` in the raw HTML | `plugins/site-json-ld.ts` (WebSite, Zaions Organization, Ahsan Mahmood Person with `sameAs`, SoftwareApplication with Free/Pro offers), emitted on every page by `docusaurus.config.ts:331`; `static/llms.txt:68` "Who builds this" | `seo-contract.ts:46` (all four types in every page's initial HTML, every block parses) | R6 |

Overruled by owner law (2026-11-27):
- Box 4 "add `noindex,follow` to white-label pages and drop them from sitemap.xml" → they stay indexable and in the
  sitemap, made specific to this product (link law).
- Box 5 "add `noindex,follow` to tag pages" → tag pages are switched off and their addresses redirect.
- Box 6 "send `X-Robots-Tag: noindex`" → nothing to send: no `.md` mirror exists, and GitHub Pages has no headers.
- Box 1 option (a), a script in `404.html` → never; `trailingSlash: true` gives real 301s.

### Pending

| Box | Why not done | Who | Next action |
|---|---|---|---|
| Deploy | publishing is the main session's | main session | `yarn build` (ends with the contract), then publish `build/` to `gh-pages` by fast-forward push (never `docusaurus deploy`) |
| Box 3 data age | competitor facts were checked 2026-11-07; the refresh is due | comparison-hub run | refresh `docs/comparison-hub/competitors.json` in the product repo, then the "Which one fits you" sentences here |
| Box 2 inbound link from aoneahsan.com | the portfolio project page is another repo | owner / portfolio session | link `https://vcpeai-docs.aoneahsan.com/` from the Video Controls Plus project page with descriptive text |

### Retest

```bash
D=https://vcpeai-docs.aoneahsan.com
# R1: both forms of sitemap URLs answer 200 or 301 → 200
for u in $(curl -s $D/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' | head -20); do printf '%s %s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' "$u")" "$(curl -s -o /dev/null -w '%{http_code}' "${u%/}")"; sleep 0.3; done
curl -s -o /dev/null -w '%{http_code}\n' $D/docs/white-label/    # 200
# R2: home has its own description and one canonical
curl -s $D/ | grep -o '<meta[^>]*name=description[^>]*>' ; curl -s $D/ | grep -c 'rel=canonical'
# R3: compare and white-label pages are indexable and carry their new sections
curl -s $D/docs/compare/video-player-extension/ | grep -c 'Which one fits you'; curl -s $D/docs/white-label/what-you-get/ | grep -c 'build is made of'; curl -s $D/docs/white-label/ | grep -c noindex   # 1, 1, 0
# R4: old tag URLs redirect (meta refresh on GitHub Pages) and are out of the sitemap
for t in buyout faq license licensing renewal updates verify white-label; do curl -s $D/docs/tags/$t/ | grep -o 'url=[^"]*' ; done; curl -s $D/sitemap.xml | grep -c '/docs/tags'   # 0
# R5: feed.xml names itself
curl -s $D/feed.xml | grep -o '<atom:link[^>]*>'
# R6: JSON-LD in the initial HTML
curl -s $D/ | grep -o '"@type":"\(WebSite\|Organization\|Person\|SoftwareApplication\)"' | sort -u
```
