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
      items: ['getting-started/install', 'getting-started/first-run', 'getting-started/pause-per-site', 'getting-started/website-tours'],
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
    {
      type: 'category',
      label: 'Moving to Video Controls Plus',
      items: [
        'compare/index',
        'compare/video-roll-all-in-one-video-enhancements',
        'compare/super-video-speed-controller',
        'compare/video-speed-control',
        'compare/floating-video-player',
        'compare/html5-video-speed-control',
        'compare/video-popout',
        'compare/videocontrols',
        'compare/video-controls-for-tiktok',
        'compare/better-youtube-controls',
        'compare/web-video-controller-nudgeplay',
        'compare/video-image-control-new-gamma',
        'compare/video-dominator',
        'compare/video-player-extension',
        'compare/video-downloadhelper',
        'compare/video-downloader-cococut',
        'compare/video-audio-downloader',
        'compare/magic-actions-for-youtube',
      ],
    },
    'ai-features',
    'account-and-sync',
    'privacy-and-permissions',
    {
      type: 'category',
      label: 'White-label & licensing',
      description: 'Run Video Controls Plus under your own brand, or buy the source outright.',
      link: { type: 'doc', id: 'white-label/index' },
      items: ['white-label/what-you-get', 'white-label/setup', 'white-label/updates', 'white-label/verify', 'white-label/faq'],
    },
    'troubleshooting',
    'faq',
    { type: 'link', label: 'Changelog', href: '/changelog' },
    'about',
  ],
};

export default sidebars;
