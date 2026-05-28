'use client';

import { Button, Card, Group, Image, Text } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCartStore } from '@/features/cart/store/cart.store';
import QuantityControl from '@/shared/components/QuantityControl/QuantityControl';

import styles from './ProductCard.module.scss';
import { Product } from '../types/product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addItemToCart = useCartStore((cartState) => cartState.addItem);
  const quantity = useCartStore((cartState) =>
    cartState.getQuantity(product.id)
  );

  const openProductDetail = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set('productId', product.id);
    router.push(`${pathname}?${nextSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Card withBorder radius="md" p="md">
      <div onClick={openProductDetail} className={styles.clickable}>
        <Card.Section>
          <Image src={product.imageUrl} alt={product.name} height={180} />
        </Card.Section>

        <Text mt="sm" fw={600} lineClamp={1}>
          {product.name}
        </Text>

        <Text size="sm" c="dimmed">
          ¥{product.price}
        </Text>
      </div>
      <Group gap="xs" mt="md" w="100%" justify="space-between">
        {quantity > 0 ? (
          <QuantityControl productId={product.id} />
        ) : (
          <Button fullWidth onClick={() => addItemToCart(product.id)}>
            カートに追加
          </Button>
        )}
      </Group>
    </Card>
  );
}
