import { getProductRepository } from '@/shared/lib/repository/di';

import type { Product } from '../types/product';

export async function getProductListByIds(ids: string[]): Promise<Product[]> {
  return getProductRepository().getByIds(ids);
}
