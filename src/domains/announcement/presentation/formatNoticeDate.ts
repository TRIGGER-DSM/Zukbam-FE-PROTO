import { formatDateTime } from '../../../shared/format';

export function formatNoticeDate(createdAt: string, full = false) {
  const date = /^\d{4}-\d{2}-\d{2}T[\d:.]+$/.test(createdAt) ? `${createdAt}+09:00` : createdAt;
  return formatDateTime(date, {
    timeZone: 'Asia/Seoul',
    year: full ? 'numeric' : undefined,
    month: '2-digit',
    day: '2-digit',
  });
}
