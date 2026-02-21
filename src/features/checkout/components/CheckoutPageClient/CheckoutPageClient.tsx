'use client';

import { Divider, Group, Title } from '@mantine/core';

import CheckoutPageView from './CheckoutPageView';

export default function CheckoutPageClient() {
  return (
    <>
      <Group justify="space-between" align="flex-end">
        <Title order={2}>お支払い</Title>
      </Group>

      <Divider my="md" />

      <CheckoutPageView />
    </>
  );
}
