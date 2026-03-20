import { CheckoutRepository } from './CheckoutRepository';

const STORAGE_KEY = 'portfolio_ec_checkout';

function readStorage(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return raw;
  } catch {
    return null;
  }
}

function writeStorage(id: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, id);
}

function removeStorage() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export class SessionStorageCheckoutRepository implements CheckoutRepository {
  async get(): Promise<string | null> {
    return readStorage();
  }

  async set(id: string): Promise<void> {
    writeStorage(id);
  }

  async clear(): Promise<void> {
    removeStorage();
  }
}
