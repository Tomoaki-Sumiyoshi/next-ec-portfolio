import { getCheckoutRepository } from '@/shared/lib/repository/di';

export async function getCheckout(): Promise<string | null> {
  return getCheckoutRepository().get();
}
