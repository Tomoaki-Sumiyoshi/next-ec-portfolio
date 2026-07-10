import { API_ENDPOINTS } from '@/shared/api/endpoints';

import { ProductArraySchema } from '../schemas/product.schema';

import type { ProductRepository } from './ProductRepository';
import type { Product } from '../types/product';

export class ApiProductRepository implements ProductRepository {
  async list(): Promise<Product[]> {
    return this.fetchProducts();
  }

  async getById(id: string): Promise<Product | null> {
    const products = await this.getByIds([id]);
    return products[0] ?? null;
  }

  async getByIds(productIds: string[]): Promise<Product[]> {
    if (productIds.length === 0) {
      return [];
    }

    return this.fetchProducts(productIds);
  }

  private async fetchProducts(productIds?: string[]): Promise<Product[]> {
    const searchParams = new URLSearchParams();

    if (productIds && productIds.length > 0) {
      searchParams.set('ids', productIds.join(','));
    }

    const query = searchParams.toString();
    const url = query
      ? `${API_ENDPOINTS.products}?${query}`
      : API_ENDPOINTS.products;

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return ProductArraySchema.parse(await response.json());
  }
}
