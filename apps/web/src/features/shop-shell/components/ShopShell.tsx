'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import UserInitializer from '@/features/user/components/UserInitializer';
import {
  APP_HEADER_HEIGHT,
  APP_NAVBAR_WIDTH,
} from '@/shared/constants/layout';

import ShopHeader from './ShopHeader';
import ShopNavbar from './ShopNavbar';
import styles from './ShopShell.module.scss';

export default function ShopShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <UserInitializer />

      <AppShell
        header={{ height: APP_HEADER_HEIGHT }}
        navbar={{
          width: APP_NAVBAR_WIDTH,
          breakpoint: 'md',
          collapsed: { mobile: !opened },
        }}
        padding={{ base: 'sm', sm: 'md', lg: 'lg' }}
      >
        <ShopHeader opened={opened} onToggle={toggle} />

        <ShopNavbar onNavigate={close} />

        <AppShell.Main className={styles.main}>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}
