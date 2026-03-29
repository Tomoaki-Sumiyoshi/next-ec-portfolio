'use client';

import { ActionIcon, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { ROUTES } from '@/shared/constants/routes';

import { useCartStore } from '../../store/cart.store';

export default function CartIcon() {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const init = useCartStore((state) => state.init);
  const initialized = useCartStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) init();
  }, [initialized, init]);

  if (totalQuantity <= 0) {
    return (
      <ActionIcon
        component={Link}
        href={ROUTES.cart}
        variant="light"
        color="brand"
        size="xl"
        aria-label="cart"
      >
        <IconShoppingCart size={20} />
      </ActionIcon>
    );
  }

  const label = totalQuantity > 9 ? '9+' : String(totalQuantity);

  return (
    <Indicator
      inline
      label={label}
      size={18}
      offset={6}
      color="red.6"
      processing={false}
    >
      <ActionIcon
        component={Link}
        href={ROUTES.cart}
        variant="light"
        color="brand"
        size="xl"
        aria-label="cart"
      >
        <IconShoppingCart size={20} />
      </ActionIcon>
    </Indicator>
  );
}
