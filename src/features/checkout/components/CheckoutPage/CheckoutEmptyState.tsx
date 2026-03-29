import { Anchor, Card } from '@mantine/core';
import { IconShoppingCartOff } from '@tabler/icons-react';
import Link from 'next/link';

import EmptyState from '@/shared/components/EmptyState';
import { ROUTES } from '@/shared/constants/routes';

export default function CheckoutEmptyState() {
  return (
    <Card>
      <EmptyState
        title="カートが空です"
        description="購入手続きに進むには、先に商品をカートへ追加してください。"
        icon={<IconShoppingCartOff size={26} />}
        action={
          <Anchor component={Link} href={ROUTES.home}>
            商品一覧へ戻る
          </Anchor>
        }
      />
    </Card>
  );
}
