'use client';

import { ActionIcon } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect } from 'react';

import styles from './CartIcon.module.scss';
import { useCartStore } from '../../store/cart.store';

export default function CartIcon() {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const init = useCartStore((state) => state.init);
  const initialized = useCartStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) init();
  }, [initialized, init]);

  // 表示ロジック
  if (totalQuantity <= 0) {
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

  const label = totalQuantity > 9 ? '9+' : String(totalQuantity);

  return (
    <ActionIcon
      component={Link}
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
