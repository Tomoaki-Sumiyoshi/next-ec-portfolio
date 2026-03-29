'use client';

import { Group, Box, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { OrderItem } from '@/features/order/types/order';
import { Product } from '@/features/products/types/product';
import { getProductById } from '@/features/products/usecases/getProductById';

type prop = {
  checkoutItem: OrderItem;
};

export default function OrderItemCard({ checkoutItem }: prop) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    (async () => {
      const currentProduct = await getProductById(checkoutItem.productId);
      if (!currentProduct) {
        return;
      }
      setProduct(currentProduct);
    })();
  }, [checkoutItem]);

  return (
    <Group
      key={checkoutItem.productId}
      justify="space-between"
      align="flex-start"
    >
      <Box style={{ minWidth: 0 }}>
        {product && (
          <Text fw={600} lineClamp={1}>
            {product.name}
          </Text>
        )}
        <Text size="sm" c="dimmed">
          数量: {checkoutItem.quantity}
        </Text>
      </Box>
      <Text fw={600}>{checkoutItem.marketPrice.toLocaleString()}</Text>
    </Group>
  );
}
