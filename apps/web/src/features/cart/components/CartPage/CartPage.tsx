'use client';

import { Grid, ScrollArea, Text } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { getCartProductList } from '@/features/cart/usecases/getCartProductList';
import { Product } from '@/features/products/types/product';
import ErrorState from '@/shared/components/ErrorState';
import Loading from '@/shared/components/Loading';
import PageHeader from '@/shared/components/PageHeader';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import CartEmptyState from './CartEmptyState';
import CartItemList from './CartItemList';
import styles from './CartPage.module.scss';
import CartSummary from './CartSummary';

export default function CartPage() {
  const initialized = useCartStore((cartState) => cartState.initialized);
  const cart = useCartStore((cartState) => cartState.cart);
  const totalQuantity = useCartStore((cartState) =>
    cartState.getTotalQuantity()
  );

  const [productList, setProductList] = useState<Product[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadCartProductList = useCallback(async () => {
    setIsLoading(true);
    try {
      setErrorMessage('');
      const fetchedProducts = await getCartProductList(cart);
      setProductList(fetchedProducts);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          'カート商品の取得に失敗しました。時間をおいて再試行してください。'
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
      void loadCartProductList();
    });
  }, [initialized, loadCartProductList]);

  const currentProductList = useMemo(() => {
    return productList?.filter((product) => !!cart[product.id]) ?? [];
  }, [productList, cart]);

  const totalPrice = useMemo(() => {
    return currentProductList.reduce(
      (sum, product) => sum + product.price * (cart[product.id] ?? 0),
      0
    );
  }, [currentProductList, cart]);

  if (!initialized || isLoading || productList === null) {
    return (
      <>
        <PageHeader
          title="カート"
          description="選択した商品と数量、合計金額を確認できます。"
          badge="Cart"
        />
        <Loading />
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <PageHeader
          title="カート"
          description="選択した商品と数量、合計金額を確認できます。"
          badge="Cart"
        />
        <ErrorState
          description={errorMessage}
          onRetry={() => void loadCartProductList()}
        />
      </>
    );
  }

  if (currentProductList.length === 0) {
    return (
      <>
        <PageHeader
          title="カート"
          description="選択した商品と数量、合計金額を確認できます。"
          badge="Cart"
        />
        <CartEmptyState />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="カート"
        description="選択した商品と数量、合計金額を確認できます。"
        badge="Cart"
        action={
          <Text size="sm" c="dimmed">
            商品数: {totalQuantity}
          </Text>
        }
      />

      <Grid align="start" gutter={{ base: 'md', md: 'lg' }}>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <ScrollArea.Autosize mah="auto">
            <CartItemList productList={currentProductList} />
          </ScrollArea.Autosize>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }} className={styles.summaryColumn}>
          <CartSummary totalPrice={totalPrice} />
        </Grid.Col>
      </Grid>
    </>
  );
}
