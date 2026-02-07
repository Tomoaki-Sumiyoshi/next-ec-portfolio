'use client';

import {
  ActionIcon,
  Anchor,
  AppShellHeader,
  Burger,
  Group,
  Image,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';

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
        <ActionIcon
          component="a"
          href="/cart"
          variant="subtle"
          aria-label="cart"
          size="lg"
        >
          <IconShoppingCart size={20} />
        </ActionIcon>
      </Group>
    </AppShellHeader>
  );
}
