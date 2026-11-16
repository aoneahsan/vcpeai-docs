import React from 'react';
import Head from '@docusaurus/Head';
import DocTagsListPage from '@theme-original/DocTagsListPage';
import type { Props } from '@theme/DocTagsListPage';

/** The tag index is navigation, not an answer: kept out of the sitemap and out of search results. */
export default function DocTagsListPageWithNoIndex(props: Props): React.ReactElement {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <DocTagsListPage {...props} />
    </>
  );
}
