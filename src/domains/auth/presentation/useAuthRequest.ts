import { useEffect, useRef, useState } from 'react';

export function useAuthRequest<Action extends string>() {
  const activeRequest = useRef<AbortController | null>(null);
  const [pendingAction, setPendingAction] = useState<Action | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => () => activeRequest.current?.abort(), []);

  async function run(action: Action, request: (signal: AbortSignal) => Promise<void>) {
    if (activeRequest.current) return;

    const controller = new AbortController();
    activeRequest.current = controller;
    setPendingAction(action);
    setError(null);
    try {
      await request(controller.signal);
    } catch (failure) {
      if (!controller.signal.aborted) {
        setError(failure instanceof Error ? failure : new Error('다시 시도해 주세요.'));
      }
    } finally {
      activeRequest.current = null;
      if (!controller.signal.aborted) setPendingAction(null);
    }
  }

  return { run, pendingAction, error, clearError: () => setError(null) };
}
