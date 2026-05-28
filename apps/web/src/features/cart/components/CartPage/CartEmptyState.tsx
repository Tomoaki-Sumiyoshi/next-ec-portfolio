import { Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';

import EmptyState from '@/shared/components/EmptyState';
import { ROUTES } from '@/shared/constants/routes';

import styles from './CartPage.module.scss';

export default function CartEmptyState() {
  return (
    <EmptyState
      className={styles.emptyState}
      title="カートは空です"
      description="商品を追加すると、ここに選択した商品と合計金額が表示されます。"
      icon={<IconShoppingCart size={26} />}
      action={
        <Button component={Link} href={ROUTES.home}>
          商品一覧へ戻る
        </Button>
      }
    />
  );
}
