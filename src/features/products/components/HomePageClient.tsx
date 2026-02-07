'use client';

import { Suspense, useEffect } from 'react';

import { useProductsStore } from '@/features/products/store/useProductsStore';

import ProductDetailModal from './ProductDetailModal';
import ProductsView from './ProductsView';

export default function HomePageClient() {
  const fetchProducts = useProductsStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <ProductsView />
      <Suspense fallback={null}>
        <ProductDetailModal />
      </Suspense>
    </>
  );
}
