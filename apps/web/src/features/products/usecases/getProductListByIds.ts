import { getProductRepository } from '@/shared/lib/repository/di';

import type { Product } from '../types/product';

export async function getProductListByIds(
  productIds: string[]
): Promise<Product[]> {
  return getProductRepository().getByIds(productIds);
}
