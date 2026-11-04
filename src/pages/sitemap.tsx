import React, { useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './sitemap.module.css';

type Entry = { title: string; description: string; permalink: string; tags: string[] };
type Group = { label: string; permalink?: string; entries: Entry[] };
type Discovery = { docGroups: Group[]; updates: (Entry & { date: string })[] };

const PRODUCT_URL = 'https://vcpeai.aoneahsan.com';

/** True when every word of the query appears in the entry's title, description or tags. */
function matches(entry: Entry, query: string, locale: string): boolean {
  const haystack = [entry.title, entry.description, ...entry.tags].join(' ').toLocaleLowerCase(locale);
  return query
    .toLocaleLowerCase(locale)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function EntryCard({ entry }: { entry: Entry }): React.JSX.Element {
  return (
    <Link to={entry.permalink} className={`card padding--md ${styles.card}`}>
      <strong>{entry.title}</strong>
      {entry.description && <p className="margin-bottom--none margin-top--sm">{entry.description}</p>}
      {entry.tags.length > 0 && (
        <div className={styles.tags}>
          {entry.tags.map((tag) => (
            <span key={tag} className="badge badge--secondary">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

/** Human sitemap: every doc and changelog entry, grouped by the docs sidebar, filterable through `?q=`. */
export default function Sitemap(): React.JSX.Element {
  const { docGroups, updates } = usePluginData('vcpeai-discovery') as Discovery;
  const { i18n } = useDocusaurusContext();
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search).get('q') ?? '';

  const groups = useMemo(() => {
    const all: Group[] = [...docGroups, { label: translate({ id: 'sitemap.changelog', message: 'Changelog' }), permalink: '/changelog', entries: updates }];
    return all
      .map((group) => ({ ...group, entries: group.entries.filter((e) => matches(e, query, i18n.currentLocale)) }))
      .filter((group) => group.entries.length > 0);
  }, [docGroups, updates, query, i18n.currentLocale]);

  const onSearch = (value: string): void => {
    const params = new URLSearchParams(location.search);
    if (value) params.set('q', value);
    else params.delete('q');
    const search = params.toString();
    history.replace({ search: search ? `?${search}` : '' });
  };

  return (
    <Layout title={translate({ id: 'sitemap.title', message: 'Sitemap' })} description={translate({ id: 'sitemap.description', message: 'Every Video Controls Plus documentation page and changelog entry.' })}>
      <main className="container margin-vert--xl">
        <h1><Translate id="sitemap.heading">Sitemap</Translate></h1>
        <ul>
          <li>
            <Link to="pathname:///sitemap.xml">sitemap.xml</Link>
          </li>
          <li>
            <Link to="/feed"><Translate id="sitemap.feed">Feed</Translate></Link>
          </li>
          <li>
            <Link href={PRODUCT_URL}>Video Controls Plus</Link>
          </li>
        </ul>
        <input
          type="search"
          className={styles.search}
          aria-label={translate({ id: 'sitemap.filterAria', message: 'Filter pages' })}
          placeholder={translate({ id: 'sitemap.filterPlaceholder', message: 'Filter pages' })}
          value={query}
          onChange={(event) => onSearch(event.target.value)}
        />
        {groups.length === 0 && <p>{translate({ id: 'sitemap.noResults', message: 'No pages match “{query}”.' }, { query })}</p>}
        {groups.map((group) => (
          <section key={group.label}>
            <h2>{group.permalink ? <Link to={group.permalink}>{group.label}</Link> : group.label}</h2>
            <div className={styles.grid}>
              {group.entries.map((entry) => (
                <EntryCard key={entry.permalink} entry={entry} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}
