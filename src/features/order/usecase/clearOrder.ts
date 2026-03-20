import { getOrderRepository } from '@/shared/lib/repository/di';

export async function clearOrder(): Promise<void> {
  getOrderRepository().clear();
}
