'use client';

import { Anchor, AppShell, Burger, Group, Paper, Text } from '@mantine/core';
import Link from 'next/link';

import { CartIcon } from '@/features/cart/components/CartIcon';
import { ROUTES } from '@/shared/constants/routes';

import styles from './ShopHeader.module.scss';

type Props = {
  opened: boolean;
  onToggle: () => void;
};

export default function ShopHeader({ opened, onToggle }: Props) {
  return (
    <AppShell.Header className={styles.header}>
      <Group h="100%" px="lg" justify="space-between">
        <Group gap="sm">
          <Burger
            opened={opened}
            onClick={onToggle}
            hiddenFrom="md"
            size="sm"
          />

          <Anchor component={Link} href={ROUTES.home} underline="never">
            <Paper py={8} px="sm" radius="xl" bg="white">
              <Text fw={800} c="brand.7" lh={1}>
                PORTFOLIO EC
              </Text>
            </Paper>
          </Anchor>
        </Group>

        <CartIcon />
      </Group>
    </AppShell.Header>
  );
}
