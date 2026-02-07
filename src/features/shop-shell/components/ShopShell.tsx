'use client';

import { AppShell, AppShellMain } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import ShopHeader from './ShopHeader';
import ShopNavbar from './ShopNavber';

export default function ShopShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <ShopHeader opened={opened} onToggle={toggle} />

      <ShopNavbar onNavigate={close} />

      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
