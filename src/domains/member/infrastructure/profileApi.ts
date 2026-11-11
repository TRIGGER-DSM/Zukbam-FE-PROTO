import { queryOptions } from '@tanstack/react-query';
import { apiJson, getAccessToken } from '../../../shared/api/client';

interface StudentInfo {
  grade: number;
  class: number;
  number: number;
}

export interface UserProfile {
  userId: number;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER';
  xp?: number | null;
  rank: string;
  solvedCount: number;
  student?: StudentInfo | null;
}

export function studentNumber(profile: UserProfile) {
  const student = profile.student;
  return student
    ? `${student.grade}${student.class}${String(student.number).padStart(2, '0')}`
    : '';
}

export function myProfileOptions() {
  return queryOptions({
    queryKey: ['me', Boolean(getAccessToken())],
    queryFn: ({ signal }) => apiJson<UserProfile>('/users/me', { authenticated: true, signal }),
  });
}

export function getUser(userId: number, signal?: AbortSignal) {
  return apiJson<UserProfile>(`/users/${userId}`, { authenticated: true, signal });
}
