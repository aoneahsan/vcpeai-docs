import fs from 'node:fs/promises';
import path from 'node:path';
import type { Config, Plugin } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const SITE_URL = 'https://vcpeai-docs.aoneahsan.com';
const PRODUCT_URL = 'https://vcpeai.aoneahsan.com';
const REPO_URL = 'https://github.com/aoneahsan/vcpeai-docs';
const TAGLINE =
  'Control your online video player the way you want it, and get special features on each website.';

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
async function waitForBlogRss(file: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const body = await fs.readFile(file, 'utf8').catch(() => '');
    if (body.trimEnd().endsWith('</rss>')) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`vcpeai-discovery: ${file} was not written within ${timeoutMs} ms`);
}

/**
 * Feeds the human `/sitemap` and `/feed` pages from the docs and blog plugins' own data, so neither
 * page keeps a list that can drift, and publishes the changelog RSS at the root `/feed.xml`.
 */
function discoveryPlugin(): Plugin {
  return {
    name: 'vcpeai-discovery',
    async allContentLoaded({ allContent, actions }) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default as LoadedDocs | undefined;
      const blogContent = allContent['docusaurus-plugin-content-blog']?.default as LoadedBlog | undefined;

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

      const updates: DiscoveryUpdate[] = (blogContent?.blogPosts ?? [])
        .filter((post) => !post.metadata.unlisted)
        .map(({ metadata }) => ({
          title: metadata.title,
          description: metadata.description,
          permalink: metadata.permalink,
          tags: metadata.tags.map((t) => t.label),
          date: new Date(metadata.date).toISOString(),
        }))
        .sort((a, b) => b.date.localeCompare(a.date));

      actions.setGlobalData({ docGroups, updates });
    },
    async postBuild({ outDir }) {
      // Root `/feed.xml` is the changelog RSS. Its XSL and CSS travel with it so the relative
      // `rss.xsl` / `rss.css` references still resolve from the site root.
      const source = path.join(outDir, 'changelog');
      await waitForBlogRss(path.join(source, 'rss.xml'));
      for (const file of ['rss.xml', 'rss.xsl', 'rss.css']) {
        const target = file === 'rss.xml' ? 'feed.xml' : file;
        await fs.copyFile(path.join(source, file), path.join(outDir, target));
      }
    },
  };
}

const config: Config = {
  title: 'Video Controls Plus Docs',
  tagline: TAGLINE,
  favicon: 'img/logo.svg',

  url: SITE_URL,
  baseUrl: '/',
  trailingSlash: false,

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

  // Plugin data for /sitemap and /feed, plus the root /feed.xml.
  plugins: [discoveryPlugin],

  themes: [
    [
      // Bundled local search: no external service, no key.
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/changelog',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Video Controls Plus changelog',
        href: `${SITE_URL}/feed.xml`,
      },
    },
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
          // `exclude` replaces the defaults, so they are restated before the two project entries.
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'MANUAL-TASKS.md',
            'story/**',
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
          ignorePatterns: ['/changelog/tags/**', '/changelog/archive', '/search'],
          filename: 'sitemap.xml',
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
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/changelog', label: 'Changelog', position: 'left' },
        {
          href: PRODUCT_URL,
          label: 'Product website',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Install', to: '/docs/getting-started/install' },
            { label: 'Keyboard shortcuts', to: '/docs/keyboard-shortcuts/defaults' },
            { label: 'Troubleshooting', to: '/docs/troubleshooting' },
            { label: 'FAQ', to: '/docs/faq' },
            { label: 'Changelog', to: '/changelog' },
          ],
        },
        {
          title: 'Site',
          items: [
            { label: 'Sitemap', to: '/sitemap' },
            { label: 'Feed', to: '/feed' },
          ],
        },
        {
          title: 'Video Controls Plus',
          items: [
            { label: 'Product website', href: PRODUCT_URL },
            { label: 'Privacy policy', href: `${PRODUCT_URL}/privacy` },
            { label: 'Contact', href: `${PRODUCT_URL}/contact` },
          ],
        },
      ],
      copyright: `Written and maintained by the Video Controls Plus team. © ${new Date().getFullYear()} Video Controls Plus team`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
