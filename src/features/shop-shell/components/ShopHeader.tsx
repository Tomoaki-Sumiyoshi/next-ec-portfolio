'use client';

import { Anchor, AppShell, Burger, Group, Image } from '@mantine/core';

import { CartIcon } from '@/features/cart/components/CartIcon';

type Props = {
  opened: boolean;
  onToggle: () => void;
};

export default function ShopHeader({ opened, onToggle }: Props) {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        {/* Left: burger + logo */}
        <Group gap="sm">
          <Burger
            opened={opened}
            onClick={onToggle}
            hiddenFrom="md"
            size="sm"
          />

          <Anchor href="/" underline="never">
            <Image
              src="https://placehold.co/120x32?text=LOGO"
              alt="logo"
              h={32}
              w="auto"
              fit="contain"
            />
          </Anchor>
        </Group>

        {/* Right: cart */}
        <CartIcon />
      </Group>
    </AppShell.Header>
  );
}
