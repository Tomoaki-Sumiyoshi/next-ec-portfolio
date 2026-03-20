import { Order } from '@/features/order/types/order';
import { getOrderRepository } from '@/shared/lib/repository/di';

export async function getOrderList(): Promise<Order[]> {
  return getOrderRepository().list();
}
