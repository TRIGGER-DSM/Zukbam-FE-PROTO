import { queryOptions } from '@tanstack/react-query';
import { apiJson, apiResponse } from '../../../shared/api/client';

type GroupRole = 'OWNER' | 'MEMBER';

export interface GroupFields {
  title: string;
  introduce: string;
}

interface GroupSummary extends GroupFields {
  groupId: number;
  myRole: GroupRole;
}

interface GroupDetail extends GroupFields {
  groupId: number;
  members: { userId: number; name: string; role: GroupRole }[];
}

export function myGroupsOptions(userId: number | undefined) {
  return queryOptions({
    queryKey: ['groups', userId],
    enabled: userId !== undefined,
    gcTime: 0,
    queryFn: async ({ signal }) => {
      const result = await apiJson<{ groups: GroupSummary[] }>('/groups/me', {
        authenticated: true,
        signal,
      });
      return result.groups;
    },
  });
}

export function groupOptions(userId: number | undefined, id: number | undefined) {
  return queryOptions({
    queryKey: ['groups', userId, id],
    enabled: userId !== undefined && id !== undefined,
    gcTime: 0,
    queryFn: ({ signal }) => apiJson<GroupDetail>(`/groups/${id}`, { authenticated: true, signal }),
  });
}

export async function createGroup(fields: GroupFields) {
  const response = await apiResponse('/groups', {
    method: 'POST',
    authenticated: true,
    body: fields,
  });
  const match = response.headers.get('Location')?.match(/\/groups\/(\d+)\/?$/);
  return match ? Number(match[1]) : undefined;
}

export async function updateGroup(id: number, fields: GroupFields) {
  await apiResponse(`/groups/${id}`, { method: 'PUT', authenticated: true, body: fields });
}

export async function deleteGroup(id: number) {
  await apiResponse(`/groups/${id}`, { method: 'DELETE', authenticated: true });
}

export async function inviteStudent(id: number, inviteeId: number) {
  await apiResponse(`/groups/${id}/invitations`, {
    method: 'POST',
    authenticated: true,
    body: { inviteeId },
  });
}
