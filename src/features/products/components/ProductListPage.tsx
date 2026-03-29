'use client';

import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';

import { Product } from '@/features/products/types/product';
import { getProductList } from '@/features/products/usecases/getProductList';

import ProductDetailModal from './ProductDetailModal';
import ProductGrid from './ProductGrid';
import ProductListEmptyState from './ProductListEmptyState';

export default function ProductListPage() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedProducts = await getProductList();
      setProductList(fetchedProducts);
    })();
  }, []);

  if (productList.length === 0) {
    return (
      <>
        <Container py={{ base: 'sm', sm: 'md' }} size="xl">
          <ProductListEmptyState />
        </Container>
        <ProductDetailModal />
      </>
    );
  }

  return (
    <>
      <Container py={{ base: 'sm', sm: 'md' }} size="xl">
        <ProductGrid productList={productList} />
      </Container>
      <ProductDetailModal />
    </>
  );
}
