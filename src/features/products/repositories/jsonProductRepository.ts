import { loadProducts } from './jsonProducts';

import type { ProductRepository } from './productRepository';

export function createJsonProductRepository(): ProductRepository {
  const productList = loadProducts();

  return {
    async list() {
      return productList;
    },
    async getById(id) {
      return productList.find((productItem) => productItem.id === id) ?? null;
    },
  };
}
