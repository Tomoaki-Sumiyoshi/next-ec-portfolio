import type { CartRepository } from '@/features/cart/repositories/CartRepository';
import { LocalStorageCartRepository } from '@/features/cart/repositories/LocalStorageCartRepository';
import { JsonProductRepository } from '@/features/products/repositories/JsonProductRepository';
import { ProductRepository } from '@/features/products/repositories/ProductRepository';

let productRepo: ProductRepository | null = null;
let cartRepo: CartRepository | null = null;

export function getProductRepository(): ProductRepository {
  if (!productRepo) productRepo = new JsonProductRepository();
  return productRepo;
}

export function getCartRepository(): CartRepository {
  if (!cartRepo) cartRepo = new LocalStorageCartRepository();
  return cartRepo;
}
