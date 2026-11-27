import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { PRIMARY_PLATFORM, SECONDARY_PLATFORMS } from '../data/platforms';
import styles from './index.module.css';

const LEDE = translate({ id: 'home.lede', message: 'Control your online video player the way you want it, and get special features on each website.' });
// The page's own summary for search results: what these docs cover, in this product's numbers (vcpeai-docs#1 box 2).
const DESCRIPTION = translate({
  id: 'home.description',
  message: 'Docs for Video Controls Plus: speed from 0.1x to 16x, the A-B loop, 400% audio boost, the YouTube, Netflix and LinkedIn extras, shortcuts and your data.',
});
/** What the extension does, in its own numbers, checked against the shipped-feature list (2026-11-27). */
const FACTS = [
  { title: '0.1x to 16x', text: 'Press [ or ] to change speed by 0.1x up to 4x; type a custom speed in the widget to go to 16x. Speed works without an account.', to: '/docs/user-guide/speed-control' },
  { title: 'Ctrl + Alt, then a letter', text: 'Every letter and digit key starts with Ctrl + Alt so it never fights the site. Only [ ] = \\ \' , . and Esc work alone, and every key can be changed.', to: '/docs/keyboard-shortcuts/defaults' },
  { title: '62 · 52 · 48', text: 'YouTube has 62 extras, most on from the start. Netflix has 52, and the 50 with a switch start off. LinkedIn has 48 tools.', to: '/docs/platforms/youtube' },
  { title: 'A loop, 400%, filters', text: 'The A-B loop, audio boost to 400%, filters and screenshots need an account on the website. Connecting takes a short code, not a password.', to: '/docs/account-and-sync' },
] as const;
const SECTIONS = [
  { title: 'Getting started', text: 'Install it, press your first key, and pause it on one site.', to: '/docs/getting-started/install' },
  { title: 'User guide', text: 'Speed, A-B loop, audio boost, filters, screenshots and notes, one page each.', to: '/docs/user-guide/speed-control' },
  { title: 'Keyboard shortcuts', text: 'Every default key, and how to give a shortcut another key.', to: '/docs/keyboard-shortcuts/defaults' },
  { title: 'Platforms', text: 'The extras on YouTube, Netflix and LinkedIn, and how other sites work.', to: '/docs/platforms/youtube' },
  { title: 'AI features', text: 'Video summaries and LinkedIn writing help, and what each one sends.', to: '/docs/ai-features' },
  { title: 'Account and sync', text: 'How to connect your account, how sync works, how to delete your data.', to: '/docs/account-and-sync' },
  { title: 'Developers', text: 'Access keys, the API, Claude and ChatGPT, webhooks and two-step sign-in.', to: '/docs/developers' },
  { title: 'Privacy and permissions', text: 'What is recorded, and what each permission is for.', to: '/docs/privacy-and-permissions' },
  { title: 'White-label and licensing', text: 'Run Video Controls Plus under your own brand, or buy the source outright.', to: '/docs/white-label' },
  { title: 'Troubleshooting', text: 'What you see, why it happens, and the step that fixes it.', to: '/docs/troubleshooting' },
  { title: 'FAQ', text: 'Short answers to the questions people ask first.', to: '/docs/faq' },
  { title: 'Changelog', text: 'What changed in the last four releases.', to: '/changelog' },
] as const;

/** The approved documentation landing layout, with real published destinations. */
export default function Home(): React.JSX.Element {
  return <Layout description={DESCRIPTION}><main className={styles.page}>
    <section className={styles.hero}><div className={styles.wrap}>
      <div><p className={styles.eyebrow}><Translate id="home.startHere">Documentation / Start here</Translate></p>
        <h1>Video Controls Plus</h1><p className={styles.lede}>{LEDE}</p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/docs/intro"><Translate id="home.readDocs">Read the docs</Translate> ↗</Link>
          <Link className={styles.secondary} href={PRIMARY_PLATFORM.href}><Translate id="home.addToChrome">Add to Chrome</Translate> ↗</Link>
        </div>
        <p className={styles.also}><span><Translate id="home.alsoOn">Also on</Translate></span>{SECONDARY_PLATFORMS.map((platform) => <Link key={platform.id} href={platform.href}>{platform.shortName} ↗</Link>)}<Link to="/apps"><Translate id="home.allApps">All apps</Translate> →</Link></p>
      </div>
      <div className={styles.timeline} aria-hidden="true"><span>0:00</span><span className={styles.track}><i /></span><span>10:00</span></div>
    </div></section>
    <section className={styles.sections} aria-labelledby="docs-facts-title"><div className={styles.wrap}>
      <p className={styles.eyebrow}><Translate id="home.factsLabel">01 / Before you read</Translate></p>
      <h2 id="docs-facts-title"><Translate id="home.factsTitle">Four things people ask first.</Translate></h2>
      <div className={styles.grid}>{FACTS.map((fact) =>
        <Link key={fact.to} className={styles.card} to={fact.to}>
          <strong>{fact.title}</strong>
          <span>{fact.text}</span>
          <small><Translate id="home.openArticle">Open article</Translate> ↗</small>
        </Link>)}</div>
      <p className={styles.credit}><Translate id="home.credit">Written by the Video Controls Plus team at</Translate> <Link href="https://zaions.com">Zaions</Link>, <Translate id="home.creditDeveloper">the products company of developer</Translate> <Link href="https://aoneahsan.com">Ahsan Mahmood</Link>. <Translate id="home.creditGuides">Step-by-step guides for each platform live on the</Translate> <Link href="https://vcpeai.aoneahsan.com/blog">Video Controls Plus blog</Link>.</p>
    </div></section>
    <section className={styles.sections} aria-labelledby="docs-sections-title"><div className={styles.wrap}>
      <p className={styles.eyebrow}><Translate id="home.sectionsLabel">02 / Documentation sections</Translate></p>
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
