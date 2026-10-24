import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Explicit, curated sidebar. A doc marked `draft: true` is dropped from the production sidebar by
 * Docusaurus, and a category left with no items disappears with it, so navigation only ever shows
 * pages that exist in the build.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      items: ['getting-started/install', 'getting-started/first-run', 'getting-started/pause-per-site'],
    },
    {
      type: 'category',
      label: 'User guide',
      items: [
        'user-guide/speed-control',
        'user-guide/ab-loop',
        'user-guide/audio-boost',
        'user-guide/video-filters',
        'user-guide/comfort-and-accessibility',
        'user-guide/visual-effects',
        'user-guide/audio-tools',
        'user-guide/capture-and-export',
        'user-guide/playback-automation',
        'user-guide/watch-limits-and-focus',
        'user-guide/study-tools',
        'user-guide/study-library',
        'user-guide/share-and-watch-together',
        'user-guide/screenshots',
        'user-guide/notes-and-bookmarks',
        'user-guide/picture-in-picture',
        'user-guide/auto-skip',
        'user-guide/display-and-widget',
      ],
    },
    {
      type: 'category',
      label: 'Keyboard shortcuts',
      items: ['keyboard-shortcuts/defaults', 'keyboard-shortcuts/rebinding'],
    },
    {
      type: 'category',
      label: 'Platforms',
      items: ['platforms/youtube', 'platforms/netflix', 'platforms/linkedin', 'platforms/other-sites'],
    },
    'ai-features',
    'account-and-sync',
    'privacy-and-permissions',
    'troubleshooting',
    'faq',
    { type: 'link', label: 'Changelog', href: '/changelog' },
    'about',
  ],
};

export default sidebars;
