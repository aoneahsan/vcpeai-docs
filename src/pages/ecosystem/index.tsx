import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import { useHistory, useLocation } from '@docusaurus/router';
import { localizedEcosystemProducts } from '../../data/ecosystem';

type View = 'grid' | 'list' | 'table';

/** Three views of the same approved product roster. */
export default function Ecosystem(): React.JSX.Element {
  const ecosystemProducts = localizedEcosystemProducts();
  const location = useLocation();
  const history = useHistory();
  const requested = new URLSearchParams(location.search).get('view');
  const view: View = requested === 'list' || requested === 'table' ? requested : 'grid';
  const setView = (next: View): void => history.replace({ search: next === 'grid' ? '' : `?view=${next}` });
  const schema = { '@context': 'https://schema.org', '@type': 'ItemList',
    itemListElement: ecosystemProducts.map((product, position) => ({ '@type': 'ListItem', position: position + 1,
      item: { '@type': 'SoftwareApplication', name: product.name, url: product.liveUrl } })) };
  return <Layout title={translate({ id: 'ecosystem.title', message: 'What else does Zaions make?' })} description={translate({ id: 'ecosystem.description', message: 'Browse the other Zaions products from the team behind Video Controls Plus.' })}>
    <Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>
    <main className="vcp-ecosystem-page"><header className="vcp-ecosystem-hero"><p className="vcp-eyebrow">{translate({ id: 'ecosystem.eyebrow', message: 'Beyond the player / Zaions' })}</p>
      <h1>{translate({ id: 'ecosystem.title', message: 'What else does Zaions make?' })}</h1><p>{translate({ id: 'ecosystem.intro', message: 'Zaions makes products for jobs beyond online video. Look around. This page shows the other products from the same team, from a messaging app and a health record to developer packages and cleanup tools. Open a card to see what that product does, where it runs and the limit that matters before you visit it, then follow the link to the product\'s own site. These products have their own accounts and workflows; seeing them here does not mean they connect to Video Controls Plus.' })}</p>
      <p>{translate({ id: 'ecosystem.viewsIntro', message: 'Choose a grid to browse, a list to read each product in order, or a table to compare names, categories and platforms. All three views show the same products. You can change the view without losing your place.' })}</p></header>
      <div className="vcp-ecosystem-body"><div className="vcp-ecosystem-toolbar"><h2>{translate({ id: 'ecosystem.otherProducts', message: '{count} other products' }, { count: ecosystemProducts.length })}</h2>
        <div role="group" aria-label={translate({ id: 'ecosystem.chooseView', message: 'Choose product view' })}>{(['grid', 'list', 'table'] as const).map((option) =>
          <button type="button" key={option} aria-pressed={view === option} onClick={() => setView(option)}>{translate({ id: `ecosystem.view.${option}`, message: option })}</button>)}</div></div>
      {view === 'table' ? <div className="vcp-ecosystem-table-wrap"><table><thead><tr><th>{translate({ id: 'ecosystem.table.product', message: 'Product' })}</th><th>{translate({ id: 'ecosystem.table.category', message: 'Category' })}</th><th>{translate({ id: 'ecosystem.table.platform', message: 'Where it runs' })}</th><th>{translate({ id: 'ecosystem.table.description', message: 'What it does' })}</th><th>{translate({ id: 'ecosystem.table.actions', message: 'Actions' })}</th></tr></thead><tbody>
        {ecosystemProducts.map((product) => <tr key={product.id}><th><Link to={`/ecosystem/${product.id}`}>{product.name}</Link></th>
          <td>{product.category}</td><td>{product.platformLabel}</td><td>{product.card}</td><td><a href={product.liveUrl}>{translate({ id: 'ecosystem.visitNamedProduct', message: 'Visit {name}' }, { name: product.name })} ↗</a><br /><Link to={`/ecosystem/${product.id}`}>{translate({ id: 'ecosystem.details', message: 'Details' })} →</Link></td></tr>)}</tbody></table></div>
        : <div className={`vcp-ecosystem-cards ${view === 'list' ? 'is-list' : ''}`}>
          {ecosystemProducts.map((product, index) => <article key={product.id}><p className="vcp-showcase-number">{String(index + 1).padStart(2, '0')} / ZAIONS</p>
            <img src={product.logo} alt="" width="64" height="64" loading="lazy" /><h3><Link to={`/ecosystem/${product.id}`}>{product.name}</Link></h3>
            <p>{product.card}</p><div className="vcp-ecosystem-actions"><a href={product.liveUrl}>{translate({ id: 'ecosystem.visitNamedProduct', message: 'Visit {name}' }, { name: product.name })} ↗</a><Link to={`/ecosystem/${product.id}`}>{translate({ id: 'ecosystem.details', message: 'Details' })} →</Link></div></article>)}</div>}
      </div></main>
  </Layout>;
}
