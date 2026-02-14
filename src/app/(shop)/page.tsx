import { Suspense } from 'react';

import ProductListPageClient from '@/features/products/components/ProductListPageClient';
import { getProductList } from '@/features/products/usecases/getProductList';
import Loading from '@/shared/components/Loading';

export default async function HomePage() {
  const productList = await getProductList();

  return (
    <Suspense fallback={<Loading />}>
      <ProductListPageClient productList={productList} />
    </Suspense>
  );
}
