import { z } from 'zod';

const ProductBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  imageUrl: z.string().url(),
  description: z.string().min(1),
});

export const StockedProductSchema = ProductBaseSchema.extend({
  kind: z.literal('stocked'),
  stock: z.number().int().nonnegative(),
  maxPerUser: z.number().int().positive().optional(), // 未指定=無制限
});

export const LicenseProductSchema = ProductBaseSchema.extend({
  kind: z.literal('license'),
  maxPerUser: z.literal(1),
  stock: z.null(), // 在庫概念なし
});

export const ProductSchema = z.discriminatedUnion('kind', [
  StockedProductSchema,
  LicenseProductSchema,
]);

export const ProductsSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
