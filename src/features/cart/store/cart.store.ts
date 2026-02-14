import { create } from 'zustand';

import { getCartRepository } from '@/shared/lib/repository/di';

import type { Cart } from '../types/cart';

type CartState = {
  cart: Cart;
  initialized: boolean;

  // derived
  totalQuantity: () => number;

  // lifecycle
  init: () => Promise<void>;

  // actions
  getQuantity: (productId: string) => number;
  addItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: {},
  initialized: false,

  totalQuantity: () =>
    Object.values(get().cart).reduce((sum, quantity) => sum + quantity, 0),

  init: async () => {
    const repo = getCartRepository();
    const cart = await repo.get();
    set({ cart, initialized: true });
  },

  refresh: async () => {
    const repo = getCartRepository();
    const cart = await repo.get();
    set({ cart });
  },

  getQuantity: (productId) => {
    const cart = get().cart;
    return cart[productId] ?? 0;
  },

  addItem: async (productId) => {
    const repo = getCartRepository();
    const cart = await repo.addItem(productId);
    set({ cart });
  },

  updateQuantity: async (productId, quantity) => {
    const repo = getCartRepository();
    const cart = await repo.updateQuantity(productId, quantity);
    set({ cart });
  },

  removeItem: async (productId) => {
    const repo = getCartRepository();
    const cart = await repo.removeItem(productId);
    set({ cart });
  },

  clear: async () => {
    const repo = getCartRepository();
    const cart = await repo.clear();
    set({ cart });
  },
}));
