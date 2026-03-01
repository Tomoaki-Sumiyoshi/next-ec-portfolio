import { Order } from '@/features/order/types/order';
import { getCheckoutRepository } from '@/shared/lib/repository/di';

export async function setCheckout(order: Order | null): Promise<Order | null> {
  return getCheckoutRepository().set(order);
}
