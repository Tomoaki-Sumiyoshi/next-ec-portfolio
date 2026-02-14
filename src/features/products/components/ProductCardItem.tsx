'use client';

import { Card, Image, Text } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import QuantityControl from '@/shared/components/QuantityControl/QuantityControl';

import { Product } from '../types/product';

type Props = {
  product: Product;
};

export default function ProductCardItem({ product }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('productId', product.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Card withBorder radius="md" p="md">
      <div onClick={openModal} style={{ cursor: 'pointer' }}>
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

      <QuantityControl />
    </Card>
  );
}
