import { getProductRepository } from '@/shared/lib/repository/di';

import type { Product } from '../types/product';

export async function getProductById(id: string): Promise<Product | null> {
  return getProductRepository().getById(id);
}
