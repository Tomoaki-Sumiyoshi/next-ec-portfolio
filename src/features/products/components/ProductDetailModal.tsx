'use client';

import { Alert, Group, Image, Modal, Stack, Text } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import { Product } from '../schemas/product.schema';
import { getProductById } from '../usecases/getProductById';

export default function ProductDetailModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const productId = searchParams.get('productId');
  const isOpened = !!productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      if (!productId) {
        setProduct(null);
        setErrorMessage('');
        return;
      }

      try {
        setErrorMessage('');
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        setProduct(null);
        setErrorMessage(
          getErrorMessage(
            error,
            '商品の詳細情報を取得できませんでした。時間をおいて再試行してください。'
          )
        );
      }
    })();
  }, [productId]);

  const closeModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete('productId');

    const queryString = nextSearchParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <Modal opened={isOpened} onClose={closeModal} title="商品詳細" centered>
      {errorMessage ? (
        <Alert title="商品情報を読み込めませんでした" color="red">
          {errorMessage}
        </Alert>
      ) : !product ? (
        <Text size="sm">商品情報を読み込み中です。</Text>
      ) : (
        <Stack gap="sm">
          <Image src={product.imageUrl} alt={product.name} radius="md" />
          <Group justify="space-between" align="start">
            <Text fw={700}>{product.name}</Text>
            <Text fw={700}>¥{product.price.toLocaleString()}</Text>
          </Group>
          <Text size="sm" c="dimmed">
            {product.description}
          </Text>
        </Stack>
      )}
    </Modal>
  );
}
