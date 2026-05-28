import type { CartRepository } from '@/features/cart/repositories/CartRepository';
import { LocalStorageCartRepository } from '@/features/cart/repositories/LocalStorageCartRepository';
import { CheckoutRepository } from '@/features/checkout/repositories/CheckoutRepository';
import { SessionStorageCheckoutRepository } from '@/features/checkout/repositories/SessionStorageCheckoutRepository';
import { LocalStorageOrderRepository } from '@/features/order/repositories/LocalStorageOrderRepository';
import { OrderRepository } from '@/features/order/repositories/OrderRepository';
import { JsonProductRepository } from '@/features/products/repositories/JsonProductRepository';
import { ProductRepository } from '@/features/products/repositories/ProductRepository';

let productRepo: ProductRepository | null = null;
let cartRepo: CartRepository | null = null;
let checkoutRepo: CheckoutRepository | null = null;
let orderRepo: OrderRepository | null = null;

export function getProductRepository(): ProductRepository {
  if (!productRepo) productRepo = new JsonProductRepository();
  return productRepo;
}

export function getCartRepository(): CartRepository {
  if (!cartRepo) cartRepo = new LocalStorageCartRepository();
  return cartRepo;
}

export function getCheckoutRepository(): CheckoutRepository {
  if (!checkoutRepo) checkoutRepo = new SessionStorageCheckoutRepository();
  return checkoutRepo;
}

export function getOrderRepository(): OrderRepository {
  if (!orderRepo) orderRepo = new LocalStorageOrderRepository();
  return orderRepo;
}
