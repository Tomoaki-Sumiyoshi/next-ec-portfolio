import type { UserRepository } from './UserRepository';

const STORAGE_KEY = 'portfolio_ec_user_id';

function readStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

function writeStorage(userId: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, userId);
}

export class LocalStorageUserRepository implements UserRepository {
  async getId(): Promise<string | null> {
    return readStorage();
  }

  async setId(userId: string): Promise<string> {
    writeStorage(userId);
    return userId;
  }
}
