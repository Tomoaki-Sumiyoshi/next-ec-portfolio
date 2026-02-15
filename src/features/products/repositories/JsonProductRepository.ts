import rawProductList from '@/data/products.json';

import { ProductArraySchema } from '../schemas/product.schema';

import type { ProductRepository } from './ProductRepository';
import type { Product } from '../types/product';

export class JsonProductRepository implements ProductRepository {
  private readonly productList: Product[];

  constructor() {
    const data = ProductArraySchema.parse(rawProductList);
    this.productList = data;
  }

  async list(): Promise<Product[]> {
    return this.productList;
  }

  async getById(id: string): Promise<Product | null> {
    return this.productList.find((product) => product.id === id) ?? null;
  }

  async getByIds(ids: string[]): Promise<Product[]> {
    if (ids.length === 0) {
      return [];
    }

    return this.productList.filter((product) => ids.includes(product.id));
  }
}
