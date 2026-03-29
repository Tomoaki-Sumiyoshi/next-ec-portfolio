'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import ShopHeader from './ShopHeader';
import ShopNavbar from './ShopNavbar';
import styles from './ShopShell.module.scss';

export default function ShopShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 280, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding={{ base: 'sm', sm: 'md', lg: 'lg' }}
    >
      <ShopHeader opened={opened} onToggle={toggle} />

      <ShopNavbar onNavigate={close} />

      <AppShell.Main className={styles.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
