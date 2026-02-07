import { create } from 'zustand';

import {
  ProductSchema,
  type Product,
} from '@/features/products/domain/product.schema';

type State = {
  product: Product | null;
  isLoading: boolean;
  errorMessage: string | null;

  fetchById: (id: string) => Promise<void>;
  reset: () => void;
};

export const useProductDetailStore = create<State>()((set) => ({
  product: null,
  isLoading: false,
  errorMessage: null,

  reset: () => set({ product: null, isLoading: false, errorMessage: null }),

  fetchById: async (id) => {
    set({ isLoading: true, errorMessage: null });

    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
        cache: 'no-store',
      });

      if (res.status === 404) {
        set({
          product: null,
          isLoading: false,
          errorMessage: '商品が見つかりません',
        });
        return;
      }
      if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);

      const json = await res.json();
      const product = ProductSchema.parse(json); // Zod validate

      set({ product, isLoading: false });
    } catch (e) {
      set({
        product: null,
        isLoading: false,
        errorMessage: e instanceof Error ? e.message : 'Unknown error',
      });
    }
  },
}));
