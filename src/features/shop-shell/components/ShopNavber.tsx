'use client';

import { AppShell, NavLink } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import Link from 'next/link';

type Props = {
  onNavigate?: () => void; // モバイルで遷移したら閉じる用途
};

export default function ShopNavbar({ onNavigate }: Props) {
  return (
    <AppShell.Navbar p="md">
      <NavLink
        component={Link}
        href="/order"
        label="購入履歴"
        leftSection={<IconHistory size={16} />}
        onClick={onNavigate}
      />
    </AppShell.Navbar>
  );
}
