'use client';

import { Box, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { OrderItem } from '@/features/order/types/order';
import { Product } from '@/features/products/types/product';
import { getProductById } from '@/features/products/usecases/getProductById';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import styles from './OrderItemCard.module.scss';

type Props = {
  checkoutItem: OrderItem;
};

export default function OrderItemCard({ checkoutItem }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setErrorMessage('');
        const currentProduct = await getProductById(checkoutItem.productId);
        setProduct(currentProduct);
      } catch (error) {
        setProduct(null);
        setErrorMessage(
          getErrorMessage(
            error,
            '商品情報を取得できなかったため、注文時点の情報のみ表示しています。'
          )
        );
      }
    })();
  }, [checkoutItem.productId]);

  return (
    <Group justify="space-between" align="flex-start">
      <Box className={styles.content}>
        <Text fw={600} lineClamp={1}>
          {product?.name ?? '商品名を取得できませんでした'}
        </Text>
        <Text size="sm" c="dimmed">
          数量: {checkoutItem.quantity}
        </Text>
        {errorMessage && (
          <Text size="xs" c="red">
            {errorMessage}
          </Text>
        )}
      </Box>
      <Text fw={600}>{checkoutItem.marketPrice.toLocaleString()}円</Text>
    </Group>
  );
}
