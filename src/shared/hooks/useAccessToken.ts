import { useSyncExternalStore } from 'react';
import { getAccessToken, subscribeToSession } from '../api/client';

export function useAccessToken() {
  return useSyncExternalStore(subscribeToSession, getAccessToken, () => null);
}
