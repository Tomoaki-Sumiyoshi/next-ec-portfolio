import { create } from 'zustand';

import { getCartRepository } from '@/shared/lib/repository/di';

import type { Cart } from '../types/cart';

type CartState = {
  cart: Cart;
  initialized: boolean;

  // derived
  getTotalQuantity: () => number;

  // lifecycle
  initializeCart: () => Promise<void>;

  // actions
  getQuantity: (productId: string) => number;
  addItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: {},
  initialized: false,

  getTotalQuantity: () =>
    Object.values(get().cart).reduce((sum, quantity) => sum + quantity, 0),

  initializeCart: async () => {
    const cartRepository = getCartRepository();
    const storedCart = await cartRepository.get();
    set({ cart: storedCart, initialized: true });
  },

  refreshCart: async () => {
    const cartRepository = getCartRepository();
    const storedCart = await cartRepository.get();
    set({ cart: storedCart });
  },

  getQuantity: (productId) => {
    const currentCart = get().cart;
    return currentCart[productId] ?? 0;
  },

  addItem: async (productId) => {
    const cartRepository = getCartRepository();
    const updatedCart = await cartRepository.addItem(productId);
    set({ cart: updatedCart });
  },

  updateQuantity: async (productId, quantity) => {
    const cartRepository = getCartRepository();
    const updatedCart = await cartRepository.updateQuantity(productId, quantity);
    set({ cart: updatedCart });
  },

  removeItem: async (productId) => {
    const cartRepository = getCartRepository();
    const updatedCart = await cartRepository.removeItem(productId);
    set({ cart: updatedCart });
  },

  clear: async () => {
    const cartRepository = getCartRepository();
    const clearedCart = await cartRepository.clear();
    set({ cart: clearedCart });
  },
}));
