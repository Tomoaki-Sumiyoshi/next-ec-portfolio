import { Product } from '@/features/products/types/product';

import { CartSchema } from '../schemas/cart.schema';

import type { z } from 'zod';

export type Cart = z.infer<typeof CartSchema>;

export type CartProduct = Product & {
  quantity: number;
};
