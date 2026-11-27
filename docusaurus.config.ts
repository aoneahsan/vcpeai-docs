import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Config, LoadContext, Plugin, PluginConfig } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Options as BlogPluginOptions } from '@docusaurus/plugin-content-blog';
import { themes as prismThemes } from 'prism-react-renderer';
import { BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE } from './src/data/blog';
import { CURRENT_SURFACE, PLATFORMS } from './src/data/platforms';
import { seoRedirects } from './plugins/seo-redirects';
import { siteJsonLd } from './plugins/site-json-ld';

const SITE_URL = 'https://vcpeai-docs.aoneahsan.com';
const PRODUCT_URL = 'https://vcpeai.aoneahsan.com';
const REPO_URL = 'https://github.com/aoneahsan/vcpeai-docs';
const TAGLINE =
  'Control your online video player the way you want it, and get special features on each website.';
const TRANSLATION_LOCALES = ['en', 'zh-Hans', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'ru', 'ja', 'ur'];
// Keep unfinished translations out of the public build. Preview them locally with
// VCPEAI_TRANSLATION_PREVIEW_LOCALE=es, then promote reviewed locales here one at a time.
const PUBLISHED_LOCALES = ['en'];
const previewLocale = process.env.VCPEAI_TRANSLATION_PREVIEW_LOCALE;
const BUILD_LOCALES = previewLocale && TRANSLATION_LOCALES.includes(previewLocale) && previewLocale !== 'en'
  ? ['en', previewLocale]
  : PUBLISHED_LOCALES;

// The posts blog (posts/, served at /blog) loads only once posts/ holds a post, so the site never ships an empty
// blog page, feed or Blog link. The changelog stays the default blog instance, in blog/ at /changelog.
const POSTS_DIR = path.join(__dirname, 'posts');
const HAS_POSTS = existsSync(POSTS_DIR) && readdirSync(POSTS_DIR).some((name) => name.endsWith('.md') || name.endsWith('.mdx'));

const POSTS_BLOG: PluginConfig = [
  '@docusaurus/plugin-content-blog',
  {
    id: 'posts',
    path: 'posts',
    routeBasePath: BLOG_PATH.slice(1),
    blogTitle: BLOG_TITLE,
    blogDescription: BLOG_DESCRIPTION,
    blogSidebarTitle: 'Recent posts',
    blogSidebarCount: 10,
    postsPerPage: 10,
    showReadingTime: false,
    // A post's git date is shown under it and becomes its sitemap lastmod.
    showLastUpdateTime: true,
    showLastUpdateAuthor: false,
    // Every author is defined once, in posts/authors.yml; a tag needs a posts/tags.yml first.
    onInlineAuthors: 'throw',
    onInlineTags: 'throw',
    onUntruncatedBlogPosts: 'throw',
    feedOptions: {
      type: ['rss', 'atom'],
      xslt: true,
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      copyright: `© ${new Date().getFullYear()} Video Controls Plus team`,
      language: 'en',
    },
  } satisfies BlogPluginOptions,
];

/** Shape published to `/sitemap` and `/feed` through `usePluginData('vcpeai-discovery')`. */
type DiscoveryEntry = { title: string; description: string; permalink: string; tags: string[] };
type DiscoveryGroup = { label: string; permalink?: string; entries: DiscoveryEntry[] };
type DiscoveryUpdate = DiscoveryEntry & { date: string };

/** The fields read from the docs and blog plugins' loaded content. */
type LoadedDoc = Omit<DiscoveryEntry, 'tags'> & { id: string; unlisted?: boolean; tags: { label: string }[] };
type SidebarItem = {
  type: string;
  id?: string;
  label?: string;
  items?: SidebarItem[];
  link?: { type: string; id?: string; permalink?: string };
};
type LoadedDocs = {
  loadedVersions: { docs: LoadedDoc[]; sidebars: Record<string, SidebarItem[]> }[];
};
type LoadedBlog = {
  blogPosts: {
    metadata: {
      title: string;
      description: string;
      permalink: string;
      date: Date | string;
      unlisted?: boolean;
      tags: { label: string }[];
    };
  }[];
};

/**
 * Resolves once the blog plugin has finished writing its RSS file.
 *
 * Why: Docusaurus core runs every plugin's `postBuild` concurrently (`Promise.all` in
 * `executePluginsPostBuild`, core 3.10.2), and the blog writes `rss.xml` in its own `postBuild`
 * with a non-atomic `outputFile`, last after its XSL files. There is no supported hook ordering and
 * no option to emit the feed at the site root. Re-check on every Docusaurus upgrade; remove this
 * wait (and copy directly) once core orders `postBuild` or the blog can write a root feed path.
 * Fails the build rather than shipping without `/feed.xml`.
 */
/** A source file's last commit date (`YYYY-MM-DD`); the docs are built from a full clone. */
function gitDate(file: string): string {
  const state = execFileSync('git', ['status', '--porcelain', '--', file], { encoding: 'utf8' }).trim();
  if (state) return statSync(file).mtime.toISOString().slice(0, 10);
  const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim();
  if (!iso) throw new Error(`sitemap lastmod: ${file} has no commit yet; commit it before building`);
  return iso.slice(0, 10);
}

type SitemapOptions = Exclude<Preset.Options['sitemap'], false | undefined>;

/**
 * A truthful `<lastmod>` on every sitemap URL (SA-VCPEAI-007). Docs and posts keep their own git dates. The pages
 * built from code take the date their words last changed: the home its source file, `/changelog` the newest
 * changelog entry, `/blog` the newest post, `/feed` the newest of both, `/sitemap` the newest page. An undated URL
 * fails the build.
 */
const createSitemapItems: SitemapOptions['createSitemapItems'] = async ({ defaultCreateSitemapItems, ...rest }) => {
  const items = await defaultCreateSitemapItems(rest);
  const pathOf = (url: string) => new URL(url).pathname.replace(/\/$/, '') || '/';
  const newest = (keep: (p: string) => boolean) =>
    items.filter((item) => item.lastmod && keep(pathOf(item.url))).map((item) => String(item.lastmod)).sort().at(-1);
  const newestEntry = newest((p) => p.startsWith('/changelog/'));
  const newestPost = newest((p) => p.startsWith(`${BLOG_PATH}/`));
  const fill: Record<string, string | undefined> = {
    '/': gitDate('src/pages/index.tsx'),
    '/changelog': newestEntry,
    [BLOG_PATH]: newestPost,
    '/feed': [newestEntry, newestPost].filter(Boolean).sort().at(-1),
    '/sitemap': newest(() => true),
    '/apps': gitDate('src/pages/apps.tsx'),
    '/about-developer': gitDate('src/pages/about-developer.mdx'),
    '/ecosystem': gitDate('src/pages/ecosystem/index.tsx'),
  };
  return items.map((item) => {
    if (item.lastmod) return item;
    const route = pathOf(item.url);
    const productFile = `src/pages${route}.tsx`;
    const lastmod = fill[route] ?? (route.startsWith('/ecosystem/') && existsSync(productFile) ? gitDate(productFile) : undefined);
    if (!lastmod) throw new Error(`sitemap lastmod: ${item.url} has no date`);
    return { ...item, lastmod };
  });
};

async function waitForBlogRss(file: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const body = await fs.readFile(file, 'utf8').catch(() => '');
    if (body.trimEnd().endsWith('</rss>')) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`vcpeai-discovery: ${file} was not written within ${timeoutMs} ms`);
}

/** A blog instance's listed entries, newest first, in the shape `/sitemap` and `/feed` read. */
function listedEntries(content: LoadedBlog | undefined): DiscoveryUpdate[] {
  return (content?.blogPosts ?? [])
    .filter((post) => !post.metadata.unlisted)
    .map(({ metadata }) => ({
      title: metadata.title,
      description: metadata.description,
      permalink: metadata.permalink,
      tags: metadata.tags.map((t) => t.label),
      date: new Date(metadata.date).toISOString(),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Feeds the human `/sitemap` and `/feed` pages from the docs and blog plugins' own data, so neither
 * page keeps a list that can drift, and publishes the changelog RSS at the root `/feed.xml`. The posts
 * blog keeps its own `/blog/rss.xml` and `/blog/atom.xml`.
 */
/**
 * Docusaurus ships this config and every route module path to the browser, so a require.resolve() plugin or any
 * other absolute path would publish this machine's folders in main.js. Fails the build when one appears.
 */
function assertNoLocalPaths(outDir: string, siteDir: string): void {
  const jsDir = path.join(outDir, 'assets', 'js');
  const forms = [siteDir.split(path.sep).join('/'), siteDir.split(path.sep).join('\\\\')];
  for (const file of readdirSync(jsDir).filter((name) => name.endsWith('.js'))) {
    const text = readFileSync(path.join(jsDir, file), 'utf8');
    const found = forms.find((form) => text.includes(form));
    if (found) throw new Error(`${file} carries the local path ${found}: name plugins by package, never require.resolve()`);
  }
}

function discoveryPlugin({ siteDir }: LoadContext): Plugin {
  let hasListedBlogPosts = false;
  return {
    name: 'vcpeai-discovery',
    async allContentLoaded({ allContent, actions }) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default as LoadedDocs | undefined;
      const blogContent = allContent['docusaurus-plugin-content-blog']?.default as LoadedBlog | undefined;
      const postsContent = allContent['docusaurus-plugin-content-blog']?.posts as LoadedBlog | undefined;

      const version = docsContent?.loadedVersions[0];
      const docs = new Map((version?.docs ?? []).filter((d) => !d.unlisted).map((d) => [d.id, d]));
      const toEntry = (doc: LoadedDoc): DiscoveryEntry => ({
        title: doc.title,
        description: doc.description,
        permalink: doc.permalink,
        tags: doc.tags.map((t) => t.label),
      });
      const placed = new Set<string>();
      const take = (items: SidebarItem[] = []): DiscoveryEntry[] =>
        items.flatMap((item) => {
          const doc = item.type === 'doc' && item.id ? docs.get(item.id) : undefined;
          if (!doc) return item.type === 'category' ? take(item.items) : [];
          placed.add(doc.id);
          return [toEntry(doc)];
        });

      const general: DiscoveryEntry[] = [];
      const groups: DiscoveryGroup[] = [];
      for (const item of Object.values(version?.sidebars ?? {}).flat()) {
        if (item.type === 'category') {
          groups.push({ label: item.label ?? '', permalink: item.link?.permalink, entries: take(item.items) });
        } else {
          general.push(...take([item]));
        }
      }
      const unplaced = [...docs.values()].filter((d) => !placed.has(d.id)).map(toEntry);
      const docGroups: DiscoveryGroup[] = [
        { label: 'Overview', entries: [...general, ...unplaced] },
        ...groups,
      ].filter((g) => g.entries.length > 0);

      const updates = listedEntries(blogContent);
      const posts = listedEntries(postsContent);
      hasListedBlogPosts = updates.length > 0;

      actions.setGlobalData({ docGroups, updates, posts });
    },
    async postBuild({ outDir }) {
      assertNoLocalPaths(outDir, siteDir);
      // An unlisted translation preview has no public blog entries and Docusaurus
      // consequently emits no RSS file. There is nothing to copy in that case.
      if (!hasListedBlogPosts) return;
      // Root `/feed.xml` is the changelog RSS. Its XSL and CSS travel with it so the relative
      // `rss.xsl` / `rss.css` references still resolve from the site root.
      const source = path.join(outDir, 'changelog');
      await waitForBlogRss(path.join(source, 'rss.xml'));
      for (const file of ['rss.xsl', 'rss.css']) await fs.copyFile(path.join(source, file), path.join(outDir, file));
      // The copy names itself as its own address, so `/feed.xml` is not a duplicate pointing at nobody (issue #1
      // box 7: "Duplicate without user-selected canonical"). The changelog's own rss.xml keeps its address.
      const rss = await fs.readFile(path.join(source, 'rss.xml'), 'utf8');
      if (!rss.includes('<rss version="2.0"') || !rss.includes('<channel>')) {
        throw new Error('vcpeai-discovery: changelog/rss.xml is not the RSS 2.0 shape this copy expects');
      }
      const feed = rss
        .replace('<rss version="2.0"', '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"')
        .replace('<channel>', `<channel>\n        <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>`);
      await fs.writeFile(path.join(outDir, 'feed.xml'), feed);
    },
  };
}

const config: Config = {
  title: 'Video Controls Plus Docs',
  tagline: TAGLINE,
  favicon: 'img/logo.svg',

  url: SITE_URL,
  baseUrl: '/',
  // GitHub Pages serves `<route>/index.html` for both `/x` (301 to `/x/`) and `/x/`; `false` made every slashed
  // address a 404 (aoneahsan/vcpeai-docs#1, SA-P26). `yarn seo:contract` fails the build if this flips back.
  trailingSlash: true,

  organizationName: 'aoneahsan',
  projectName: 'vcpeai-docs',

  future: {
    v4: true,
    faster: true,
  },

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // Plugin data for /sitemap and /feed, plus the root /feed.xml; the posts blog once it has a post.
  // The redirects keep every address search engines still ask for answering (tag pages, SA-P31/P32).
  plugins: [
    discoveryPlugin,
    ...(HAS_POSTS ? [POSTS_BLOG] : []),
    ['@docusaurus/plugin-client-redirects', { redirects: seoRedirects() }],
  ],

  themes: [
    [
      // Bundled local search: no external service, no key. Named by package, never require.resolve(): the
      // config ships to the browser, and a resolved path would publish this machine's folders.
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        // The posts blog joins the index once it is loaded (HAS_POSTS).
        blogDir: HAS_POSTS ? ['blog', 'posts'] : 'blog',
        blogRouteBasePath: HAS_POSTS ? ['/changelog', BLOG_PATH] : '/changelog',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: BUILD_LOCALES,
    localeConfigs: {
      ar: { direction: 'rtl' },
      ur: { direction: 'rtl' },
    },
  },

  headTags: [
    { tagName: 'meta', attributes: { name: 'yandex-verification', content: 'bfb02722189028cf' } },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Video Controls Plus changelog',
        href: `${SITE_URL}/feed.xml`,
      },
    },
    // WebSite, the Zaions organization, the developer and the product, in every page's initial HTML (SA-P30).
    { tagName: 'script', attributes: { type: 'application/ld+json' }, innerHTML: JSON.stringify(siteJsonLd(SITE_URL, PRODUCT_URL)) },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: `${REPO_URL}/tree/main/`,
          // Feeds `<lastmod>` in sitemap.xml from each page's last commit.
          showLastUpdateTime: true,
          // Generated tag pages were fleet boilerplate (SA-P32): a tag in front matter now fails the build.
          onInlineTags: 'throw',
          // `exclude` replaces the defaults, so they are restated before the project entries
          // (the internal fixed-path files MANUAL-TASKS.md and PACKAGES.md, and the story records).
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'MANUAL-TASKS.md',
            'PACKAGES.md',
            'story/**',
            // The search-console fix record is for the people running the audit, never a public page.
            'search-consoles/**',
          ],
        },
        blog: {
          routeBasePath: 'changelog',
          blogTitle: 'Video Controls Plus changelog',
          blogDescription: 'Release notes for Video Controls Plus.',
          blogSidebarTitle: 'Recent entries',
          showReadingTime: false,
          showLastUpdateTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'Video Controls Plus changelog',
            description: 'Release notes for Video Controls Plus.',
            copyright: `© ${new Date().getFullYear()} Video Controls Plus team`,
            xslt: true,
          },
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'ignore',
        },
        sitemap: {
          lastmod: 'date',
          // Docs carry no tags (their old tag addresses redirect, plugins/seo-redirects.ts). Archive and search are
          // utility pages, kept out of the sitemap.
          ignorePatterns: [
            '/changelog/tags/**',
            '/changelog/archive/',
            `${BLOG_PATH}/tags/`,
            `${BLOG_PATH}/tags/**`,
            `${BLOG_PATH}/authors/`,
            `${BLOG_PATH}/authors/**`,
            `${BLOG_PATH}/archive/`,
            `${BLOG_PATH}/page/**`,
            '/search/',
            '/docs/tags/',
            '/docs/tags/**',
          ],
          filename: 'sitemap.xml',
          createSitemapItems,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Video Controls Plus',
      logo: {
        alt: 'Video Controls Plus logo',
        src: 'img/logo.svg',
      },
      items: [
        { type: 'localeDropdown', position: 'right' },
        { href: `${PRODUCT_URL}/features`, label: 'Features', position: 'left', className: 'vcp-nav-xxwide' },
        { href: `${PRODUCT_URL}/how-it-works`, label: 'How it works', position: 'left', className: 'vcp-nav-xwide' },
        { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs' },
        ...(HAS_POSTS ? [{ to: BLOG_PATH, label: 'Blog', position: 'left' as const, className: 'vcp-nav-blog' }] : []),
        { href: `${PRODUCT_URL}/compare/extensions`, label: 'Compare', position: 'left', className: 'vcp-nav-xwide' },
        { href: `${PRODUCT_URL}/plans`, label: 'Plans', position: 'left', className: 'vcp-nav-wide' },
        { href: `${PRODUCT_URL}/about`, label: 'About', position: 'left', className: 'vcp-nav-wide' },
        { to: '/ecosystem', label: 'More from Zaions', position: 'left', className: 'vcp-nav-xwide' },
        { href: `${PRODUCT_URL}/contact`, label: 'Contact', position: 'left', className: 'vcp-nav-wide' },
        {
          type: 'dropdown',
          label: 'Get Video Controls Plus',
          position: 'left',
          className: 'vcp-nav-install',
          items: [
            { label: 'Install guide', href: `${PRODUCT_URL}/install` },
            ...PLATFORMS.filter((platform) => platform.id !== CURRENT_SURFACE).map((platform) => ({ label: platform.name, href: platform.href })),
            { label: 'All apps', to: '/apps' },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Video Controls Plus',
          items: [
            { label: TAGLINE, href: PRODUCT_URL },
          ],
        },
        {
          title: 'Get Video Controls Plus',
          items: [
            ...PLATFORMS.filter((platform) => platform.id !== CURRENT_SURFACE).map((platform) => ({ label: platform.name, href: platform.href })),
            { label: 'All apps', to: '/apps' },
          ],
        },
        {
          title: 'Explore',
          items: [
            { label: 'Features', href: `${PRODUCT_URL}/features` },
            { label: 'How it works', href: `${PRODUCT_URL}/how-it-works` },
            { label: 'Compare', href: `${PRODUCT_URL}/compare/extensions` },
            { label: 'Plans', href: `${PRODUCT_URL}/plans` },
            { label: 'About', href: `${PRODUCT_URL}/about` },
            { label: 'More from Zaions', to: '/ecosystem' },
            { label: 'About the developer', to: '/about-developer' },
          ],
        },
        {
          title: 'Get started',
          items: [
            { label: 'Install', href: `${PRODUCT_URL}/install` },
            { label: 'Website guides', href: `${PRODUCT_URL}/docs` },
            { label: 'Full documentation', to: '/docs/intro' },
            { label: 'Developers', to: '/docs/developers' },
            { label: 'Page index', to: '/sitemap' },
          ],
        },
        {
          title: 'Help & legal',
          items: [
            { label: 'FAQ', to: '/docs/faq' },
            { label: 'Contact', href: `${PRODUCT_URL}/contact` },
            { label: 'Policy pages', href: `${PRODUCT_URL}/privacy` },
            { label: 'Sitemap', to: '/sitemap' },
            { label: 'Changelog', to: '/changelog' },
            ...(HAS_POSTS ? [{ label: 'Blog', to: BLOG_PATH }] : []),
            { label: 'Feed', to: '/feed' },
          ],
        },
      ],
      copyright: `Developed with love by the Zaions team. © ${new Date().getFullYear()} Video Controls Plus team`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
