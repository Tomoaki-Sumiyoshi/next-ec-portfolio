import { Order } from '@/features/order/types/order';
import { getOrderRepository } from '@/shared/lib/repository/di';

export async function getOrderById(id: string): Promise<Order | null> {
  return getOrderRepository().getById(id);
}
