'use client';

import { Box, Card, Stack, Divider, Group, Anchor, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { clearCheckout } from '@/features/checkout/usecase/clearCheckout';
import { getCheckout } from '@/features/checkout/usecase/getCheckout';
import { Order } from '@/features/order/types/order';
import { getOrderById } from '@/features/order/usecase/getOrderById';

import CheckoutItemCard from './CheckoutItemCard';

const POSTAGE = 500;
const TAX_RATE = 0.1;

export default function CheckoutCompletePageView() {
  const router = useRouter();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    (async () => {
      const sessionId = await getCheckout();
      await clearCheckout();
      if (!sessionId) {
        router.push('/');
        return;
      }

      const checkoutOrder = await getOrderById(sessionId);
      if (!checkoutOrder) {
        router.push('/');
        return;
      }

      setOrder(checkoutOrder);
    })();
  }, [router]);

  const subtotalPrice = useMemo(() => {
    return (
      order?.itemList.reduce((sum, r) => sum + r.marketPrice * r.quantity, 0) ??
      0
    );
  }, [order]);

  const consumptionTax = useMemo(() => {
    return subtotalPrice * TAX_RATE;
  }, [subtotalPrice]);

  const totalPrice = useMemo(() => {
    return subtotalPrice + POSTAGE + consumptionTax;
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
          <>
            <Text c="dimmed">
              注文日時: {new Date(order.createdAt).toLocaleString('ja-JP')}
            </Text>

            <Divider />

            <Stack gap="xs">
              {order.itemList.map((item) => (
                <CheckoutItemCard key={item.productId} checkoutItem={item} />
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
          </>

          <Group justify="space-between" mt="sm">
            <Anchor href="/" component={Link}>
              トップへ戻る
            </Anchor>
          </Group>
        </Stack>
      </Card>
    </Box>
  );
}
