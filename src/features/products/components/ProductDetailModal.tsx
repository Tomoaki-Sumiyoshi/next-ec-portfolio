'use client';

import { Modal, Image, Text, Stack, Group } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useProductsStore } from '@/features/products/store/useProductsStore';

export default function ProductDetailModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const products = useProductsStore((s) => s.products);

  const id = searchParams.get('id');
  const opened = Boolean(id);

  const product = id ? products.find((p) => p.id === id) : null;

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('id');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <Modal opened={opened} onClose={close} title="商品詳細" centered>
      {!id ? null : !product ? (
        <Text c="dimmed">商品が見つかりません</Text>
      ) : (
        <Stack gap="sm">
          <Image src={product.imageUrl} alt={product.name} radius="md" />
          <Group justify="space-between">
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
