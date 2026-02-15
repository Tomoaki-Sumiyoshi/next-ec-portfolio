import { getProductRepository } from '@/shared/lib/repository/di';

import type { Product } from '../types/product';

export async function getProductList(): Promise<Product[]> {
  return getProductRepository().list();
}
