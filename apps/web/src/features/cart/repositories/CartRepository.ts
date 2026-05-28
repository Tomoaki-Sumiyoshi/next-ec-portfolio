import type { Cart } from '../types/cart';

export interface CartRepository {
  get(): Promise<Cart>;
  set(cart: Cart): Promise<Cart>;
  clear(): Promise<Cart>;

  addItem(productId: string): Promise<Cart>;
  updateQuantity(productId: string, quantity: number): Promise<Cart>;
  removeItem(productId: string): Promise<Cart>;
}
