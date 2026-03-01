import { z } from 'zod';

import { ProductIdSchema } from '@/features/products/schemas/product.schema';

export const CartQuantitySchema = z.number().int().positive();

export const CartSchema = z.record(ProductIdSchema, CartQuantitySchema);
