import { Order } from '@/features/order/types/order';
import { getCheckoutRepository } from '@/shared/lib/repository/di';

export async function getCheckout(): Promise<Order | null> {
  return getCheckoutRepository().get();
}
