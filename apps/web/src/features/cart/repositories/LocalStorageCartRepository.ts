import { CartSchema } from '../schemas/cart.schema';

import type { CartRepository } from './CartRepository';
import type { Cart } from '../types/cart';

const STORAGE_KEY = 'portfolio_ec_cart';

function readStorage(): Cart {
  if (typeof window === 'undefined') {
    return {};
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return CartSchema.parse(parsed);
  } catch {
    return {};
  }
}

function writeStorage(cart: Cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export class LocalStorageCartRepository implements CartRepository {
  async get(): Promise<Cart> {
    return readStorage();
  }

  async set(cart: Cart): Promise<Cart> {
    writeStorage(CartSchema.parse(cart));
    return cart;
  }

  async clear(): Promise<Cart> {
    writeStorage({});
    return {};
  }

  async addItem(productId: string): Promise<Cart> {
    const cart = readStorage();

    const nextQuantities = cart[productId] ?? 0 + 1;

    if (nextQuantities <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = nextQuantities;
    }

    writeStorage(cart);
    return cart;
  }

  async updateQuantity(productId: string, quantity: number): Promise<Cart> {
    const cart = readStorage();

    if (quantity <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = quantity;
    }

    writeStorage(cart);
    return cart;
  }

  async removeItem(productId: string): Promise<Cart> {
    const cart = readStorage();
    delete cart[productId];
    writeStorage(cart);
    return cart;
  }
}
