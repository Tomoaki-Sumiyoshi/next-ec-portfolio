import { Button, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';

import styles from './CartPage.module.scss';

export default function CartEmptyState() {
  return (
    <Stack
      align="center"
      justify="center"
      gap="md"
      py={48}
      bg="white"
      bd="1px solid var(--mantine-color-gray-2)"
      className={styles.emptyState}
    >
      <ThemeIcon size={56} radius="xl" variant="light" color="brand">
        <IconShoppingCart size={26} />
      </ThemeIcon>
      <Stack gap={4} align="center">
        <Text fw={700}>カートは空です</Text>
        <Text size="sm" c="dimmed">
          商品を追加すると、ここに購入予定の商品が表示されます。
        </Text>
      </Stack>
      <Button component={Link} href={ROUTES.home}>
        商品一覧へ戻る
      </Button>
    </Stack>
  );
}
