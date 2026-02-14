import { z } from 'zod';

import { ProductSchema, ProductMapSchema } from '../schemas/product.schema';

export type Product = z.infer<typeof ProductSchema>;
export type ProductMap = z.infer<typeof ProductMapSchema>;
