'use client';

import { Alert, Divider, Group, Title } from '@mantine/core';

import CheckoutCompletePageView from './CheckoutCompletePageView';

export default function CheckoutCompletePageClient() {
  return (
    <>
      <Group justify="space-between" align="flex-end">
        <Title order={2}>注文が完了しました</Title>
        <Alert title="これはポートフォリオ用のダミー決済です" color="gray">
          実際の請求・決済は行われていません。
        </Alert>
      </Group>

      <Divider my="md" />

      <CheckoutCompletePageView />
    </>
  );
}
