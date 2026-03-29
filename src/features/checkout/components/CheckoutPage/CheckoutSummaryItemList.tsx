import { Stack } from '@mantine/core';

import { Product } from '@/features/products/types/product';

import CheckoutSummaryItemCard from './CheckoutSummaryItemCard';

type Props = {
  productList: Product[];
};

export default function CheckoutSummaryItemList({ productList }: Props) {
  return (
    <Stack gap="sm">
      {productList.map((product) => (
        <CheckoutSummaryItemCard key={product.id} product={product} />
      ))}
    </Stack>
  );
}
