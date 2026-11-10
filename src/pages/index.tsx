import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

const LEDE = translate({ id: 'home.lede', message: 'Control your online video player the way you want it, and get special features on each website.' });
const SECTIONS = [
  { title: 'Getting started', text: 'Install it, press your first key, and pause it on one site.', to: '/docs/getting-started/install' },
  { title: 'User guide', text: 'Speed, A-B loop, audio boost, filters, screenshots and notes, one page each.', to: '/docs/user-guide/speed-control' },
  { title: 'Keyboard shortcuts', text: 'Every default key, and how to give a shortcut another key.', to: '/docs/keyboard-shortcuts/defaults' },
  { title: 'Platforms', text: 'The extras on YouTube, Netflix and LinkedIn, and how other sites work.', to: '/docs/platforms/youtube' },
  { title: 'AI features', text: 'Video summaries and LinkedIn writing help, and what each one sends.', to: '/docs/ai-features' },
  { title: 'Account and sync', text: 'How to connect your account, how sync works, how to delete your data.', to: '/docs/account-and-sync' },
  { title: 'Privacy and permissions', text: 'What is recorded, and what each permission is for.', to: '/docs/privacy-and-permissions' },
  { title: 'Troubleshooting', text: 'What you see, why it happens, and the step that fixes it.', to: '/docs/troubleshooting' },
  { title: 'FAQ', text: 'Short answers to the questions people ask first.', to: '/docs/faq' },
  { title: 'Changelog', text: 'What changed in the last four releases.', to: '/changelog' },
] as const;

/** The approved documentation landing layout, with real published destinations. */
export default function Home(): React.JSX.Element {
  return <Layout description={LEDE}><main className={styles.page}>
    <section className={styles.hero}><div className={styles.wrap}>
      <div><p className={styles.eyebrow}><Translate id="home.startHere">Documentation / Start here</Translate></p>
        <h1>Video Controls Plus</h1><p className={styles.lede}>{LEDE}</p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/docs/intro"><Translate id="home.readDocs">Read the docs</Translate> ↗</Link>
          <Link className={styles.secondary} href="https://vcpeai.aoneahsan.com/install"><Translate id="home.getExtension">Get the extension</Translate> ↗</Link>
        </div>
      </div>
      <div className={styles.timeline} aria-hidden="true"><span>0:00</span><span className={styles.track}><i /></span><span>10:00</span></div>
    </div></section>
    <section className={styles.sections} aria-labelledby="docs-sections-title"><div className={styles.wrap}>
      <p className={styles.eyebrow}><Translate id="home.sectionsLabel">01 / Documentation sections</Translate></p>
      <h2 id="docs-sections-title"><Translate id="home.pickNext">Pick the next page.</Translate></h2>
      <div className={styles.grid}>{SECTIONS.map((section, index) =>
        <Link key={section.to} className={styles.card} to={section.to}>
          <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')} / <Translate id="home.documentation">Documentation</Translate></span>
          <strong>{section.title}</strong>
          <span>{section.text}</span>
          <small><Translate id="home.openArticle">Open article</Translate> ↗</small>
        </Link>)}</div>
    </div></section>
    <div className={styles.sitemapBand}><div className={styles.wrap}><Link to="/sitemap"><Translate id="home.searchSitemap">Search the docs sitemap</Translate> ↗</Link></div></div>
  </main></Layout>;
}
