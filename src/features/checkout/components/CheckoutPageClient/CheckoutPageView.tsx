'use client';

import { Alert, Anchor, Card, Grid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/features/cart/store/cart.store';
import { Product } from '@/features/products/types/product';
import { getProductListByIds } from '@/features/products/usecases/getProductListByIds';

import CheckoutFrom from './CheckoutForm';
import RightSummary from './RightSummary';

export default function CheckoutPageView() {
  const initialized = useCartStore((s) => s.initialized);

  const cart = useCartStore((s) => s.cart);

  const [productList, setProductList] = useState<Product[] | null>(null);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    (async () => {
      const ids = Object.keys(cart);
      if (ids.length === 0) {
        setProductList([]);
        return;
      }
      const data = await getProductListByIds(ids);

      setProductList(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  if (!initialized || !productList) {
    return (
      <Text size="sm" mt="sm">
        読み込み中...
      </Text>
    );
  }

  if (productList.length == 0) {
    return (
      <Card withBorder radius="md">
        <Alert title="カートが空です" color="red">
          決済を行うには、商品をカートに追加してください。
        </Alert>
        <Anchor href="/cart">カートに戻る</Anchor>
      </Card>
    );
  }

  return (
    <Grid align="start">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <CheckoutFrom />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <RightSummary productList={productList} />
      </Grid.Col>
    </Grid>
  );
}
