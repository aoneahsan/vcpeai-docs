/**
 * Every place Video Controls Plus is released — the ONLY place a store or surface URL lives in this docs site.
 * Mirrors the website's `src/config/platforms.ts` (standard aoneahsan-cccs-platform-links). Google Play is not
 * listed: the app is not on the owner's developer page (checked 2026-11-20).
 */
export type PlatformId = 'web' | 'chrome' | 'firefox' | 'edge' | 'docs';

export interface Platform {
  id: PlatformId;
  name: string;
  shortName: string;
  href: string;
  primary?: boolean;
  verified: string;
}

export const PLATFORMS: readonly Platform[] = [
  { id: 'chrome', name: 'Chrome Web Store', shortName: 'Chrome', href: 'https://chromewebstore.google.com/detail/video-controls-plus/ihafdbecgnhendhckoknblmcminoikdb', primary: true, verified: '2026-11-20' },
  { id: 'firefox', name: 'Firefox Add-ons', shortName: 'Firefox', href: 'https://addons.mozilla.org/en-US/firefox/addon/video-controls-plus/', verified: '2026-11-20' },
  { id: 'edge', name: 'Microsoft Edge Add-ons', shortName: 'Edge', href: 'https://microsoftedge.microsoft.com/addons/detail/video-controls-plus/ghjcpobkbbhefdlgffopfhlepkgcknlb', verified: '2026-11-20' },
  { id: 'web', name: 'Website', shortName: 'Website', href: 'https://vcpeai.aoneahsan.com', verified: '2026-11-20' },
  { id: 'docs', name: 'Documentation', shortName: 'Docs', href: 'https://vcpeai-docs.aoneahsan.com', verified: '2026-11-20' },
];

/** This site is the docs surface: its own card reads "You're reading it". */
export const CURRENT_SURFACE: PlatformId = 'docs';
export const PRIMARY_PLATFORM: Platform = PLATFORMS.find((platform) => platform.primary) ?? PLATFORMS[0];
/** Released surfaces other than the primary and this site: the home hero's smaller row. */
export const SECONDARY_PLATFORMS: readonly Platform[] = PLATFORMS.filter((platform) => !platform.primary && platform.id !== CURRENT_SURFACE);
