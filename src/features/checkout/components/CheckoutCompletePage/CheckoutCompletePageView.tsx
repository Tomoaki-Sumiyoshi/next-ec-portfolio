'use client';

import { Anchor, Box, Card, Divider, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { clearCheckout } from '@/features/checkout/usecase/clearCheckout';
import { getCheckout } from '@/features/checkout/usecase/getCheckout';
import { Order } from '@/features/order/types/order';
import { getOrderById } from '@/features/order/usecase/getOrderById';
import { SHIPPING_FEE, TAX_RATE } from '@/shared/constants/commerce';
import { ROUTES } from '@/shared/constants/routes';

import OrderItemCard from './OrderItemCard';

export default function CheckoutCompletePageView() {
  const router = useRouter();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    (async () => {
      const sessionId = await getCheckout();
      await clearCheckout();
      if (!sessionId) {
        router.push(ROUTES.home);
        return;
      }

      const checkoutOrder = await getOrderById(sessionId);
      if (!checkoutOrder) {
        router.push(ROUTES.home);
        return;
      }

      setOrder(checkoutOrder);
    })();
  }, [router]);

  const subtotalPrice = useMemo(() => {
    return (
      order?.itemList.reduce((sum, item) => sum + item.marketPrice * item.quantity, 0) ??
      0
    );
  }, [order]);

  const consumptionTax = useMemo(() => {
    return subtotalPrice * TAX_RATE;
  }, [subtotalPrice]);

  const totalPrice = useMemo(() => {
    return subtotalPrice + SHIPPING_FEE + consumptionTax;
  }, [subtotalPrice, consumptionTax]);

  if (!order) {
    return (
      <Text size="sm" mt="sm">
        読み込み中...
      </Text>
    );
  }

  return (
    <Box>
      <Card withBorder radius="md">
        <Stack gap="md">
          <Text c="dimmed">
            注文日時: {new Date(order.createdAt).toLocaleString('ja-JP')}
          </Text>

          <Divider />

          <Stack gap="xs">
            {order.itemList.map((item) => (
              <OrderItemCard key={item.productId} checkoutItem={item} />
            ))}
          </Stack>

          <Divider />

          <Stack gap={6}>
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

          <Group justify="space-between" mt="sm">
            <Anchor href={ROUTES.home} component={Link}>
              トップへ戻る
            </Anchor>
          </Group>
        </Stack>
      </Card>
    </Box>
  );
}
