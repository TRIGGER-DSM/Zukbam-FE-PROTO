const apiBase = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken') ?? localStorage.getItem('accessToken');
}

export function saveSession(tokens: SessionTokens, remember = false) {
  if (!tokens.accessToken || !tokens.refreshToken) {
    throw new Error('서버에서 로그인 정보를 받지 못했어요.');
  }

  clearSession();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem('refreshToken', tokens.refreshToken);
  storage.setItem('accessToken', tokens.accessToken);
}

export function clearSession() {
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

export async function apiResponse(path: string, options: ApiOptions = {}) {
  const headers = new Headers({ Accept: 'application/json' });
  if (options.authenticated) {
    const token = getAccessToken();
    if (!token) throw new ApiError(401, '로그인이 필요한 기능이에요.');
    headers.set('Authorization', `Bearer ${token}`);
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
    const error: { message?: string; code?: string } | null = await response
      .json()
      .catch(() => null);
    throw new ApiError(
      response.status,
      error?.message ?? `요청에 실패했어요. (${response.status})`,
      error?.code,
    );
  }
  return response;
}

export async function apiJson<T>(path: string, options?: ApiOptions): Promise<T> {
  const response = await apiResponse(path, options);
  return response.json();
}
