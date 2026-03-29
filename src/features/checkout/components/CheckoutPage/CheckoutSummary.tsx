'use client';

import {
  Box,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconReceipt2 } from '@tabler/icons-react';
import { useMemo } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { Product } from '@/features/products/types/product';
import { SHIPPING_FEE } from '@/shared/constants/commerce';
import { calculatePriceSummary } from '@/shared/lib/calculatePriceSummary';

type Props = {
  productList: Product[];
};

export default function CheckoutSummary({ productList }: Props) {
  const getProductQuantity = useCartStore((cartState) =>
    cartState.getQuantity
  );

  const subtotalPrice = useMemo(() => {
    return productList.reduce(
      (sum, product) =>
        sum + product.price * (getProductQuantity(product.id) ?? 0),
      0
    );
  }, [productList, getProductQuantity]);

  const { consumptionTax, totalPrice } = useMemo(() => {
    return calculatePriceSummary(subtotalPrice);
  }, [subtotalPrice]);

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
              内容を確認してから注文を確定します。
            </Text>
          </Stack>
        </Group>

        <Stack gap="sm">
          {productList.map((product) => (
            <Card key={product.id} padding="sm" radius="lg" bg="gray.0">
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
                        数量: {getProductQuantity(product.id)}
                      </Text>
                    </Box>
                    <Text fw={700}>
                      {(
                        product.price * getProductQuantity(product.id)
                      ).toLocaleString()}
                      円
                    </Text>
                  </Group>
                </Box>
              </Group>
            </Card>
          ))}
        </Stack>

        <Divider />

        <Stack gap={8}>
          <Group justify="space-between">
            <Text c="dimmed">小計</Text>
            <Text>{subtotalPrice.toLocaleString()}円</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">送料</Text>
            <Text>{SHIPPING_FEE.toLocaleString()}円</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">消費税 (10%)</Text>
            <Text>{consumptionTax.toLocaleString()}円</Text>
          </Group>
          <Divider />
          <Group justify="space-between">
            <Text fw={700}>合計</Text>
            <Text fw={700}>{totalPrice.toLocaleString()}円</Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
