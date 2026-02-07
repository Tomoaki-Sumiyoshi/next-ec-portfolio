'use client';

import { useEffect } from 'react';

import { useProductsStore } from '@/features/products/store/useProductsStore';

import ProductsView from './ProductsView';

export default function HomePageClient() {
  const fetchProducts = useProductsStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return <ProductsView />;
}
