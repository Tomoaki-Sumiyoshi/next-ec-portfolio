'use client';

import {
  Card,
  Stack,
  Title,
  Group,
  Box,
  Divider,
  Text,
  Image,
} from '@mantine/core';
import { useMemo } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { Product } from '@/features/products/types/product';

type Props = {
  productList: Product[];
};

const POSTAGE = 500;
const TAX_RATE = 0.1;

export default function RightSummary({ productList }: Props) {
  const getQuantity = useCartStore((s) => s.getQuantity);

  const subtotalPrice = useMemo(() => {
    return productList.reduce(
      (sum, r) => sum + r.price * (getQuantity(r.id) ?? 0),
      0,
    );
  }, [productList, getQuantity]);

  const consumptionTax = useMemo(() => {
    return subtotalPrice * TAX_RATE;
  }, [subtotalPrice]);

  const totalPrice = useMemo(() => {
    return subtotalPrice + POSTAGE + consumptionTax;
  }, [subtotalPrice, consumptionTax]);

  return (
    <Card withBorder radius="md">
      <Stack gap="md">
        <Title order={4}>注文サマリ</Title>
        <Stack gap="sm">
          {productList.map((product) => (
            <Card key={product.id} withBorder radius="md" padding="sm">
              <Group align="flex-start" wrap="nowrap">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  w={72}
                  h={72}
                  radius="sm"
                  fit="cover"
                />
                <Box>
                  <Group justify="space-between" align="flex-start">
                    <Box>
                      <Text fw={600} lineClamp={1}>
                        {product.name}
                      </Text>
                      <Text size="sm" c="dimmed" mt={4}>
                        数量: {getQuantity(product.id)}
                      </Text>
                    </Box>
                    <Text fw={600}>
                      {(
                        product.price * getQuantity(product.id)
                      ).toLocaleString()}
                    </Text>
                  </Group>
                </Box>
              </Group>
            </Card>
          ))}
        </Stack>

        <Divider />

        <Stack gap={6}>
          <Group justify="space-between">
            <Text c="dimmed">小計</Text>
            <Text>{subtotalPrice.toLocaleString()}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">送料</Text>
            <Text>{POSTAGE.toLocaleString()}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">消費税（目安）</Text>
            <Text>{consumptionTax.toLocaleString()}</Text>
          </Group>
          <Divider />
          <Group justify="space-between">
            <Text fw={700}>合計</Text>
            <Text fw={700}>{totalPrice.toLocaleString()}</Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
