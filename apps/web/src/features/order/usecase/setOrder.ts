import { Order, OrderRequestParam } from '@/features/order/types/order';
import { getOrderRepository } from '@/shared/lib/repository/di';

export async function setOrder(orderRequest: OrderRequestParam): Promise<Order> {
  return getOrderRepository().set(orderRequest);
}
