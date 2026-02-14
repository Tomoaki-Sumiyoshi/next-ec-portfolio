import type { Product, ProductMap } from '../types/product';

export interface ProductRepository {
  getMap(): Promise<ProductMap>;
  getById(id: string): Promise<Product | null>;
  getMapByIds(ids: string[]): Promise<ProductMap>;
}
