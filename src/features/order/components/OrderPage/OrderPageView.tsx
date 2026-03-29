'use client';

import { Alert, Text } from '@mantine/core';
import { IconReceiptOff } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';

import { clearCheckout } from '@/features/checkout/usecase/clearCheckout';
import { getCheckout } from '@/features/checkout/usecase/getCheckout';
import { Order } from '@/features/order/types/order';
import { getOrderList } from '@/features/order/usecase/getOrderList';
import EmptyState from '@/shared/components/EmptyState';

import OrderHistoryList from './OrderHistoryList';

export default function OrderPageView() {
  const [orderList, setOrderList] = useState<Order[] | null>(null);
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [checkoutOrderId, savedOrders] = await Promise.all([
        getCheckout(),
        getOrderList(),
      ]);

      if (checkoutOrderId) {
        setLatestOrderId(checkoutOrderId);
        await clearCheckout();
      }

      const sortedOrders = [...savedOrders].sort(
        (leftOrder, rightOrder) =>
          new Date(rightOrder.createdAt).getTime() -
          new Date(leftOrder.createdAt).getTime()
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
      <EmptyState
        title="注文履歴がありません"
        description="購入が完了すると、この画面に注文内容が表示されます。"
        icon={<IconReceiptOff size={26} />}
      />
    );
  }

  return (
    <>
      {latestOrder && (
        <Alert title="決済が完了しました" color="green">
          最新の注文内容をこの画面で確認できます。
        </Alert>
      )}

      <OrderHistoryList orderList={orderList} latestOrderId={latestOrderId} />
    </>
  );
}
