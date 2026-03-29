import { SimpleGrid } from '@mantine/core';

import { Product } from '@/features/products/types/product';

import ProductCard from './ProductCard';

type Props = {
  productList: Product[];
};

export default function ProductGrid({ productList }: Props) {
  return (
    <SimpleGrid
      cols={{ base: 1, xs: 2, md: 3, xl: 4 }}
      spacing={{ base: 'sm', sm: 'md' }}
    >
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
}
