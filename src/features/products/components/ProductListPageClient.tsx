'use client';

import { Container, SimpleGrid, Text } from '@mantine/core';

import ProductCardItem from './ProductCardItem';
import ProductDetailModal from './ProductDetailModal';
import { Product } from '../types/product';

type Props = {
  productList: Product[];
};

export default function ProductListPageClient({ productList }: Props) {
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
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
          {productList.map((product) => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>
      <ProductDetailModal />
    </>
  );
}
