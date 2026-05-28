'use client';

import { ActionIcon, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { ROUTES } from '@/shared/constants/routes';

import { useCartStore } from '../../store/cart.store';

export default function CartIcon() {
  const totalQuantity = useCartStore((cartState) =>
    cartState.getTotalQuantity()
  );
  const initializeCart = useCartStore((cartState) => cartState.initializeCart);
  const initialized = useCartStore((cartState) => cartState.initialized);

  useEffect(() => {
    if (!initialized) initializeCart();
  }, [initialized, initializeCart]);

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
