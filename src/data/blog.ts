/**
 * The posts blog's own words, in one place: its plugin instance (`id: 'posts'` in docusaurus.config.ts) reads them
 * from here. Posts live in posts/; until the first one is published that instance is not loaded, so there is no Blog
 * link and no blog page. The changelog is the other blog instance, in blog/ at /changelog.
 */

/** The posts blog's route, with its leading slash: its plugin instance's `routeBasePath`. */
export const BLOG_PATH = '/blog';

export const BLOG_TITLE = 'Video Controls Plus posts';

export const BLOG_DESCRIPTION = 'One control at a time: the key to press, what it changes, and what it needs before it works.';
