import { getProductRepository } from '@/shared/lib/repository/di';

import type { ProductMap } from '../types/product';

export async function getProductMapByIds(ids: string[]): Promise<ProductMap> {
  return getProductRepository().getMapByIds(ids);
}
