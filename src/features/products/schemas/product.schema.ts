import { z } from 'zod';

export const ProductIdSchema = z.string().min(1);
export const ProductPriceSchema = z.number().int().nonnegative();

export const ProductSchema = z.object({
  id: ProductIdSchema,
  name: z.string().min(1),
  price: ProductPriceSchema,
  imageUrl: z.string().min(1),
  description: z.string(),
});

export const ProductArraySchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
