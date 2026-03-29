'use client';

import {
  Button,
  Grid,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { getCartProductList } from '@/features/cart/usecases/getCartProductList';
import { Product } from '@/features/products/types/product';
import Loading from '@/shared/components/Loading';
import PageHeader from '@/shared/components/PageHeader';
import { ROUTES } from '@/shared/constants/routes';

import CartItemCard from './CartItemCard';
import styles from './CartPage.module.scss';
import CartSummary from './CartSummary';
import { useCartStore } from '../../store/cart.store';

export default function CartPage() {
  const initialized = useCartStore((cartState) => cartState.initialized);
  const cart = useCartStore((cartState) => cartState.cart);
  const totalQuantity = useCartStore((cartState) =>
    cartState.getTotalQuantity()
  );

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

  const currentProductList = useMemo(() => {
    return productList?.filter((product) => !!cart[product.id]) ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList, Object.keys(cart).length]);

  const totalPrice = useMemo(() => {
    return currentProductList.reduce(
      (sum, product) => sum + product.price * (cart[product.id] ?? 0),
      0
    );
  }, [currentProductList, cart]);

  if (!initialized || !productList) {
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

  if (currentProductList.length === 0) {
    return (
      <>
        <PageHeader
          title="カート"
          description="選択した商品と数量、合計金額を確認できます。"
          badge="Cart"
        />
        <Stack
          align="center"
          justify="center"
          gap="md"
          py={48}
          bg="white"
          bd="1px solid var(--mantine-color-gray-2)"
          className={styles.emptyState}
        >
          <ThemeIcon size={56} radius="xl" variant="light" color="brand">
            <IconShoppingCart size={26} />
          </ThemeIcon>
          <Stack gap={4} align="center">
            <Text fw={700}>カートは空です</Text>
            <Text size="sm" c="dimmed">
              商品を追加すると、ここに購入予定の商品が表示されます。
            </Text>
          </Stack>
          <Button component={Link} href={ROUTES.home}>
            商品一覧へ戻る
          </Button>
        </Stack>
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
            <Stack gap="sm">
              {currentProductList.map((product) => (
                <CartItemCard key={product.id} product={product} />
              ))}
            </Stack>
          </ScrollArea.Autosize>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }} className={styles.summaryColumn}>
          <CartSummary totalPrice={totalPrice} />
        </Grid.Col>
      </Grid>
    </>
  );
}
