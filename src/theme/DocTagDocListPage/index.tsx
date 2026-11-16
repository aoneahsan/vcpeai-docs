import React from 'react';
import Head from '@docusaurus/Head';
import DocTagDocListPage from '@theme-original/DocTagDocListPage';
import type { Props } from '@theme/DocTagDocListPage';

/** A single tag's page lists other pages; search engines get the pages themselves instead. */
export default function DocTagDocListPageWithNoIndex(props: Props): React.ReactElement {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <DocTagDocListPage {...props} />
    </>
  );
}
