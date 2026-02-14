import rawProductList from '@/data/products.json';

import { ProductArraySchema } from '../schemas/product.schema';

import type { ProductRepository } from './ProductRepository';
import type { Product, ProductMap } from '../types/product';

export class JsonProductRepository implements ProductRepository {
  private readonly productMap: ProductMap;

  constructor() {
    const productList = ProductArraySchema.parse(rawProductList);

    const map: ProductMap = {};
    for (const product of productList) {
      // id重複はデータ不整合なので明示的に落とす
      if (map[product.id]) {
        throw new Error(`Duplicate product id: ${product.id}`);
      }
      map[product.id] = product;
    }

    this.productMap = map;
  }

  async getMap(): Promise<ProductMap> {
    return this.productMap;
  }

  async getById(id: string): Promise<Product | null> {
    return this.productMap[id] ?? null;
  }

  async getMapByIds(ids: string[]): Promise<ProductMap> {
    const map: ProductMap = {};

    ids.forEach((id) => {
      const product = this.productMap[id];
      if (product) {
        map[id] = product;
      }
    });

    return map;
  }
}
