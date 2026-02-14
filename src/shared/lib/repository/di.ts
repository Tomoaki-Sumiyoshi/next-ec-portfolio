import type { CartRepository } from '@/features/cart/repositories/CartRepository';
import { LocalStorageCartRepository } from '@/features/cart/repositories/LocalStorageCartRepository';

let cartRepo: CartRepository | null = null;

export function getCartRepository(): CartRepository {
  if (!cartRepo) cartRepo = new LocalStorageCartRepository();
  return cartRepo;
}
