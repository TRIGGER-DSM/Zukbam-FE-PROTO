import { queryOptions } from '@tanstack/react-query';
import { apiJson } from '../../../shared/api/client';
import type { PageInfo } from '../../../shared/api/pagination';
import type { Announcement, AnnouncementDetail } from '../domain/announcement';

export function announcementsOptions(page: number) {
  return queryOptions({
    queryKey: ['notices', page],
    queryFn: ({ signal }) =>
      apiJson<PageInfo & { notices: Announcement[] }>(`/notices?page=${page}&size=20`, { signal }),
  });
}

export function announcementOptions(id: number) {
  return queryOptions({
    queryKey: ['notice', id],
    queryFn: ({ signal }) => apiJson<AnnouncementDetail>(`/notices/${id}`, { signal }),
  });
}
