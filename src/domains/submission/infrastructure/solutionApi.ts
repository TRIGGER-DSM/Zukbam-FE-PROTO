import { queryOptions } from '@tanstack/react-query';
import { apiJson, apiResponse, getAccessToken } from '../../../shared/api/client';
import type { PageInfo } from '../../../shared/api/pagination';
import type { CodeLanguage } from '../domain/submission';

const languages = { python: 'Python', javascript: 'JavaScript', cpp: 'C++17' } as const;

type SolutionStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR'
  | 'COMPILE_ERROR'
  | 'INTERNAL_ERROR';

export interface Solution {
  solutionId: number;
  language: 'C99' | 'C++17' | 'Java' | 'Python' | 'JavaScript' | 'Text';
  code: string;
  memoryUsage: number | null;
  time: number | null;
  status: SolutionStatus;
  submittedAt: string;
}

interface SolutionPage extends PageInfo {
  solutions: Solution[];
}

export const solutionStatusLabels: Record<SolutionStatus, string> = {
  PENDING: '채점 중',
  ACCEPTED: '정답',
  WRONG_ANSWER: '틀렸습니다',
  TIME_LIMIT_EXCEEDED: '시간 초과',
  RUNTIME_ERROR: '런타임 오류',
  COMPILE_ERROR: '컴파일 오류',
  INTERNAL_ERROR: '채점 오류',
};

export function submitSolution(problemId: number, language: CodeLanguage, code: string) {
  return apiResponse(`/solutions/${problemId}`, {
    method: 'POST',
    body: { language: languages[language], code },
    authenticated: true,
  });
}

export function solutionHistoryOptions(problemId: number, email: string, page: number) {
  return queryOptions({
    queryKey: ['solutions', problemId, email, page],
    enabled: Boolean(email),
    queryFn: ({ signal }) => {
      const params = new URLSearchParams({
        problemId: String(problemId),
        email,
        page: String(page),
        size: '20',
      });
      return apiJson<SolutionPage>(`/solutions?${params}`, { authenticated: true, signal });
    },
    refetchInterval: (query) =>
      query.state.data?.solutions.some((solution) => solution.status === 'PENDING') ? 3000 : false,
  });
}

export function solutionOptions(solutionId: number) {
  return queryOptions({
    queryKey: ['solution', solutionId, Boolean(getAccessToken())],
    enabled: Number.isSafeInteger(solutionId) && solutionId > 0,
    queryFn: ({ signal }) =>
      apiJson<Solution>(`/solutions/${solutionId}`, { authenticated: true, signal }),
    refetchInterval: (query) => (query.state.data?.status === 'PENDING' ? 3000 : false),
  });
}

export function resultPath(problemId: number, solution: Pick<Solution, 'solutionId' | 'status'>) {
  const segment = solution.status === 'PENDING' || solution.status === 'ACCEPTED' ? '' : '/wrong';
  return `/problems/${problemId}/result${segment}?solutionId=${solution.solutionId}`;
}

export function solutionIdFromLocation(response: Response) {
  const location = response.headers.get('Location');
  if (!location) return;
  try {
    const path = new URL(location, response.url).pathname;
    const match = path.match(/\/solutions\/(\d+)\/?$/);
    const id = Number(match?.[1]);
    return Number.isSafeInteger(id) && id > 0 ? id : undefined;
  } catch {
    return undefined;
  }
}
