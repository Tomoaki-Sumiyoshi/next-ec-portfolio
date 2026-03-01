import { z } from 'zod';

import { OrderItemSchema, OrderSchema } from '../schemas/order.schema';

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
