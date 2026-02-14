import { z } from 'zod';

export const ProductIdSchema = z.string().min(1);

export const ProductSchema = z.object({
  id: ProductIdSchema,
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  imageUrl: z.string().min(1),
  description: z.string(),
});

export const ProductArraySchema = z.array(ProductSchema);

export const ProductMapSchema = z.record(ProductIdSchema, ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
