'use client';

import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { ProductMap } from '@/features/products/types/product';
import { getProductMapByIds } from '@/features/products/usecases/getProductMapByIds';

import CartItem from './CartItem';
import RightSummary from './RightSummary';
import { useCartStore } from '../../store/cart.store';
import { CartProduct } from '../../types/cart';

export default function CartPageClient() {
  const initialized = useCartStore((s) => s.initialized);
  const init = useCartStore((s) => s.init);

  const cart = useCartStore((s) => s.cart);
  const totalQuantity = useCartStore((s) => s.totalQuantity());

  const [productMap, setProductMap] = useState<ProductMap>({});

  useEffect(() => {
    if (!initialized) {
      init();
    }
  }, [initialized, init]);

  useEffect(() => {
    (async () => {
      const ids = Object.keys(cart);
      if (ids.length === 0) {
        setProductMap({});
        return;
      }

      const productMap = await getProductMapByIds(ids);
      setProductMap(productMap);
    })();
  }, [cart]);

  const cartProductList = useMemo(() => {
    const resultList: CartProduct[] = [];
    Object.entries(cart).forEach(([productId, quantity]) => {
      const product = productMap[productId];
      if (!!product) {
        resultList.push({ ...product, quantity });
      }
    });
    return resultList;
  }, [cart, productMap]);

  const totalPrice = useMemo(() => {
    return cartProductList.reduce(
      (sum, r) => sum + (r.price ?? 0) * r.quantity,
      0,
    );
  }, [cartProductList]);

  if (!initialized) {
    return (
      <Container py="md">
        <Title order={2}>カート</Title>
        <Text size="sm" mt="sm">
          読み込み中...
        </Text>
      </Container>
    );
  }

  return (
    <Container py="md">
      <Group justify="space-between" align="flex-end">
        <Title order={2}>カート</Title>
        <Text size="sm">点数: {totalQuantity}</Text>
      </Group>

      <Divider my="md" />

      <Grid align="start">
        {/* 左：明細（横いっぱい） */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="sm">
            {cartProductList.map((cartProduct) => (
              <CartItem key={cartProduct.id} cartProduct={cartProduct} />
            ))}
          </Stack>
        </Grid.Col>

        {/* 右：サマリー（固定幅寄り） */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <RightSummary totalPrice={totalPrice} />
        </Grid.Col>
      </Grid>

      {/* <Paper withBorder p="md" radius="md">
        <Text>カートは空です。</Text>
        <Button mt="md" component={Link} href="/">
          商品一覧へ
        </Button>
      </Paper> */}
    </Container>
  );
}
