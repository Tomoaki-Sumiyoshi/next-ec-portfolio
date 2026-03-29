import { Stack } from '@mantine/core';

import { Order } from '@/features/order/types/order';

import OrderHistoryCard from './OrderHistoryCard';

type Props = {
  orderList: Order[];
  latestOrderId: string | null;
};

export default function OrderHistoryList({ orderList, latestOrderId }: Props) {
  return (
    <Stack gap="md">
      {orderList.map((order) => (
        <OrderHistoryCard
          key={order.id}
          order={order}
          isLatestOrder={order.id === latestOrderId}
        />
      ))}
    </Stack>
  );
}
