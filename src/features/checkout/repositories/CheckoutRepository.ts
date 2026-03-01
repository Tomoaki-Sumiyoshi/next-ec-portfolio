import { Order } from '@/features/order/types/order';

export interface CheckoutRepository {
  get(): Promise<Order | null>;
  set(order: Order | null): Promise<Order | null>;
  clear(): Promise<null>;
}
