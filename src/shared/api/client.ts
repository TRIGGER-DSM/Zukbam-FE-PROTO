const apiBase = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

const sessionChangeEvent = 'auth-session-change';

export function getAccessToken() {
  return sessionStorage.getItem('accessToken') ?? localStorage.getItem('accessToken');
}

export function subscribeToSession(onChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === 'accessToken' || event.key === null) onChange();
  }

  window.addEventListener(sessionChangeEvent, onChange);
  window.addEventListener('storage', handleStorage);
  return () => {
    window.removeEventListener(sessionChangeEvent, onChange);
    window.removeEventListener('storage', handleStorage);
  };
}

export function saveSession(tokens: SessionTokens, remember = false) {
  if (!tokens.accessToken || !tokens.refreshToken) {
    throw new Error('서버에서 로그인 정보를 받지 못했어요.');
  }

  removeStoredTokens();
  const storage = remember ? localStorage : sessionStorage;
  try {
    storage.setItem('refreshToken', tokens.refreshToken);
    storage.setItem('accessToken', tokens.accessToken);
  } catch (error) {
    removeStoredTokens();
    throw error;
  } finally {
    window.dispatchEvent(new Event(sessionChangeEvent));
  }
}

export function clearSession() {
  removeStoredTokens();
  window.dispatchEvent(new Event(sessionChangeEvent));
}

function removeStoredTokens() {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

interface ApiOptions {
  method?: 'POST' | 'PATCH' | 'DELETE';
  body?: object;
  signal?: AbortSignal;
  authenticated?: boolean;
}

interface ErrorDetail {
  reson?: unknown;
  reason?: unknown;
}

interface ErrorResponse {
  errors?: ErrorDetail | ErrorDetail[];
  message?: unknown;
  code?: unknown;
}

function isErrorMessage(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function apiResponse(path: string, options: ApiOptions = {}) {
  const requestToken = getAccessToken();
  const headers = new Headers({ Accept: 'application/json' });
  if (options.authenticated) {
    if (!requestToken) {
      clearSession();
      throw new ApiError(401, '로그인이 필요한 기능이에요.');
    }
    headers.set('Authorization', `Bearer ${requestToken}`);
  }
  if (options.body) headers.set('Content-Type', 'application/json');
  const response = await fetch(`${apiBase}${path}`, {
    method: options.method,
    headers,
    body: options.body && JSON.stringify(options.body),
    signal: options.signal,
  }).catch((error: unknown) => {
    if (options.signal?.aborted) throw error;
    throw new Error('서버에 연결할 수 없어요. 잠시 후 다시 시도해 주세요.', { cause: error });
  });
  if (!response.ok) {
    if (response.status === 401 && getAccessToken() === requestToken) {
      clearSession();
    }
    const error: ErrorResponse | null = await response.json().catch(() => null);
    const details = Array.isArray(error?.errors) ? error.errors : [error?.errors];
    const reasons = details
      .map((detail) => [detail?.reson, detail?.reason].find(isErrorMessage))
      .filter(isErrorMessage);
    const message = reasons.length
      ? reasons.join('\n')
      : isErrorMessage(error?.message)
        ? error.message
        : `요청에 실패했어요. (${response.status})`;
    throw new ApiError(
      response.status,
      message,
      typeof error?.code === 'string' ? error.code : undefined,
    );
  }
  return response;
}

export async function apiJson<T>(path: string, options?: ApiOptions): Promise<T> {
  const response = await apiResponse(path, options);
  return response.json();
}
