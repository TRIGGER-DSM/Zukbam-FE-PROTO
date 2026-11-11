export function formatNumber(value: unknown, locale?: string) {
  return typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString(locale) : '—';
}

export function formatDateTime(value: unknown, options?: Intl.DateTimeFormatOptions) {
  if (typeof value !== 'string' && typeof value !== 'number') return '—';
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleString('ko-KR', options) : '—';
}
