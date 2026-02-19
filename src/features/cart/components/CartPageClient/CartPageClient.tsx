'use client';

import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Product } from '@/features/products/types/product';
import { getProductListByIds } from '@/features/products/usecases/getProductListByIds';

import CartItem from './CartPaperItem';
import RightSummary from './RightSummary';
import { useCartStore } from '../../store/cart.store';

export default function CartPageClient() {
  const initialized = useCartStore((s) => s.initialized);

  const cart = useCartStore((s) => s.cart);
  const totalQuantity = useCartStore((s) => s.totalQuantity());

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

  const currentProductList = useMemo(() => {
    return productList?.filter((product) => !!cart[product.id]) ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList, Object.keys(cart).length]);

  const totalPrice = useMemo(() => {
    return currentProductList.reduce(
      (sum, r) => sum + r.price * (cart[r.id] ?? 0),
      0,
    );
  }, [currentProductList, cart]);

  if (!initialized || !productList) {
    return (
      <Container py="md">
        <Title order={2}>カート</Title>
        <Text size="sm" mt="sm">
          読み込み中...
        </Text>
      </Container>
    );
  }

  if (currentProductList.length === 0) {
    return (
      <Container py="md">
        <Group justify="space-between" align="flex-end">
          <Title order={2}>カート</Title>
          <Text size="sm">点数: {totalQuantity}</Text>
        </Group>

        <Divider my="md" />

        <Paper withBorder p="md" radius="md">
          <Stack align="center">
            <Text>カートは空です。</Text>
            <Button mt="md" component={Link} href="/">
              商品一覧へ
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Group justify="space-between" align="flex-end">
        <Title order={2}>カート</Title>
        <Text size="sm">点数: {totalQuantity}</Text>
      </Group>

      <Divider my="md" />

      <Grid align="start">
        {/* 左：明細（横いっぱい） */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <ScrollArea.Autosize mah="auto">
            <Stack gap="sm">
              {currentProductList.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </Stack>
          </ScrollArea.Autosize>
        </Grid.Col>

        {/* 右：サマリー（固定幅寄り） */}
        <Grid.Col span={{ base: 12, md: 4 }} pos="sticky" bottom={0}>
          <RightSummary totalPrice={totalPrice} />
        </Grid.Col>
      </Grid>
    </>
  );
}
