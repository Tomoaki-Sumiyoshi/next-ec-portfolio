'use client';

import { Modal, Image, Text, Stack, Group, Loader } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useProductDetailStore } from '../store/useProductDetailStore';

export default function ProductDetailModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { product, isLoading, errorMessage, fetchById, reset } =
    useProductDetailStore();

  const id = searchParams.get('id');
  const opened = Boolean(id);

  // ?id= が付いたら単体取得、閉じたらリセット
  useEffect(() => {
    if (!id) {
      reset();
      return;
    }
    fetchById(id);
  }, [id, fetchById, reset]);

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('id');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <Modal opened={opened} onClose={close} title="商品詳細" centered>
      {!id ? null : isLoading ? (
        <Group justify="center" py="md">
          <Loader size="sm" />
        </Group>
      ) : errorMessage ? (
        <Text c="dimmed">{errorMessage}</Text>
      ) : !product ? (
        <Text c="dimmed">商品が見つかりません</Text>
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
