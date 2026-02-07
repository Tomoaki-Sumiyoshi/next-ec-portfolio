'use client';

import { Anchor, AppShellHeader, Burger, Group, Image } from '@mantine/core';

import CartIcon from '../../cart/components/CartIcon';

type Props = {
  opened: boolean;
  onToggle: () => void;
};

export default function ShopHeader({ opened, onToggle }: Props) {
  return (
    <AppShellHeader>
      <Group h="100%" px="md" justify="space-between">
        {/* Left: burger + logo */}
        <Group gap="sm">
          <Burger
            opened={opened}
            onClick={onToggle}
            hiddenFrom="sm"
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
        <CartIcon count={1} />
      </Group>
    </AppShellHeader>
  );
}
