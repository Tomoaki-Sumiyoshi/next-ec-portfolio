'use client';

import { Card, Image, Text } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { Product } from '@/features/products/domain/product.schema';

type Props = {
  product: Product;
};

export default function ProductCardItem({ product }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', product.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      style={{ cursor: 'pointer' }}
      onClick={openModal}
    >
      <Card.Section>
        <Image src={product.imageUrl} alt={product.name} height={180} />
      </Card.Section>

      <Text mt="sm" fw={600} lineClamp={1}>
        {product.name}
      </Text>

      <Text size="sm" c="dimmed">
        ¥{product.price}
      </Text>
    </Card>
  );
}
