'use client';

import { useEffect } from 'react';

import { useUserStore } from '../store/user.store';

export default function UserInitializer() {
  const initializeUser = useUserStore((userState) => userState.initializeUser);
  const initialized = useUserStore((userState) => userState.initialized);

  useEffect(() => {
    if (!initialized) initializeUser();
  }, [initialized, initializeUser]);

  return null;
}
