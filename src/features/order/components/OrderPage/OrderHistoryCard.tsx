'use client';

import { Badge, Box, Card, Divider, Group, Stack, Text } from '@mantine/core';

import OrderItemCard from '@/features/checkout/components/CheckoutCompletePage/OrderItemCard';
import OrderPriceSummary from '@/features/order/components/OrderPriceSummary';
import { Order } from '@/features/order/types/order';

import styles from './OrderPageView.module.scss';

type Props = {
  order: Order;
  isLatestOrder: boolean;
};

function calculateOrderSubtotal(order: Order): number {
  return order.itemList.reduce(
    (sum, item) => sum + item.marketPrice * item.quantity,
    0
  );
}

export default function OrderHistoryCard({ order, isLatestOrder }: Props) {
  const subtotalPrice = calculateOrderSubtotal(order);

  return (
    <Card>
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
            〒{order.shippingAddress.postCode} {order.shippingAddress.addressLine1}
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

        <OrderPriceSummary subtotalPrice={subtotalPrice} />
      </Stack>
    </Card>
  );
}
