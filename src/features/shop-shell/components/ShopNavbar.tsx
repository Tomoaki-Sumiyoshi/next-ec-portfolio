'use client';

import { AppShell, NavLink } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';

import styles from './ShopNavbar.module.scss';

type Props = {
  onNavigate?: () => void;
};

export default function ShopNavbar({ onNavigate }: Props) {
  return (
    <AppShell.Navbar p="md" className={styles.navbar}>
      <NavLink
        component={Link}
        href={ROUTES.order}
        label="注文履歴"
        leftSection={<IconHistory size={16} />}
        onClick={onNavigate}
        variant="light"
        color="brand"
        className={styles.navLink}
      />
    </AppShell.Navbar>
  );
}
