import React from 'react';
import Head from '@docusaurus/Head';
import owner from '../../data/owner-profile.json';

/** Search entity facts for the visible, owner-approved journey page. */
export default function AboutSchema(): React.JSX.Element {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'AboutPage', url: 'https://vcpeai-docs.aoneahsan.com/about-developer/',
      name: 'Who makes Video Controls Plus?', about: { '@id': `${owner.person.url}#person` } },
    { '@type': 'Person', '@id': `${owner.person.url}#person`, name: owner.person.name,
      alternateName: owner.person.alternateName, url: owner.person.url, sameAs: owner.person.sameAs,
      worksFor: { '@type': 'Organization', name: owner.organization.name, url: owner.organization.url } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Video Controls Plus Docs', item: 'https://vcpeai-docs.aoneahsan.com/' },
      { '@type': 'ListItem', position: 2, name: 'About the developer', item: 'https://vcpeai-docs.aoneahsan.com/about-developer/' },
    ] },
  ] };
  return <Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>;
}
