'use client';

import { ActionIcon } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';

import styles from './CartIcon.module.scss';

type Props = {
  count?: number;
};

export default function CartIcon({ count = 1 }: Props) {
  // 表示ロジック
  if (count <= 0) {
    return (
      <ActionIcon
        component="a"
        href="/cart"
        variant="subtle"
        size="lg"
        aria-label="cart"
      >
        <IconShoppingCart size={20} />
      </ActionIcon>
    );
  }

  const label = count > 9 ? '9+' : String(count);

  return (
    <ActionIcon
      component="a"
      href="/cart"
      variant="subtle"
      size="lg"
      aria-label="cart"
      className={styles.cartActionIconOverride}
    >
      <span className={styles.wrapper}>
        <IconShoppingCart size={20} />
        <span className={styles.badge}>{label}</span>
      </span>
    </ActionIcon>
  );
}
