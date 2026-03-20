import { z } from 'zod';

import {
  OrderItemSchema,
  OrderRequestParamSchema,
  OrderSchema,
} from '../schemas/order.schema';

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderRequestParam = z.infer<typeof OrderRequestParamSchema>;
export type Order = z.infer<typeof OrderSchema>;
