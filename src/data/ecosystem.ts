import roster from './ecosystem.json';
import { translate } from '@docusaurus/Translate';

export type EcosystemProduct = (typeof roster.products)[number];
export const ecosystemProducts: EcosystemProduct[] = roster.products;

/** Resolve the vendored product facts in the current Docusaurus locale. */
export function localizedEcosystemProducts(): EcosystemProduct[] {
  return ecosystemProducts.map((product) => ({
    ...product,
    category: translate({ id: `ecosystem.category.${product.category}`, message: product.category }),
    card: translate({ id: `ecosystem.product.${product.id}.card`, message: product.card }),
    heading: translate({ id: `ecosystem.product.${product.id}.heading`, message: product.heading }),
    platformLabel: translate({ id: `ecosystem.product.${product.id}.platformLabel`, message: product.platformLabel }),
    paragraphs: product.paragraphs.map((paragraph, index) => translate({
      id: `ecosystem.product.${product.id}.paragraph.${index + 1}`,
      message: paragraph,
    })),
  }));
}

/** The public docs never recommend their own product as another Zaions product. */
if (ecosystemProducts.some((product) => product.id === roster.currentProductId)) {
  throw new Error('The ecosystem roster contains Video Controls Plus');
}
