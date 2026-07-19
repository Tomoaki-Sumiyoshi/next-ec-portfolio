import { Order } from '@/features/order/types/order';
import { useUserStore } from '@/features/user/store/user.store';
import { getOrderRepository } from '@/shared/lib/repository/di';

export async function getOrderList(): Promise<Order[]> {
  const userId = await useUserStore.getState().initializeUser();
  return getOrderRepository().list(userId);
}
