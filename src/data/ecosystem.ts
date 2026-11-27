import roster from './ecosystem.json';

export type EcosystemProduct = (typeof roster.products)[number];
export const ecosystemProducts: EcosystemProduct[] = roster.products;

/** The public docs never recommend their own product as another Zaions product. */
if (ecosystemProducts.some((product) => product.id === roster.currentProductId)) {
  throw new Error('The ecosystem roster contains Video Controls Plus');
}
