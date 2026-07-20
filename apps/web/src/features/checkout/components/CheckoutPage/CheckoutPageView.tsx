'use client';

import { Grid } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { getCartProductList } from '@/features/cart/usecases/getCartProductList';
import { Product } from '@/features/products/types/product';
import ErrorState from '@/shared/components/ErrorState';
import Loading from '@/shared/components/Loading';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import CheckoutEmptyState from './CheckoutEmptyState';
import CheckoutForm from './CheckoutForm';
import styles from './CheckoutPageView.module.scss';
import CheckoutSummary from './CheckoutSummary';

export default function CheckoutPageView() {
  const initialized = useCartStore((cartState) => cartState.initialized);
  const cart = useCartStore((cartState) => cartState.cart);

  const [productList, setProductList] = useState<Product[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadCheckoutProductList = useCallback(async () => {
    setIsLoading(true);
    try {
      setErrorMessage('');
      const fetchedProducts = await getCartProductList(cart);
      setProductList(fetchedProducts);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          '購入手続きに必要な商品情報を取得できませんでした。'
        )
      );
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    queueMicrotask(() => {
      void loadCheckoutProductList();
    });
  }, [initialized, loadCheckoutProductList]);

  if (!initialized || isLoading || productList === null) {
    return <Loading />;
  }

  if (errorMessage) {
    return (
      <ErrorState
        description={errorMessage}
        onRetry={() => void loadCheckoutProductList()}
      />
    );
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
