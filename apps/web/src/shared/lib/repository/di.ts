import type { CartRepository } from '@/features/cart/repositories/CartRepository';
import { LocalStorageCartRepository } from '@/features/cart/repositories/LocalStorageCartRepository';
import { CheckoutRepository } from '@/features/checkout/repositories/CheckoutRepository';
import { SessionStorageCheckoutRepository } from '@/features/checkout/repositories/SessionStorageCheckoutRepository';
import { ApiOrderRepository } from '@/features/order/repositories/ApiOrderRepository';
import { OrderRepository } from '@/features/order/repositories/OrderRepository';
import { ApiProductRepository } from '@/features/products/repositories/ApiProductRepository';
import { ProductRepository } from '@/features/products/repositories/ProductRepository';
import { LocalStorageUserRepository } from '@/features/user/repositories/LocalStorageUserRepository';
import type { UserRepository } from '@/features/user/repositories/UserRepository';

let productRepo: ProductRepository | null = null;
let cartRepo: CartRepository | null = null;
let checkoutRepo: CheckoutRepository | null = null;
let orderRepo: OrderRepository | null = null;
let userRepo: UserRepository | null = null;

export function getProductRepository(): ProductRepository {
  if (!productRepo) productRepo = new ApiProductRepository();
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
  if (!orderRepo) orderRepo = new ApiOrderRepository();
  return orderRepo;
}

export function getUserRepository(): UserRepository {
  if (!userRepo) userRepo = new LocalStorageUserRepository();
  return userRepo;
}
