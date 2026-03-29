'use client';

import {
  Alert,
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';

import OrderItemCard from '@/features/checkout/components/CheckoutCompletePage/OrderItemCard';
import { clearCheckout } from '@/features/checkout/usecase/clearCheckout';
import { getCheckout } from '@/features/checkout/usecase/getCheckout';
import { Order } from '@/features/order/types/order';
import { getOrderList } from '@/features/order/usecase/getOrderList';
import { SHIPPING_FEE, TAX_RATE } from '@/shared/constants/commerce';

import styles from './OrderPageView.module.scss';

function getPriceSummary(order: Order) {
  const subtotalPrice = order.itemList.reduce(
    (sum, item) => sum + item.marketPrice * item.quantity,
    0
  );
  const consumptionTax = subtotalPrice * TAX_RATE;
  const totalPrice = subtotalPrice + SHIPPING_FEE + consumptionTax;

  return {
    subtotalPrice,
    consumptionTax,
    totalPrice,
  };
}

export default function OrderPageView() {
  const [orderList, setOrderList] = useState<Order[] | null>(null);
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [checkoutOrderId, orders] = await Promise.all([
        getCheckout(),
        getOrderList(),
      ]);

      if (checkoutOrderId) {
        setLatestOrderId(checkoutOrderId);
        await clearCheckout();
      }

      const sortedOrders = [...orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setOrderList(sortedOrders);
    })();
  }, []);

  const latestOrder = useMemo(() => {
    if (!orderList || !latestOrderId) {
      return null;
    }

    return orderList.find((order) => order.id === latestOrderId) ?? null;
  }, [latestOrderId, orderList]);

  if (!orderList) {
    return (
      <Text size="sm" mt="sm">
        読み込み中...
      </Text>
    );
  }

  if (orderList.length === 0) {
    return (
      <Card>
        <Alert title="注文履歴がありません" color="gray">
          購入が完了すると、この画面に注文内容が表示されます。
        </Alert>
      </Card>
    );
  }

  return (
    <Stack gap="md">
      {latestOrder && (
        <Alert title="決済が完了しました" color="green">
          最新の注文内容をこの画面で確認できます。
        </Alert>
      )}

      {orderList.map((order) => {
        const { subtotalPrice, consumptionTax, totalPrice } =
          getPriceSummary(order);
        const isLatestOrder = order.id === latestOrderId;

        return (
          <Card key={order.id}>
            <Stack gap="md">
              <Group
                justify="space-between"
                align="flex-start"
                wrap="wrap"
                className={styles.cardHeader}
              >
                <Box className={styles.orderInfo}>
                  <Group gap="xs">
                    <Text fw={700} className={styles.orderId}>
                      注文番号: {order.id}
                    </Text>
                    {isLatestOrder && <Badge color="green">最新の注文</Badge>}
                  </Group>
                  <Text size="sm" c="dimmed">
                    注文日時: {new Date(order.createdAt).toLocaleString('ja-JP')}
                  </Text>
                </Box>
              </Group>

              <Divider />

              <Stack gap={4}>
                <Text fw={600}>お届け先</Text>
                <Text size="sm">
                  {order.customer.fullName} / {order.customer.email}
                </Text>
                <Text size="sm" className={styles.address}>
                  〒{order.shippingAddress.postCode}{' '}
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2
                    ? ` ${order.shippingAddress.addressLine2}`
                    : ''}
                </Text>
              </Stack>

              <Divider />

              <Stack gap="xs">
                {order.itemList.map((item) => (
                  <OrderItemCard key={item.productId} checkoutItem={item} />
                ))}
              </Stack>

              <Divider />

              <Stack gap={6}>
                <Group justify="space-between" wrap="wrap">
                  <Text c="dimmed">小計</Text>
                  <Text>{subtotalPrice.toLocaleString()}円</Text>
                </Group>
                <Group justify="space-between" wrap="wrap">
                  <Text c="dimmed">送料</Text>
                  <Text>{SHIPPING_FEE.toLocaleString()}円</Text>
                </Group>
                <Group justify="space-between" wrap="wrap">
                  <Text c="dimmed">消費税 (10%)</Text>
                  <Text>{consumptionTax.toLocaleString()}円</Text>
                </Group>
                <Divider />
                <Group justify="space-between" wrap="wrap">
                  <Text fw={700}>合計</Text>
                  <Text fw={700}>{totalPrice.toLocaleString()}円</Text>
                </Group>
              </Stack>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}
