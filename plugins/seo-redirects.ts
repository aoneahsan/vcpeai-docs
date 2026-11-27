/**
 * Redirects for addresses search engines still ask for, in one list the build-output contract re-checks after
 * the build (`plugins/seo-contract.ts`, SA-P31).
 *
 * The docs used to carry front-matter tags, and Docusaurus generated a `/docs/tags/<tag>` list for each one:
 * eight of them sat in Search Console as "crawled, not indexed" (aoneahsan/vcpeai-docs#1, SA-P32). Tags are gone
 * from every page (`onInlineTags: 'throw'` keeps them out), and each old tag address now leads to the page that
 * covers its subject.
 */

/** One redirect, in the shape `@docusaurus/plugin-client-redirects` takes. */
export interface Redirect {
  readonly to: string;
  readonly from: string[];
}

const tag = (name: string): string => `/docs/tags/${name}`;

/** Every old tag address, grouped by the page that now answers it. Targets use the slashed form. */
export const TAG_REDIRECTS: readonly Redirect[] = [
  { to: '/sitemap/', from: ['/docs/tags'] },
  { to: '/docs/white-label/', from: [tag('white-label'), tag('licensing')] },
  { to: '/docs/white-label/what-you-get/', from: [tag('buyout')] },
  { to: '/docs/white-label/verify/', from: [tag('verify'), tag('license')] },
  { to: '/docs/white-label/faq/', from: [tag('faq')] },
  { to: '/docs/white-label/setup/', from: [tag('setup')] },
  { to: '/docs/white-label/updates/', from: [tag('updates'), tag('renewal')] },
  { to: '/docs/developers/', from: [tag('developers')] },
  { to: '/docs/developers/api/', from: [tag('api'), tag('rest'), tag('openapi')] },
  { to: '/docs/developers/access-keys/', from: [tag('access-keys')] },
  { to: '/docs/developers/assistants/', from: [tag('mcp'), tag('assistants'), tag('claude'), tag('chatgpt')] },
  { to: '/docs/developers/changelog/', from: [tag('changelog')] },
  { to: '/docs/developers/two-step-sign-in/', from: [tag('security'), tag('two-step-sign-in'), tag('account')] },
  { to: '/docs/developers/webhooks/', from: [tag('webhooks'), tag('standard-webhooks')] },
];

/**
 * Every redirect the site must serve, for `docusaurus.config.ts` and the contract alike.
 *
 * @returns the redirects with their `to` and `from` paths
 */
export function seoRedirects(): Redirect[] {
  return TAG_REDIRECTS.map(({ to, from }) => ({ to, from: [...from] }));
}
