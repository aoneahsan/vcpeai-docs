/**
 * The build-output SEO contract (aoneahsan/vcpeai-docs#1: SA-P24, P26, P29, P30, P31, P32). `yarn build` runs it
 * last (`yarn seo:contract`) on the files GitHub Pages will serve. It is a separate step, not a `postBuild` hook,
 * because Docusaurus runs plugin `postBuild` hooks concurrently and the redirect pages may not exist yet inside one.
 *
 * - `trailingSlash: true` and `onBrokenLinks: 'throw'` in the config; every page is `<route>/index.html`, so GitHub
 *   Pages 301s `/x` to `/x/` and never 404s the slashed form (SA-P26).
 * - Every page: one `<title>`, one description, one self-canonical in the slashed form, one `<h1>`, no `noindex`
 *   (only the 404 page and `/search/` may carry one), every JSON-LD block parses, and the site graph (WebSite,
 *   Organization, Person, SoftwareApplication) is in the initial HTML (SA-P24, P29, P30).
 * - Every `sitemap.xml` URL is slashed, exists in the output and is not a tag page (SA-P32).
 * - Every redirect in `plugins/seo-redirects.ts` exists and lands on a page that exists (SA-P31).
 * - `/feed.xml` names itself as its own address (issue #1 box 7), and no fix record from `docs/search-consoles/`
 *   was published.
 * - Rendered links follow our product/store/package pages and mark third-party destinations nofollow (SA-P23).
 *
 * Run: `node plugins/seo-contract.ts` (or `node plugins/seo-contract.ts <build dir>` to check another output).
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type Redirect, seoRedirects } from './seo-redirects.ts';

/** Pages allowed to differ: the real 404 and the search results page (a utility page kept out of the sitemap). */
const PAGE_EXCEPTIONS = new Set(['404.html', 'search/index.html']);
const REQUIRED_TYPES = ['WebSite', 'Organization', 'Person', 'SoftwareApplication'];
const LOCALES = ['en', 'zh-Hans', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'ru', 'ja', 'ur'] as const;
const exceptionFile = (file: string): string => file.replace(/^[^/]+\/(404\.html|search\/index\.html)$/, '$1');
const ecosystem = JSON.parse(readFileSync(new URL('../src/data/ecosystem.json', import.meta.url), 'utf8')) as {
  products: Array<{ liveUrl?: string; docsUrl?: string }>;
};
const platformSource = readFileSync(new URL('../src/data/platforms.ts', import.meta.url), 'utf8');
const platformLinks = [...platformSource.matchAll(/\bhref: '(https:\/\/[^']+)'/g)].map((match) => match[1]);
if (platformLinks.length !== 5) throw new Error(`Expected five canonical platform links, found ${platformLinks.length}`);
const ownLinks = [
  ...platformLinks,
  ...ecosystem.products.flatMap((product) => [product.liveUrl, product.docsUrl]),
].filter((url): url is string => Boolean(url));

/** Audit the rendered anchor, including links written in Markdown or supplied by the theme. */
function linkProblems(html: string, file: string): string[] {
  const problems: string[] = [];
  const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const [anchor = ''] of rendered.matchAll(/<a\b[^>]*>/g)) {
    const href = /\bhref=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/.exec(anchor);
    const value = href?.[1] ?? href?.[2] ?? href?.[3] ?? '';
    if (!/^https?:\/\//i.test(value)) continue;
    let url: URL;
    try { url = new URL(value.replace(/&amp;/g, '&')); }
    catch { problems.push(`${file}: invalid absolute link: ${value}`); continue; }
    const host = url.hostname.toLowerCase();
    const rel = /\brel=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/.exec(anchor);
    const tokens = new Set((rel?.[1] ?? rel?.[2] ?? rel?.[3] ?? '').toLowerCase().split(/\s+/));
    const own = host === 'aoneahsan.com' || host.endsWith('.aoneahsan.com') ||
      host === 'zaions.com' || host.endsWith('.zaions.com') ||
      (host === 'github.com' && url.pathname.startsWith('/aoneahsan/')) ||
      (host === 'linkedin.com' && url.pathname.startsWith('/in/aoneahsan')) ||
      ownLinks.some((link) => {
        const target = new URL(link);
        const targetPath = target.pathname.replace(/\/$/, '');
        const pathName = url.pathname.replace(/\/$/, '');
        return url.origin === target.origin && (pathName === targetPath || pathName.startsWith(`${targetPath}/`));
      });
    if (own && tokens.has('nofollow')) problems.push(`${file}: our link is nofollow: ${value}`);
    if (!own && !tokens.has('nofollow')) problems.push(`${file}: third-party link is followed: ${value}`);
  }
  return problems;
}

function htmlFiles(dir: string, base = dir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full, base);
    return entry.name.endsWith('.html') ? [path.relative(base, full).split(path.sep).join('/')] : [];
  });
}

const count = (html: string, pattern: RegExp): number => html.match(pattern)?.length ?? 0;
const isRedirectPage = (html: string): boolean => /http-equiv=["']?refresh/i.test(html);
const xmlEscape = (value: string): string => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Merge Docusaurus's per-locale files into the one root sitemap submitted to search engines. */
export function mergeLocaleSitemaps(outDir: string, siteUrl: string): { locales: string[]; urls: number } {
  const locales = LOCALES.filter((locale) => existsSync(path.join(outDir, locale === 'en' ? '' : locale, 'sitemap.xml')));
  if (!locales.includes('en')) throw new Error('Root English sitemap is missing');
  const pages = new Map<string, Map<string, { url: string; lastmod: string }>>();
  for (const locale of locales) {
    const file = path.join(outDir, locale === 'en' ? '' : locale, 'sitemap.xml');
    for (const [, entry = ''] of readFileSync(file, 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = /<loc>([^<]+)<\/loc>/.exec(entry)?.[1]?.replace(/&amp;/g, '&');
      const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(entry)?.[1];
      if (!loc || !lastmod) throw new Error(`${file}: a sitemap entry lacks loc or lastmod`);
      const url = new URL(loc);
      if (url.origin !== siteUrl) throw new Error(`${file}: foreign URL ${loc}`);
      if (locale === 'en' && LOCALES.some((code) => code !== 'en' && url.pathname.startsWith(`/${code}/`))) continue;
      const prefix = locale === 'en' ? '' : `/${locale}`;
      if (prefix && !url.pathname.startsWith(`${prefix}/`)) throw new Error(`${file}: URL lacks its locale prefix: ${loc}`);
      const route = prefix ? url.pathname.slice(prefix.length) : url.pathname;
      const group = pages.get(route) ?? new Map();
      if (group.has(locale)) throw new Error(`${file}: duplicate locale URL ${loc}`);
      group.set(locale, { url: loc, lastmod });
      pages.set(route, group);
    }
  }
  for (const [route, group] of pages) {
    const missing = locales.filter((locale) => !group.has(locale));
    if (missing.length) throw new Error(`${route}: missing sitemap locale(s): ${missing.join(', ')}`);
  }
  const entries = [...pages.keys()].sort().flatMap((route) => {
    const group = pages.get(route)!;
    const alternates = locales.map((locale) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${xmlEscape(group.get(locale)!.url)}"/>`);
    alternates.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(group.get('en')!.url)}"/>`);
    return locales.map((locale) => {
      const page = group.get(locale)!;
      return `<url><loc>${xmlEscape(page.url)}</loc><lastmod>${xmlEscape(page.lastmod)}</lastmod>${alternates.join('')}</url>`;
    });
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`;
  writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
  return { locales: [...locales], urls: entries.length };
}

/**
 * Checks one built page against the contract.
 *
 * @param html - the page's HTML
 * @param file - its path relative to the build folder, e.g. `docs/intro/index.html`
 * @param siteUrl - the site origin, used to check the canonical is the page's own address
 * @returns the problems found, empty when the page passes
 */
export function pageProblems(html: string, file: string, siteUrl: string): string[] {
  if (PAGE_EXCEPTIONS.has(exceptionFile(file)) || isRedirectPage(html)) return [];
  const problems: string[] = [];
  const titles = count(html, /<title[\s>]/g);
  const descriptions = count(html, /<meta[^>]+name=["']?description["']?[\s>/]/g);
  const h1s = count(html, /<h1[\s>]/g);
  const canonicals = [...html.matchAll(/<link[^>]+rel=["']?canonical["']?[^>]*>/g)];
  if (titles !== 1) problems.push(`${titles} <title> tags`);
  if (descriptions !== 1) problems.push(`${descriptions} meta descriptions`);
  if (h1s !== 1) problems.push(`${h1s} <h1> tags`);
  if (canonicals.length !== 1) problems.push(`${canonicals.length} canonicals`);
  const href = /href=["']?([^"'\s>]+)/.exec(canonicals[0]?.[0] ?? '')?.[1] ?? '';
  const own = `${siteUrl}/${file.replace(/index\.html$/, '')}`;
  if (canonicals.length === 1 && href !== own) problems.push(`canonical ${href} is not the page's own slashed address ${own}`);
  if (/<meta[^>]+name=["']?robots["']?[^>]+noindex/i.test(html)) problems.push('noindex on a public page');
  const types = new Set<string>();
  for (const [, json] of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json ?? '') as { '@type'?: string; '@graph'?: { '@type'?: string }[] };
      for (const node of data['@graph'] ?? [data]) if (node['@type']) types.add(node['@type']);
    } catch {
      problems.push('a JSON-LD block does not parse');
    }
  }
  const missing = REQUIRED_TYPES.filter((type) => !types.has(type));
  if (missing.length) problems.push(`JSON-LD is missing ${missing.join(', ')} in the initial HTML`);
  return problems.map((problem) => `${file}: ${problem}`);
}

/** The file GitHub Pages serves for a route under `trailingSlash: true`. */
const servedFile = (outDir: string, route: string): string => path.join(outDir, route.replace(/^\/|\/$/g, ''), 'index.html');

/**
 * Checks the whole build folder.
 *
 * @param params.outDir - the build folder
 * @param params.siteUrl - the site origin, without a trailing slash
 * @param params.redirects - every redirect the site must serve
 * @param params.config - the text of `docusaurus.config.ts`
 * @returns the problems found
 */
export function checkBuild({ outDir, siteUrl, redirects, config }: {
  outDir: string; siteUrl: string; redirects: readonly Redirect[]; config: string;
}): string[] {
  const problems: string[] = [];
  if (!/^\s*trailingSlash: true,/m.test(config)) problems.push('config: trailingSlash must be true, or GitHub Pages 404s the slashed form');
  if (!/^\s*onBrokenLinks: 'throw',/m.test(config)) problems.push("config: onBrokenLinks must be 'throw'");
  for (const file of htmlFiles(outDir)) {
    const html = readFileSync(path.join(outDir, file), 'utf8');
    if (!file.endsWith('index.html') && !PAGE_EXCEPTIONS.has(exceptionFile(file))) {
      problems.push(`${file}: a page outside <route>/index.html is a 404 for its slashed address`);
    }
    if (file.startsWith('docs/tags/') && !isRedirectPage(html)) {
      problems.push(`${file}: a generated tag page is back (SA-P32)`);
    }
    if (file.startsWith('docs/search-consoles/')) problems.push(`${file}: the search-console fix record was published`);
    problems.push(...pageProblems(html, file, siteUrl), ...linkProblems(html, file));
  }
  const sitemap = path.join(outDir, 'sitemap.xml');
  if (!existsSync(sitemap)) problems.push('sitemap.xml is missing');
  else {
    const activeLocales = LOCALES.filter((locale) => existsSync(path.join(outDir, locale === 'en' ? '' : locale, 'sitemap.xml')));
    const submitted = new Set<string>();
    for (const [, entry = ''] of readFileSync(sitemap, 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = /<loc>([^<]+)<\/loc>/.exec(entry)?.[1]?.replace(/&amp;/g, '&') ?? '';
      submitted.add(loc);
      if (!loc.startsWith(`${siteUrl}/`)) {
        problems.push(`sitemap: ${loc} is on another host`);
        continue;
      }
      const route = loc.slice(siteUrl.length);
      if (!loc.endsWith('/')) problems.push(`sitemap: ${loc} is not in the slashed form`);
      if (route.startsWith('/docs/tags')) problems.push(`sitemap: ${loc} is a tag page`);
      if (!existsSync(servedFile(outDir, route))) problems.push(`sitemap: ${loc} has no page in the output`);
      if (!/<lastmod>[^<]+<\/lastmod>/.test(entry)) problems.push(`sitemap: ${loc} has no lastmod`);
      const locale = activeLocales.find((code) => code !== 'en' && route.startsWith(`/${code}/`)) ?? 'en';
      const sourceRoute = locale === 'en' ? route : route.slice(locale.length + 1);
      for (const code of [...activeLocales, 'x-default']) {
        const targetCode = code === 'x-default' ? 'en' : code;
        const expected = `${siteUrl}${targetCode === 'en' ? sourceRoute : `/${targetCode}${sourceRoute}`}`;
        if (!entry.includes(`hreflang="${code}" href="${xmlEscape(expected)}"`)) {
          problems.push(`sitemap: ${loc} lacks ${code} alternate ${expected}`);
        }
      }
    }
    for (const locale of activeLocales) {
      const file = path.join(outDir, locale === 'en' ? '' : locale, 'sitemap.xml');
      for (const [, loc = ''] of readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
        if (!submitted.has(loc.replace(/&amp;/g, '&'))) problems.push(`sitemap: ${loc} is absent from the submitted root file`);
      }
    }
  }
  for (const { to, from } of redirects) {
    if (!to.endsWith('/')) problems.push(`redirect target ${to} is not in the slashed form`);
    if (!existsSync(servedFile(outDir, to))) problems.push(`redirect target ${to} has no page`);
    for (const source of from) {
      const file = servedFile(outDir, source);
      if (!existsSync(file) || !isRedirectPage(readFileSync(file, 'utf8'))) problems.push(`redirect ${source} → ${to} was not written`);
    }
  }
  const feed = path.join(outDir, 'feed.xml');
  if (!existsSync(feed)) problems.push('feed.xml is missing');
  else if (!readFileSync(feed, 'utf8').includes(`<atom:link href="${siteUrl}/feed.xml" rel="self"`)) {
    problems.push('feed.xml does not name /feed.xml as its own address (atom:link rel="self")');
  }
  return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const config = readFileSync(path.join(siteDir, 'docusaurus.config.ts'), 'utf8');
  const siteUrl = /const SITE_URL = '([^']+)'/.exec(config)?.[1] ?? '';
  const writeSitemap = process.argv[2] === '--write-sitemap';
  const outDir = path.resolve(siteDir, writeSitemap ? process.argv[3] ?? 'build' : process.argv[2] ?? 'build');
  if (writeSitemap) {
    const result = mergeLocaleSitemaps(outDir, siteUrl);
    process.stdout.write(`seo-contract: merged ${result.urls} URLs across ${result.locales.join(', ')} into sitemap.xml\n`);
    process.exit(0);
  }
  const problems = checkBuild({ outDir, siteUrl, redirects: seoRedirects(), config });
  if (problems.length > 0) {
    process.stderr.write(`seo-contract: ${problems.length} problem(s)\n${problems.slice(0, 60).join('\n')}\n`);
    process.exit(1);
  }
  process.stdout.write(`seo-contract: ${htmlFiles(outDir).length} HTML files, sitemap, ${seoRedirects().length} redirect groups and feed.xml pass\n`);
}
