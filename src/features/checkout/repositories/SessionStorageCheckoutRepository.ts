import { OrderSchema } from '@/features/order/schemas/order.schema';
import { Order } from '@/features/order/types/order';

import { CheckoutRepository } from './CheckoutRepository';

const STORAGE_KEY = 'portfolio_ec_checkout';

function readStorage(): Order | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return OrderSchema.parse(parsed);
  } catch {
    return null;
  }
}

function writeStorage(order: Order | null) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export class SessionStorageCheckoutRepository implements CheckoutRepository {
  async get(): Promise<Order | null> {
    return readStorage();
  }

  async set(order: Order | null): Promise<Order | null> {
    writeStorage(OrderSchema.parse(order));
    return order;
  }

  async clear(): Promise<null> {
    writeStorage(null);
    return null;
  }
}
