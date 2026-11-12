import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HtmlClassNameProvider, PageMetadata, ThemeClassNames } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogPostItems from '@theme/BlogPostItems';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogListPage';

/** Keep the changelog index's visible heading in step with its page metadata. */
export default function BlogListPage({ metadata, items, sidebar }: Props): ReactNode {
  const { siteConfig: { title: siteTitle } } = useDocusaurusContext();
  const title = metadata.permalink === '/' ? siteTitle : metadata.blogTitle;

  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <PageMetadata title={title} description={metadata.blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
      <BlogListPageStructuredData metadata={metadata} items={items} sidebar={sidebar} />
      <BlogLayout sidebar={sidebar}>
        <h1>{metadata.blogTitle}</h1>
        <BlogPostItems items={items} />
        <BlogListPaginator metadata={metadata} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
