'use client';

import { Container } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import ErrorState from '@/shared/components/ErrorState';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import ProductDetailModal from './ProductDetailModal';
import ProductGrid from './ProductGrid';
import ProductListEmptyState from './ProductListEmptyState';
import { Product } from '../types/product';
import { getProductList } from '../usecases/getProductList';

export default function ProductListPage() {
  const [productList, setProductList] = useState<Product[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const loadProductList = useCallback(async () => {
    try {
      setErrorMessage('');
      const fetchedProducts = await getProductList();
      setProductList(fetchedProducts);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          '商品一覧を取得できませんでした。時間をおいて再試行してください。'
        )
      );
      setProductList([]);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadProductList();
    });
  }, [loadProductList]);

  return (
    <>
      <Container py={{ base: 'sm', sm: 'md' }} size="xl">
        {errorMessage ? (
          <ErrorState
            description={errorMessage}
            onRetry={() => void loadProductList()}
          />
        ) : productList === null ? null : productList.length === 0 ? (
          <ProductListEmptyState />
        ) : (
          <ProductGrid productList={productList} />
        )}
      </Container>
      <ProductDetailModal />
    </>
  );
}
