'use client';

import { Card, Divider, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconReceipt2 } from '@tabler/icons-react';
import { useMemo } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { Product } from '@/features/products/types/product';
import PriceSummary from '@/shared/components/PriceSummary';

import CheckoutSummaryItemList from './CheckoutSummaryItemList';

type Props = {
  productList: Product[];
};

export default function CheckoutSummary({ productList }: Props) {
  const getProductQuantity = useCartStore((cartState) => cartState.getQuantity);

  const subtotalPrice = useMemo(() => {
    return productList.reduce(
      (sum, product) =>
        sum + product.price * (getProductQuantity(product.id) ?? 0),
      0
    );
  }, [productList, getProductQuantity]);

  return (
    <Card>
      <Stack gap="md">
        <Group gap="sm">
          <ThemeIcon variant="light" color="brand" size={40} radius="xl">
            <IconReceipt2 size={20} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text fw={700}>注文サマリー</Text>
            <Text size="sm" c="dimmed">
              商品内容と金額を確認してから注文を確定できます。
            </Text>
          </Stack>
        </Group>

        <CheckoutSummaryItemList productList={productList} />

        <Divider />

        <PriceSummary subtotalPrice={subtotalPrice} />
      </Stack>
    </Card>
  );
}
