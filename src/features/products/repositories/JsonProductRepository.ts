import rawProductList from '@/data/products.json';

import { ProductArraySchema } from '../schemas/product.schema';

import type { ProductRepository } from './ProductRepository';
import type { Product } from '../types/product';

export class JsonProductRepository implements ProductRepository {
  private readonly productList: Product[];

  constructor() {
    const parsedProductList = ProductArraySchema.parse(rawProductList);
    this.productList = parsedProductList;
  }

  async list(): Promise<Product[]> {
    return this.productList;
  }

  async getById(id: string): Promise<Product | null> {
    return this.productList.find((product) => product.id === id) ?? null;
  }

  async getByIds(productIds: string[]): Promise<Product[]> {
    if (productIds.length === 0) {
      return [];
    }

    return this.productList.filter((product) =>
      productIds.includes(product.id)
    );
  }
}
