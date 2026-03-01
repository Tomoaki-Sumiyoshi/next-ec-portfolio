import { z } from 'zod';

import { CartQuantitySchema } from '@/features/cart/schemas/cart.schema';
import {
  ProductIdSchema,
  ProductPriceSchema,
} from '@/features/products/schemas/product.schema';

const POST_CODE = new RegExp('^[0-9]{3}-[0-9]{4}$');

export const OrderItemSchema = z.object({
  productId: ProductIdSchema,
  quantity: CartQuantitySchema,
  marketPrice: ProductPriceSchema,
});

export const OrderCustomerSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
});

export const OrderAddressSchema = z.object({
  postCode: z.string().regex(POST_CODE),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
});

export const OrderSchema = z.object({
  id: z.uuidv4(),
  createdAt: z.iso.datetime(),
  itemList: z.array(OrderItemSchema),
  customer: OrderCustomerSchema,
  shippingAddress: OrderAddressSchema,
});
