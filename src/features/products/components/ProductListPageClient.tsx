'use client';

import { Container, SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import ProductCardItem from './ProductCardItem';
import ProductDetailModal from './ProductDetailModal';
import { Product } from '../types/product';
import { getProductList } from '../usecases/getProductList';

export default function ProductListPageClient() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProductList();
      setProductList(data);
    })();
  }, []);

  if (productList.length === 0) {
    return (
      <>
        <Container py="md">
          <Text c="dimmed">商品がありません</Text>
        </Container>
        <ProductDetailModal />
      </>
    );
  }

  return (
    <>
      <Container py="md">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          {productList.map((product) => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>
      <ProductDetailModal />
    </>
  );
}
