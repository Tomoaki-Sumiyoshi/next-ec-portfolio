'use client';

import { Container } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import ErrorState from '@/shared/components/ErrorState';
import Loading from '@/shared/components/Loading';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import ProductDetailModal from './ProductDetailModal';
import ProductGrid from './ProductGrid';
import ProductListEmptyState from './ProductListEmptyState';
import { Product } from '../types/product';
import { getProductList } from '../usecases/getProductList';

export default function ProductListPage() {
  const [productList, setProductList] = useState<Product[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadProductList = useCallback(async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <Loading />
        ) : errorMessage ? (
          <ErrorState
            description={errorMessage}
            onRetry={() => void loadProductList()}
          />
        ) : productList === null || productList.length === 0 ? (
          <ProductListEmptyState />
        ) : (
          <ProductGrid productList={productList} />
        )}
      </Container>
      <ProductDetailModal />
    </>
  );
}
