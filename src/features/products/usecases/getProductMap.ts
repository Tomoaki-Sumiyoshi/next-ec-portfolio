import { getProductRepository } from '@/shared/lib/repository/di';

import type { ProductMap } from '../types/product';

export async function getProductMap(): Promise<ProductMap> {
  return getProductRepository().getMap();
}
