import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import { BLOG_PATH } from '@site/src/data/blog';

type Update = { title: string; description: string; permalink: string; tags: string[]; date: string };

/** One entry of either list: its title, date and description. */
function FeedEntry({ entry, dateFormat }: { entry: Update; dateFormat: Intl.DateTimeFormat }): React.JSX.Element {
  return (
    <article className="vcp-feed-entry">
      <h2 className="margin-bottom--xs">
        <Link to={entry.permalink}>{entry.title}</Link>
      </h2>
      <time dateTime={entry.date} className="text--secondary">
        {dateFormat.format(new Date(entry.date))}
      </time>
      {entry.description && <p className="margin-top--sm">{entry.description}</p>}
    </article>
  );
}

/**
 * Human feed: every changelog entry, newest first, with the machine-readable feeds linked above it. Once the posts
 * blog has a post, its posts follow under their own feeds.
 */
export default function Feed(): React.JSX.Element {
  const { updates, posts } = usePluginData('vcpeai-discovery') as { updates: Update[]; posts: Update[] };
  const { i18n } = useDocusaurusContext();
  const dateFormat = new Intl.DateTimeFormat(i18n.currentLocale, { dateStyle: 'long', timeZone: 'UTC' });
  const hasPosts = posts.length > 0;

  return (
    <Layout
      title={translate({ id: 'feed.title', message: 'Feed' })}
      description={
        hasPosts
          ? translate({ id: 'feed.description_with_posts', message: 'Video Controls Plus changelog entries and posts, newest first, with RSS and Atom feeds.' })
          : translate({ id: 'feed.description', message: 'Video Controls Plus changelog entries, newest first, with RSS and Atom feeds.' })
      }>
      <main className="vcp-utility">
        <div className="vcp-utility-intro">
          <p className="vcp-eyebrow"><Translate id="feed.discovery">Documentation / Discovery</Translate></p>
          <h1><Translate id="feed.heading">Feed and sitemap.</Translate></h1>
          <p>
            {hasPosts ? (
              <Translate id="feed.intro_with_posts">The feed lists changelog entries, then posts, newest first. The sitemap groups every guide, release entry and post under the docs navigation.</Translate>
            ) : (
              <Translate id="feed.intro">The feed lists changelog entries newest first. The sitemap groups every guide and release entry under the docs navigation.</Translate>
            )}
          </p>
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
          <FeedEntry key={update.permalink} entry={update} dateFormat={dateFormat} />
        ))}
        {hasPosts && (
          <section aria-labelledby="feed-posts" className="margin-top--xl">
            <p className="vcp-eyebrow"><Translate id="feed.postsEyebrow">Posts</Translate></p>
            <h2 id="feed-posts"><Translate id="feed.followPosts">Follow the posts.</Translate></h2>
            <ul className="vcp-utility-links">
              <li>
                <Link to={`pathname://${BLOG_PATH}/rss.xml`}>{`${BLOG_PATH.slice(1)}/rss.xml`}</Link> (RSS)
              </li>
              <li>
                <Link to={`pathname://${BLOG_PATH}/atom.xml`}>{`${BLOG_PATH.slice(1)}/atom.xml`}</Link> (Atom)
              </li>
            </ul>
            {posts.map((post) => (
              <FeedEntry key={post.permalink} entry={post} dateFormat={dateFormat} />
            ))}
          </section>
        )}
        </div>
      </main>
    </Layout>
  );
}
