'use client';

import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { getCartProductList } from '@/features/cart/usecases/getCartProductList';
import { Product } from '@/features/products/types/product';
import Loading from '@/shared/components/Loading';

import CheckoutEmptyState from './CheckoutEmptyState';
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
      const fetchedProducts = await getCartProductList(cart);
      setProductList(fetchedProducts);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  if (!initialized || !productList) {
    return <Loading />;
  }

  if (productList.length === 0) {
    return <CheckoutEmptyState />;
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
