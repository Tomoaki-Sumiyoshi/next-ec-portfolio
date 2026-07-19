import { v4 } from 'uuid';
import { create } from 'zustand';

import { getUserRepository } from '@/shared/lib/repository/di';

type UserState = {
  userId: string | null;
  initialized: boolean;
  initializing: boolean;

  initializeUser: () => Promise<string>;
};

let initializeUserPromise: Promise<string> | null = null;

export const useUserStore = create<UserState>((set, get) => ({
  userId: null,
  initialized: false,
  initializing: false,

  initializeUser: async () => {
    const currentUserId = get().userId;
    if (currentUserId) return currentUserId;

    if (!initializeUserPromise) {
      set({ initializing: true });

      initializeUserPromise = (async () => {
        const userRepository = getUserRepository();
        const storedUserId = await userRepository.getId();
        return storedUserId ?? userRepository.setId(v4());
      })();
    }

    const userId = await initializeUserPromise;
    set({ userId, initialized: true, initializing: false });
    return userId;
  },
}));
