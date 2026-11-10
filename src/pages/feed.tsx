import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';

type Update = { title: string; description: string; permalink: string; tags: string[]; date: string };

/** Human feed: every changelog entry, newest first, with the machine-readable feeds linked above it. */
export default function Feed(): React.JSX.Element {
  const { updates } = usePluginData('vcpeai-discovery') as { updates: Update[] };
  const { i18n } = useDocusaurusContext();
  const dateFormat = new Intl.DateTimeFormat(i18n.currentLocale, { dateStyle: 'long', timeZone: 'UTC' });

  return (
    <Layout title={translate({ id: 'feed.title', message: 'Feed' })} description={translate({ id: 'feed.description', message: 'Video Controls Plus changelog entries, newest first, with RSS and Atom feeds.' })}>
      <main className="vcp-utility">
        <div className="vcp-utility-intro">
          <p className="vcp-eyebrow"><Translate id="feed.discovery">Documentation / Discovery</Translate></p>
          <h1><Translate id="feed.heading">Feed and sitemap.</Translate></h1>
          <p><Translate id="feed.intro">The feed lists changelog entries newest first. The sitemap groups every guide and release entry under the docs navigation.</Translate></p>
          <div className="vcp-utility-tabs"><Link className="active" to="/feed"><Translate id="feed.tab">Feed</Translate></Link><Link to="/sitemap"><Translate id="feed.sitemapTab">Sitemap</Translate></Link></div>
        </div>
        <div className="vcp-utility-sheet">
        <p className="vcp-eyebrow"><Translate id="feed.machineFeeds">Machine-readable feeds</Translate></p>
        <h2><Translate id="feed.follow">Follow the changelog.</Translate></h2>
        <ul className="vcp-utility-links">
          <li>
            <Link to="pathname:///feed.xml">feed.xml</Link> (RSS)
          </li>
          <li>
            <Link to="pathname:///changelog/rss.xml">changelog/rss.xml</Link> (RSS)
          </li>
          <li>
            <Link to="pathname:///changelog/atom.xml">changelog/atom.xml</Link> (Atom)
          </li>
        </ul>
        {updates.map((update) => (
          <article key={update.permalink} className="vcp-feed-entry">
            <h2 className="margin-bottom--xs">
              <Link to={update.permalink}>{update.title}</Link>
            </h2>
            <time dateTime={update.date} className="text--secondary">
              {dateFormat.format(new Date(update.date))}
            </time>
            {update.description && <p className="margin-top--sm">{update.description}</p>}
          </article>
        ))}
        </div>
      </main>
    </Layout>
  );
}
