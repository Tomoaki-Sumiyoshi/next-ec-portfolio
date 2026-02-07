'use client';

import { Card, Image, Text } from '@mantine/core';

import type { Product } from '@/features/products/domain/product.schema';
import { useProductsStore } from '@/features/products/store/useProductsStore';

type Props = {
  product: Product;
};

export default function ProductCardItem({ product }: Props) {
  const setSelectedProductId = useProductsStore((s) => s.setSelectedProductId);

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      style={{ cursor: 'pointer' }}
      onClick={() => setSelectedProductId(product.id)}
    >
      <Card.Section>
        <Image src={product.imageUrl} alt={product.name} height={180} />
      </Card.Section>

      <Text mt="sm" fw={600} lineClamp={1}>
        {product.name}
      </Text>

      <Text size="sm" c="dimmed">
        ¥{product.price}
      </Text>
    </Card>
  );
}
