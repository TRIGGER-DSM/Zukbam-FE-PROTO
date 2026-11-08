import { queryOptions } from '@tanstack/react-query';
import { apiJson } from '../../../shared/api/client';
import { collectPages, type PageInfo } from '../../../shared/api/pagination';
import { difficulties, problemPageSize, type Problem } from '../domain/problem';
import type { ProblemDetail } from '../domain/problemDetail';

type ProblemRank = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'LEVEL_5';

interface ProblemSummaryResponse {
  problemId: number;
  title: string;
  rank: ProblemRank;
}

interface ProblemListResponse extends PageInfo {
  problems: ProblemSummaryResponse[];
}

interface TestCaseResponse {
  input: string;
  output: string;
  isSample: boolean;
}

interface ProblemDetailResponse extends ProblemSummaryResponse {
  content: string;
  memoryLimit: number;
  timeLimit: number;
  testCases: TestCaseResponse[];
}

function difficulty(rank: ProblemRank) {
  return difficulties[Number(rank.slice(-1)) - 1].id;
}

async function problemPage(page: number, size: number, signal?: AbortSignal) {
  const result = await apiJson<ProblemListResponse>(`/problems?page=${page}&size=${size}`, {
    signal,
  });
  const items: Problem[] = result.problems.map((problem) => ({
    id: problem.problemId,
    title: problem.title,
    difficulty: difficulty(problem.rank),
    categories: [],
  }));
  return { ...result, items };
}

export function problemPageOptions(page: number) {
  return queryOptions({
    queryKey: ['problems', page],
    queryFn: ({ signal }) => problemPage(page, problemPageSize, signal),
  });
}

export function problemCatalogueOptions() {
  return queryOptions({
    queryKey: ['problems', 'catalogue'],
    queryFn: ({ signal }) =>
      collectPages((page, requestSignal) => problemPage(page, 100, requestSignal), signal),
  });
}

export function problemDetailOptions(id: number) {
  return queryOptions({
    queryKey: ['problem', id],
    enabled: Number.isSafeInteger(id) && id > 0,
    queryFn: async ({ signal }): Promise<ProblemDetail> => {
      const problem = await apiJson<ProblemDetailResponse>(`/problems/${id}`, { signal });
      return {
        id: problem.problemId,
        title: problem.title,
        description: problem.content,
        rules: [],
        objective: '',
        input: '',
        output: '',
        examples: problem.testCases.filter((testCase) => testCase.isSample),
        difficulty: difficulty(problem.rank),
        difficultyDescription: '',
        timeLimit: `${problem.timeLimit}초`,
        memoryLimit: `${problem.memoryLimit} MB`,
        category: '—',
        friends: [],
        additionalFriends: 0,
      };
    },
  });
}
