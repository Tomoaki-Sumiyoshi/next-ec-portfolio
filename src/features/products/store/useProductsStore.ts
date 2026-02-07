import { create } from 'zustand';

import {
  ProductsSchema,
  Product,
} from '@/features/products/domain/product.schema';

type ProductsState = {
  // data
  products: Product[];
  selectedProductId: string | null;

  // ui/state
  isLoading: boolean;
  errorMessage: string | null;

  // actions
  setSelectedProductId: (id: string | null) => void;
  fetchProducts: () => Promise<void>;
};

export const useProductsStore = create<ProductsState>()((set) => ({
  products: [],
  selectedProductId: null,

  isLoading: false,
  errorMessage: null,

  setSelectedProductId: (id) => set({ selectedProductId: id }),

  fetchProducts: async () => {
    set({ isLoading: true, errorMessage: null });

    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

      const data = ProductsSchema.parse(await res.json());

      set({ products: data, isLoading: false });
    } catch (e) {
      set({
        isLoading: false,
        errorMessage: e instanceof Error ? e.message : 'Unknown error',
      });
    }
  },
}));
