function readDemoMode() {
  if (typeof window === 'undefined') return import.meta.env.VITE_DEMO_MODE === 'true';

  const requestedMode = new URLSearchParams(window.location.search).get('demo');
  if (requestedMode === '1') sessionStorage.setItem('demoMode', '1');
  if (requestedMode === '0') sessionStorage.removeItem('demoMode');
  return import.meta.env.VITE_DEMO_MODE === 'true' || sessionStorage.getItem('demoMode') === '1';
}

export const isDemoMode = readDemoMode();

export type DemoVerdict = 'ACCEPTED' | 'WRONG_ANSWER';

let demoToken: string | null =
  typeof sessionStorage !== 'undefined' && sessionStorage.getItem('demoLoggedOut') === '1'
    ? null
    : 'demo-session';

export function getDemoToken() {
  return demoToken;
}

export function setDemoToken(token: string | null) {
  demoToken = token;
  if (token) sessionStorage.removeItem('demoLoggedOut');
  else sessionStorage.setItem('demoLoggedOut', '1');
}
