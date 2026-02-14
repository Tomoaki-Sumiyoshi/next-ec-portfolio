import { CartSchema } from '../schemas/cart.schema';

import type { z } from 'zod';

export type Cart = z.infer<typeof CartSchema>;
