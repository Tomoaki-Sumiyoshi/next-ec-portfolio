'use client';

import { Alert, Anchor, Card, Grid } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { Product } from '@/features/products/types/product';
import { getProductListByIds } from '@/features/products/usecases/getProductListByIds';
import Loading from '@/shared/components/Loading';
import { ROUTES } from '@/shared/constants/routes';

import CheckoutForm from './CheckoutForm';
import styles from './CheckoutPageView.module.scss';
import CheckoutSummary from './CheckoutSummary';

export default function CheckoutPageView() {
  const initialized = useCartStore((cartState) => cartState.initialized);
  const cart = useCartStore((cartState) => cartState.cart);

  const [productList, setProductList] = useState<Product[] | null>(null);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    (async () => {
      const productIds = Object.keys(cart);
      if (productIds.length === 0) {
        setProductList([]);
        return;
      }

      const fetchedProducts = await getProductListByIds(productIds);
      setProductList(fetchedProducts);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  if (!initialized || !productList) {
    return <Loading />;
  }

  if (productList.length === 0) {
    return (
      <Card>
        <Alert title="カートが空です" color="red">
          購入手続きを進めるには、先に商品をカートへ追加してください。
        </Alert>
        <Anchor component={Link} href={ROUTES.home}>
          商品一覧へ戻る
        </Anchor>
      </Card>
    );
  }

  return (
    <Grid align="start" gutter={{ base: 'md', md: 'lg' }}>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <CheckoutForm productList={productList} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }} className={styles.summaryColumn}>
        <CheckoutSummary productList={productList} />
      </Grid.Col>
    </Grid>
  );
}
