'use client';

import { Anchor, Box, Card, Divider, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { clearCheckout } from '@/features/checkout/usecase/clearCheckout';
import { getCheckout } from '@/features/checkout/usecase/getCheckout';
import { Order } from '@/features/order/types/order';
import { getOrderById } from '@/features/order/usecase/getOrderById';
import ErrorState from '@/shared/components/ErrorState';
import PriceSummary from '@/shared/components/PriceSummary';
import { ROUTES } from '@/shared/constants/routes';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import OrderItemCard from './OrderItemCard';

export default function CheckoutCompletePageView() {
  const router = useRouter();
  const [order, setOrder] = useState<Order>();
  const [errorMessage, setErrorMessage] = useState('');

  const loadCheckoutOrder = useCallback(async () => {
    try {
      setErrorMessage('');
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
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          '注文完了情報を取得できませんでした。時間をおいて再試行してください。'
        )
      );
    }
  }, [router]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadCheckoutOrder();
    });
  }, [loadCheckoutOrder]);

  const subtotalPrice = useMemo(() => {
    return (
      order?.itemList.reduce(
        (sum, item) => sum + item.marketPrice * item.quantity,
        0
      ) ?? 0
    );
  }, [order]);

  if (errorMessage) {
    return (
      <ErrorState
        description={errorMessage}
        onRetry={() => void loadCheckoutOrder()}
      />
    );
  }

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

          <PriceSummary subtotalPrice={subtotalPrice} />

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
