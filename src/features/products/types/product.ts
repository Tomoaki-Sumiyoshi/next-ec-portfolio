import { z } from 'zod';

import { ProductSchema } from '../schemas/product.schema';

export type Product = z.infer<typeof ProductSchema>;
