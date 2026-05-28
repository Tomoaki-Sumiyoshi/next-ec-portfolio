import type { Product } from '../types/product';

export interface ProductRepository {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getByIds(productIds: string[]): Promise<Product[]>;
}
