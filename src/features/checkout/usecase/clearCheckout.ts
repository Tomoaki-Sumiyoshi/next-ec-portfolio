import { getCheckoutRepository } from '@/shared/lib/repository/di';

export async function clearCheckout(): Promise<null> {
  return getCheckoutRepository().clear();
}
