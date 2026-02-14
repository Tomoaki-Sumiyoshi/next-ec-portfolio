import { getProductRepository } from '@/shared/lib/repository/di';

import type { Product } from '../types/product';

export async function getProductList(): Promise<Product[]> {
  const map = await getProductRepository().getMap();
  return Object.values(map);
}
