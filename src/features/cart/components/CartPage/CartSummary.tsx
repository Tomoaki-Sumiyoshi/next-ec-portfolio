import { Button, Divider, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconReceipt2 } from '@tabler/icons-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';

type Props = {
  totalPrice: number;
};

export default function CartSummary({ totalPrice }: Props) {
  return (
    <Paper>
      <Stack gap="md">
        <Group gap="sm">
          <ThemeIcon variant="light" color="brand" size={40} radius="xl">
            <IconReceipt2 size={20} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text fw={700}>ご請求サマリー</Text>
            <Text size="sm" c="dimmed">
              購入予定の商品と金額を確認できます。
            </Text>
          </Stack>
        </Group>

        <Divider />

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            小計
          </Text>
          <Text fw={700}>{totalPrice.toLocaleString()}円</Text>
        </Group>

        <Button fullWidth component={Link} href={ROUTES.checkout} color="brand">
          購入手続きへ進む
        </Button>

        <Button fullWidth variant="default" component={Link} href={ROUTES.home}>
          商品一覧へ戻る
        </Button>
      </Stack>
    </Paper>
  );
}
