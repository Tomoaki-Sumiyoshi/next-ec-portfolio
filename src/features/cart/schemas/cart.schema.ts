import { z } from 'zod';

export const ProductIdSchema = z.string().min(1);

export const CartSchema = z.record(
  ProductIdSchema,
  z.number().int().positive(),
);
