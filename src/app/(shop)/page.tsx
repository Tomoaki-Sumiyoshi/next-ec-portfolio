import { Suspense } from 'react';

import ProductListPage from '@/features/products/components/ProductListPage';

export default async function HomePage() {
  return (
    <Suspense fallback={null}>
      <ProductListPage />
    </Suspense>
  );
}
