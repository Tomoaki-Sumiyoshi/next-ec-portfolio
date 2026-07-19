import { Order, OrderRequestParam } from '@/features/order/types/order';
import { useUserStore } from '@/features/user/store/user.store';
import { getOrderRepository } from '@/shared/lib/repository/di';

export async function setOrder(orderRequest: OrderRequestParam): Promise<Order> {
  const userId = await useUserStore.getState().initializeUser();
  return getOrderRepository().set(orderRequest, userId);
}
