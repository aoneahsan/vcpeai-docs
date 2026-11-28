import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { localizedEcosystemProducts } from '../../data/ecosystem';

/** Renders each approved unique-angle detail page from the vendored public copy. */
export default function Detail({ id }: { id: string }): React.JSX.Element {
  const { i18n } = useDocusaurusContext();
  const product = localizedEcosystemProducts().find((item) => item.id === id);
  if (!product) throw new Error(`Unknown ecosystem product: ${id}`);
  const localePrefix = i18n.currentLocale === 'en' ? '' : `/${i18n.currentLocale}`;
  const pageUrl = `https://vcpeai-docs.aoneahsan.com${localePrefix}/ecosystem/${product.id}/`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: translate({ id: 'ecosystem.moreFromZaions', message: 'More from Zaions' }), item: `https://vcpeai-docs.aoneahsan.com${localePrefix}/ecosystem/` },
      { '@type': 'ListItem', position: 2, name: product.name, item: pageUrl },
    ] },
    { '@type': 'SoftwareApplication', name: product.name, url: product.liveUrl,
      creator: { '@type': 'Organization', name: 'Zaions', url: 'https://zaions.com' } },
  ] };
  return <Layout title={`${product.name} | ${translate({ id: 'ecosystem.moreFromZaions', message: 'More from Zaions' })}`} description={product.card}>
    <Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>
    <main className="vcp-ecosystem-page"><header className="vcp-ecosystem-hero"><p className="vcp-eyebrow"><Link to="/ecosystem">{translate({ id: 'ecosystem.moreFromZaions', message: 'More from Zaions' })}</Link> / {product.category}</p>
      <img src={product.logo} alt="" width="72" height="72" /><h1>{product.heading}</h1><p>{product.card}</p>
      <a className="vcp-ecosystem-primary" href={product.liveUrl}>{translate({ id: 'ecosystem.openProduct', message: 'Open {name}' }, { name: product.name })} ↗</a></header>
      <div className="vcp-ecosystem-body vcp-ecosystem-detail"><div>{product.paragraphs.map((paragraph, index) =>
        <p key={index}>{paragraph.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, partIndex) => {
          const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
          return match ? <a key={partIndex} href={match[2]}>{match[1]}</a> : part;
        })}</p>)}</div><aside><span className="vcp-showcase-number">{translate({ id: 'ecosystem.anotherProduct', message: 'ANOTHER ZAIONS PRODUCT' })}</span><h2>{product.name}</h2>
        <p>{product.card}</p><a href={product.liveUrl}>{translate({ id: 'ecosystem.visitProduct', message: 'Visit the product' })} ↗</a>
        {product.docsUrl && <p><a href={product.docsUrl}>{translate({ id: 'ecosystem.readDocs', message: 'Read its docs' })} ↗</a></p>}</aside></div>
      <div className="vcp-ecosystem-back"><Link to="/ecosystem">← {translate({ id: 'ecosystem.backToProducts', message: 'Back to all products' })}</Link></div>
    </main>
  </Layout>;
}
