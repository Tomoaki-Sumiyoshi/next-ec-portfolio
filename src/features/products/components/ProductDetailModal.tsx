'use client';

import { Modal, Image, Text, Group, Stack } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Product } from '../schemas/product.schema';
import { getProductById } from '../usecases/getProductById';

export default function ProductDetailModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const productId = searchParams.get('productId');
  const opened = !!productId;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      if (!productId) {
        setProduct(null);
        return;
      }
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product by id:', error);
        setProduct(null);
      }
    })();
  }, [productId]);

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('productId');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <Modal opened={opened} onClose={close} title="商品詳細" centered>
      {!product ? (
        <Text size="sm">商品が見つかりません。</Text>
      ) : (
        <Stack gap="sm">
          <Image src={product.imageUrl} alt={product.name} radius="md" />
          <Group justify="space-between" align="start">
            <Text fw={700}>{product.name}</Text>
            <Text fw={700}>¥{product.price}</Text>
          </Group>
          <Text size="sm" c="dimmed">
            {product.description}
          </Text>
        </Stack>
      )}
    </Modal>
  );
}
