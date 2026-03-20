import { Order, OrderRequestParam } from '@/features/order/types/order';
import { getOrderRepository } from '@/shared/lib/repository/di';

export async function setOrder(param: OrderRequestParam): Promise<Order> {
  return getOrderRepository().set(param);
}
