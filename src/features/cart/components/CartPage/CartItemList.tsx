import { Stack } from '@mantine/core';

import { Product } from '@/features/products/types/product';

import CartItemCard from './CartItemCard';

type Props = {
  productList: Product[];
};

export default function CartItemList({ productList }: Props) {
  return (
    <Stack gap="sm">
      {productList.map((product) => (
        <CartItemCard key={product.id} product={product} />
      ))}
    </Stack>
  );
}
