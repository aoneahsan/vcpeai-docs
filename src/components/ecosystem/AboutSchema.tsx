import React from 'react';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import owner from '../../data/owner-profile.json';

/** Search entity facts for the visible, owner-approved journey page. */
export default function AboutSchema(): React.JSX.Element {
  const { i18n } = useDocusaurusContext();
  const localePrefix = i18n.currentLocale === 'en' ? '' : `/${i18n.currentLocale}`;
  const siteUrl = `https://vcpeai-docs.aoneahsan.com${localePrefix}/`;
  const pageUrl = `${siteUrl}about-developer/`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'AboutPage', url: pageUrl,
      name: translate({ id: 'aboutDeveloper.title', message: 'Who makes Video Controls Plus?' }),
      about: { '@id': `${owner.person.url}#person` } },
    { '@type': 'Person', '@id': `${owner.person.url}#person`, name: owner.person.name,
      alternateName: owner.person.alternateName, url: owner.person.url, sameAs: owner.person.sameAs,
      worksFor: { '@type': 'Organization', name: owner.organization.name, url: owner.organization.url } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1,
        name: translate({ id: 'aboutDeveloper.docsBreadcrumb', message: 'Video Controls Plus Docs' }), item: siteUrl },
      { '@type': 'ListItem', position: 2,
        name: translate({ id: 'aboutDeveloper.breadcrumb', message: 'About the developer' }), item: pageUrl },
    ] },
  ] };
  return <Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>;
}
