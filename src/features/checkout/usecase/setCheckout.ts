import { getCheckoutRepository } from '@/shared/lib/repository/di';

export async function setCheckout(id: string): Promise<void> {
  getCheckoutRepository().set(id);
}
