import { Suspense } from 'react';

import ProductListPageClient from '@/features/products/components/ProductListPageClient';

export default async function HomePage() {
  return (
    <Suspense fallback={null}>
      <ProductListPageClient />
    </Suspense>
  );
}
