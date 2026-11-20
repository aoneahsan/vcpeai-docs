import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { CURRENT_SURFACE, PLATFORMS, type PlatformId } from '../data/platforms';
import styles from './index.module.css';

const LEDE = translate({ id: 'apps.lede', message: 'Video Controls Plus lives in your browser. Add it from the store that matches it, and keep these guides a tab away.' });

/** What each surface is for, in this product's words. */
const COPY: Record<PlatformId, { title: string; text: string; cta: string }> = {
  chrome: { title: translate({ id: 'apps.chrome.title', message: 'Chrome, and other Chromium browsers' }), text: translate({ id: 'apps.chrome.text', message: 'The listing most people install from.' }), cta: translate({ id: 'apps.chrome.cta', message: 'Add to Chrome' }) },
  firefox: { title: translate({ id: 'apps.firefox.title', message: 'Firefox on your computer' }), text: translate({ id: 'apps.firefox.text', message: "The same widget and speed keys, from Mozilla's add-on store." }), cta: translate({ id: 'apps.firefox.cta', message: 'Add to Firefox' }) },
  edge: { title: translate({ id: 'apps.edge.title', message: 'Edge, at home or at work' }), text: translate({ id: 'apps.edge.text', message: 'Including managed Windows machines that only allow the Edge store.' }), cta: translate({ id: 'apps.edge.cta', message: 'Get it for Edge' }) },
  web: { title: translate({ id: 'apps.web.title', message: 'The website' }), text: translate({ id: 'apps.web.text', message: 'Your account, plans and library. Connect the extension there to keep loops and notes.' }), cta: translate({ id: 'apps.web.cta', message: 'Open the website' }) },
  docs: { title: translate({ id: 'apps.docs.title', message: 'These docs' }), text: translate({ id: 'apps.docs.text', message: 'Every control, written down.' }), cta: translate({ id: 'apps.docs.cta', message: 'Read the docs' }) },
};

/** `/apps` — "Get Video Controls Plus": every released surface, from `src/data/platforms.ts`. */
export default function Apps(): React.JSX.Element {
  return <Layout title={translate({ id: 'apps.title', message: 'Get Video Controls Plus' })} description={LEDE}><main className={styles.page}>
    <section className={styles.hero}><div className={styles.wrap}>
      <div><p className={styles.eyebrow}><Translate id="apps.eyebrow">Get Video Controls Plus</Translate></p>
        <h1><Translate id="apps.heading">Your pace, in the browser you watch in.</Translate></h1><p className={styles.lede}>{LEDE}</p>
      </div>
    </div></section>
    <section className={styles.sections} aria-labelledby="apps-list-title"><div className={styles.wrap}>
      <p className={styles.eyebrow}><Translate id="apps.listLabel">01 / Where it runs</Translate></p>
      <h2 id="apps-list-title"><Translate id="apps.listTitle">Pick your place.</Translate></h2>
      <div className={styles.grid}>{PLATFORMS.map((platform) => {
        const words = COPY[platform.id];
        const current = platform.id === CURRENT_SURFACE;
        const body = <>
          <span className={styles.cardNumber}>{platform.name}</span>
          <h3>{words.title}</h3>
          <p>{words.text}</p>
          <span>{current ? <Translate id="apps.current">You're reading it</Translate> : `${words.cta} ↗`}</span>
        </>;
        return current
          ? <div key={platform.id} className={styles.card}>{body}</div>
          : <Link key={platform.id} className={styles.card} href={platform.href}>{body}</Link>;
      })}</div>
    </div></section>
  </main></Layout>;
}
