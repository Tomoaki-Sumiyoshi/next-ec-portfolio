'use client';

import { Container, SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { Product } from '../types/product';
import { getProductList } from '../usecases/getProductList';

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
          <Text c="dimmed">商品がありません</Text>
        </Container>
        <ProductDetailModal />
      </>
    );
  }

  return (
    <>
      <Container py={{ base: 'sm', sm: 'md' }} size="xl">
        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 3, xl: 4 }}
          spacing={{ base: 'sm', sm: 'md' }}
        >
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>
      <ProductDetailModal />
    </>
  );
}
