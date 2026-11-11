import { queryOptions } from '@tanstack/react-query';
import { apiJson } from '../../../shared/api/client';
import { collectPages, type PageInfo } from '../../../shared/api/pagination';
import { difficulties, problemPageSize, type Problem } from '../domain/problem';
import type { ProblemDetail } from '../domain/problemDetail';

interface ProblemRankResponse {
  problemRankId: number;
  name: string;
  xp: number;
}

type LegacyRank = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'LEVEL_5';

interface ProblemSummaryResponse {
  problemId: number;
  title: string;
  rank: ProblemRankResponse | LegacyRank;
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

function difficulty(rank: ProblemSummaryResponse['rank']) {
  const name = typeof rank === 'string' ? rank : rank?.name;
  const match = difficulties.find(
    (item, index) => item.label === name?.trim() || name === `LEVEL_${index + 1}`,
  );
  if (!match) throw new Error('문제 난이도 정보를 확인할 수 없어요.');
  return match.id;
}

async function problemPage(page: number, size: number, signal?: AbortSignal) {
  const result = await apiJson<ProblemListResponse>(`/problems?page=${page}&size=${size}`, {
    signal,
  });
  const items: Problem[] = result.problems.map((problem) => ({
    id: problem.problemId,
    title: problem.title,
    difficulty: difficulty(problem.rank),
    xp: typeof problem.rank === 'object' ? problem.rank?.xp : undefined,
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
        xp: typeof problem.rank === 'object' ? problem.rank?.xp : undefined,
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
