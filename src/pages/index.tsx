import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const INSTALL_URL = 'https://vcpeai.aoneahsan.com/install';
const DOCS_HOME = '/docs/intro';
const LEDE = 'Documentation for the Video Controls Plus browser extension.';

type IconName =
  | 'play'
  | 'sliders'
  | 'keyboard'
  | 'screens'
  | 'spark'
  | 'sync'
  | 'shield'
  | 'wrench'
  | 'question'
  | 'list';

type Section = { title: string; to: string; icon: IconName };

/**
 * One card per sidebar category. Each `to` is its own field so a card can be re-pointed at its
 * category page once that page is in the production build; until then every card opens the
 * introduction, because the build fails on a link to a page that does not exist.
 */
const SECTIONS: Section[] = [
  { title: 'Getting started', to: DOCS_HOME, icon: 'play' },
  { title: 'User guide', to: DOCS_HOME, icon: 'sliders' },
  { title: 'Keyboard shortcuts', to: DOCS_HOME, icon: 'keyboard' },
  { title: 'Platforms', to: DOCS_HOME, icon: 'screens' },
  { title: 'AI features', to: DOCS_HOME, icon: 'spark' },
  { title: 'Account and sync', to: DOCS_HOME, icon: 'sync' },
  { title: 'Privacy and permissions', to: DOCS_HOME, icon: 'shield' },
  { title: 'Troubleshooting', to: DOCS_HOME, icon: 'wrench' },
  { title: 'FAQ', to: DOCS_HOME, icon: 'question' },
  { title: 'Changelog', to: DOCS_HOME, icon: 'list' },
];

const ICON_PATHS: Record<IconName, React.JSX.Element> = {
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  sliders: <path d="M4 7h9m4 0h3M4 17h3m4 0h9M15 4.5v5M9 14.5v5" />,
  keyboard: <path d="M3 7h18v10H3zM7 10.5h.01M11 10.5h.01M15 10.5h.01M8 14h8" />,
  screens: <path d="M3 5h12v9H3zM9 14v4m-3 0h6M18 9h3v9h-5" />,
  spark: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4zM18.5 16v4m-2-2h4" />,
  sync: <path d="M20 8a8 8 0 0 0-14.5-2M4 4v4h4M4 16a8 8 0 0 0 14.5 2M20 20v-4h-4" />,
  shield: <path d="M12 3l7.5 3v5.5c0 4.5-3.1 7.9-7.5 9.5-4.4-1.6-7.5-5-7.5-9.5V6zM9 12l2.2 2.2L15.2 10" />,
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5L11 20a2.5 2.5 0 0 1-3.5-3.5l8.5-8.5a4 4 0 0 1 1-4z" />,
  question: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1 1-1.1 1.8M12 17h.01" />,
  list: <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />,
};

function Icon({ name }: { name: IconName }): React.JSX.Element {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/**
 * The scrubber under the hero: a timeline with one tick per section, a looped range and a
 * playhead. Decoration only, so it is hidden from assistive technology.
 */
function Scrubber(): React.JSX.Element {
  return (
    <div className={styles.scrubber} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.loop} />
        <span className={styles.played} />
        <span className={styles.playhead} />
        <span className={styles.ticks}>
          {SECTIONS.map((section) => (
            <span key={section.title} className={styles.tick} />
          ))}
        </span>
      </div>
    </div>
  );
}

/** Docs landing page: the product name, one line, the section cards and two actions. */
export default function Home(): React.JSX.Element {
  const logo = useBaseUrl('/img/logo.svg');

  return (
    <Layout description={LEDE}>
      <main className={styles.page}>
        <header className={styles.screen}>
          <div className={styles.hero}>
            <img className={styles.mark} src={logo} alt="" width="64" height="64" />
            <h1 className={styles.title}>Video Controls Plus</h1>
            <p className={styles.lede}>{LEDE}</p>
            <div className={styles.actions}>
              <Link className={`${styles.button} ${styles.primary}`} to={DOCS_HOME}>
                Read the docs
              </Link>
              <Link className={`${styles.button} ${styles.secondary}`} href={INSTALL_URL}>
                Get the extension
              </Link>
            </div>
          </div>
          <Scrubber />
        </header>

        <nav className={styles.sections} aria-label="Documentation sections">
          <ul className={styles.grid}>
            {SECTIONS.map((section) => (
              <li key={section.title} className={styles.cell}>
                <Link className={styles.card} to={section.to}>
                  <span className={styles.tile}>
                    <Icon name={section.icon} />
                  </span>
                  <span className={styles.cardTitle}>{section.title}</span>
                  <svg
                    className={styles.arrow}
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </Layout>
  );
}
