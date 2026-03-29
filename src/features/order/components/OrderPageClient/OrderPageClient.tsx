'use client';

import { Divider, Group, Title } from '@mantine/core';

import OrderPageView from './OrderPageView';

export default function OrderPageClient() {
  return (
    <>
      <Group justify="space-between" align="flex-end">
        <Title order={2}>注文履歴</Title>
      </Group>

      <Divider my="md" />

      <OrderPageView />
    </>
  );
}
