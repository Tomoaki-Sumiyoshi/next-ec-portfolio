'use client';

import { Box, Card, Group, Image, Text } from '@mantine/core';

import { useCartStore } from '@/features/cart/store/cart.store';
import { Product } from '@/features/products/types/product';

type Props = {
  product: Product;
};

export default function CheckoutSummaryItemCard({ product }: Props) {
  const quantity = useCartStore((cartState) =>
    cartState.getQuantity(product.id)
  );

  return (
    <Card padding="sm" radius="lg" bg="gray.0">
      <Group align="flex-start" wrap="nowrap">
        <Image
          src={product.imageUrl}
          alt={product.name}
          w={72}
          h={72}
          radius="md"
          fit="cover"
        />

        <Box flex={1}>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Box>
              <Text fw={600} lineClamp={1}>
                {product.name}
              </Text>
              <Text size="sm" c="dimmed" mt={4}>
                数量: {quantity}
              </Text>
            </Box>

            <Text fw={700}>{(product.price * quantity).toLocaleString()}円</Text>
          </Group>
        </Box>
      </Group>
    </Card>
  );
}
