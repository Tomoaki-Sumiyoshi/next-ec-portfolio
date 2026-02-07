'use client';

import { Container, Text } from '@mantine/core';

import { useProductsStore } from '@/features/products/store/useProductsStore';

import ProductsGrid from './ProductsGrid';

export default function ProductsView() {
  const products = useProductsStore((s) => s.products);
  const isLoading = useProductsStore((s) => s.isLoading);
  const errorMessage = useProductsStore((s) => s.errorMessage);

  if (isLoading) {
    return (
      <Container py="md">
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container py="md">
        <Text c="red">{errorMessage}</Text>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container py="md">
        <Text c="dimmed">商品がありません</Text>
      </Container>
    );
  }

  return (
    <Container py="md">
      <ProductsGrid products={products} />
    </Container>
  );
}
