/**
 * The structured data every docs page carries in its initial HTML (aoneahsan/vcpeai-docs#1, SA-P30): the docs
 * WebSite, the Zaions organization that publishes it, the developer behind it and the product it documents.
 * Names and profiles come from the owner profile in projects-finalization-record (`ecosystem/owner-profile.json`,
 * 2026-11-26); plan prices match the product's pricing.md (Free $0, Pro $9.99 a month, 2026-10-20).
 */

/**
 * Builds the JSON-LD graph for the docs site.
 *
 * @param siteUrl - the docs origin, without a trailing slash
 * @param productUrl - the product website origin, without a trailing slash
 * @returns one `@graph` object, ready for `JSON.stringify`
 */
export function siteJsonLd(siteUrl: string, productUrl: string): Record<string, unknown> {
  const person = 'https://aoneahsan.com/#person';
  const zaions = 'https://zaions.com/#organization';
  const app = `${productUrl}/#software`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Video Controls Plus Docs',
        url: `${siteUrl}/`,
        inLanguage: 'en',
        description: 'How to use Video Controls Plus, the browser extension for video speed, A-B loops, audio boost, filters and site tools on YouTube, Netflix and LinkedIn.',
        about: { '@id': app },
        publisher: { '@id': zaions },
        author: { '@id': person },
      },
      {
        '@type': 'Organization',
        '@id': zaions,
        name: 'Zaions',
        alternateName: ['Zaions products', 'Zaions projects'],
        url: 'https://zaions.com',
        logo: 'https://zaions.com/assets/logos/zaions-mark.png',
        founder: { '@id': person },
        sameAs: ['https://zaions.com', 'https://github.com/aoneahsan'],
      },
      {
        '@type': 'Person',
        '@id': person,
        name: 'Ahsan Mahmood',
        alternateName: ['Ahsan', 'aoneahsan', 'a1ahsan', 'A1 Ahsan', 'AOne Ahsan'],
        url: 'https://aoneahsan.com',
        jobTitle: 'Founder and developer, Zaions',
        worksFor: { '@id': zaions },
        sameAs: ['https://aoneahsan.com', 'https://zaions.com', 'https://github.com/aoneahsan', 'https://www.linkedin.com/in/aoneahsan'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': app,
        name: 'Video Controls Plus',
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'Chrome, Firefox, Edge',
        url: productUrl,
        sameAs: [
          'https://chromewebstore.google.com/detail/video-controls-plus/ihafdbecgnhendhckoknblmcminoikdb',
          'https://addons.mozilla.org/en-US/firefox/addon/video-controls-plus/',
          'https://microsoftedge.microsoft.com/addons/detail/video-controls-plus/ghjcpobkbbhefdlgffopfhlepkgcknlb',
        ],
        description: 'A browser extension that controls the video player on any site with a standard video: speed from 0.1x to 16x, A-B loops, audio boost to 400%, filters, screenshots and notes, with extra tools on YouTube, Netflix and LinkedIn.',
        softwareHelp: { '@type': 'CreativeWork', url: `${siteUrl}/docs/intro/` },
        offers: [
          { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', url: `${productUrl}/plans` },
          { '@type': 'Offer', name: 'Pro', price: '9.99', priceCurrency: 'USD', url: `${productUrl}/plans`, priceSpecification: { '@type': 'UnitPriceSpecification', price: '9.99', priceCurrency: 'USD', unitText: 'MONTH' } },
        ],
        author: { '@id': person },
        creator: { '@id': person },
        publisher: { '@id': zaions },
      },
    ],
  };
}
