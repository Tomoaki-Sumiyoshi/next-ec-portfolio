import type { Product } from '../domain/product.schema';

export type ProductRepository = {
  list: () => Promise<Product[]>;
  getById: (id: string) => Promise<Product | null>;
};
