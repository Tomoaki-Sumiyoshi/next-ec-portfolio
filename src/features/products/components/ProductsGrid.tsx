'use client';

import { SimpleGrid } from '@mantine/core';

import type { Product } from '@/features/products/domain/product.schema';

import ProductCardItem from './ProductCardItem';

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
      {products.map((product) => (
        <ProductCardItem key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
}
