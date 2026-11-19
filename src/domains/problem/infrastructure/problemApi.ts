import { queryOptions } from '@tanstack/react-query';
import { apiJson, apiResponse, getAccessToken } from '../../../shared/api/client';
import { collectPages, type PageInfo } from '../../../shared/api/pagination';
import {
  difficulties,
  problemPageSize,
  type Problem,
  type ProblemCategory,
  type ProblemCategoryCount,
} from '../domain/problem';
import type { ProblemDetail } from '../domain/problemDetail';

interface ProblemRankResponse {
  problemRankId: number;
  name: string;
  xp: number;
}

type LegacyRank = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'LEVEL_5';

export interface ProblemSummaryResponse {
  problemId: number;
  title: string;
  rank: ProblemRankResponse | LegacyRank;
  categories?: ProblemCategory[];
  solverCount?: number;
  averageAttempts?: number | null;
  status?: 'SOLVED' | 'ATTEMPTED' | 'UNATTEMPTED' | null;
}

interface ProblemListResponse extends PageInfo {
  problems: ProblemSummaryResponse[];
}

export interface ProblemTestCase {
  input: string;
  output: string;
  isSample: boolean;
}

interface ProblemDetailResponse extends ProblemSummaryResponse {
  content: string;
  memoryLimit: number;
  timeLimit: number;
  testCases: ProblemTestCase[];
}

export interface ProblemInput {
  title: string;
  content: string;
  problemRankId: number;
  timeLimit: number;
  memoryLimit: number;
  testCases: ProblemTestCase[];
}

export function problemRankOptions() {
  return queryOptions({
    queryKey: ['problem-ranks'],
    queryFn: async ({ signal }) => {
      const result = await apiJson<{ problemRanks: ProblemRankResponse[] }>('/problem-ranks', {
        signal,
      });
      return result.problemRanks;
    },
  });
}

export function problemCategoryOptions() {
  return queryOptions({
    queryKey: ['problem-categories'],
    queryFn: async ({ signal }) => {
      const result = await apiJson<{ categories: ProblemCategoryCount[] }>('/categories', {
        signal,
      });
      return result.categories;
    },
  });
}

export async function createProblem(input: ProblemInput) {
  await apiResponse('/problems', { method: 'POST', body: input, authenticated: true });
}

export interface EditableProblem extends ProblemDetailResponse {
  rank: ProblemRankResponse;
}

export function editableProblemOptions(id: number, enabled: boolean) {
  return queryOptions({
    queryKey: ['editable-problem', id, enabled],
    enabled: enabled && Number.isSafeInteger(id) && id > 0,
    gcTime: 0,
    queryFn: ({ signal }) =>
      apiJson<EditableProblem>(`/problems/${id}`, { signal, authenticated: true }),
  });
}

export async function updateProblem(id: number, input: ProblemInput) {
  await apiResponse(`/problems/${id}`, { method: 'PUT', body: input, authenticated: true });
}

export async function updateProblemCases(problem: EditableProblem, testCases: ProblemTestCase[]) {
  const id = problem.problemId;
  const latest = await apiJson<EditableProblem>(`/problems/${id}`, { authenticated: true });
  if (JSON.stringify(latest.testCases) !== JSON.stringify(problem.testCases)) {
    throw new Error('테스트케이스가 변경됐어요. 목록을 다시 확인한 뒤 저장해 주세요.');
  }
  const { title, content, memoryLimit, timeLimit, rank } = latest;
  await updateProblem(id, {
    title,
    content,
    memoryLimit,
    timeLimit,
    problemRankId: rank.problemRankId,
    testCases: testCases.map(({ input, output, isSample }) => ({ input, output, isSample })),
  });
}

export async function deleteProblem(id: number) {
  await apiResponse(`/problems/${id}`, { method: 'DELETE', authenticated: true });
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
    authenticated: 'optional',
    signal,
  });
  return { ...result, items: result.problems.map(toProblem) };
}

export function toProblem(problem: ProblemSummaryResponse): Problem {
  const statuses = {
    SOLVED: 'solved',
    ATTEMPTED: 'attempted',
    UNATTEMPTED: 'unattempted',
  } as const;
  return {
    id: problem.problemId,
    title: problem.title,
    difficulty: difficulty(problem.rank),
    xp: typeof problem.rank === 'object' ? problem.rank?.xp : undefined,
    categories: problem.categories?.map(({ name }) => name) ?? [],
    solvers: problem.solverCount,
    attempts: problem.averageAttempts ?? undefined,
    status: problem.status ? statuses[problem.status] : undefined,
  };
}

export function problemPageOptions(page: number) {
  return queryOptions({
    queryKey: ['problems', page, Boolean(getAccessToken())],
    queryFn: ({ signal }) => problemPage(page, problemPageSize, signal),
  });
}

export function problemCatalogueOptions() {
  return queryOptions({
    queryKey: ['problems', 'catalogue', Boolean(getAccessToken())],
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
        memoryLimit: `${problem.memoryLimit} KB`,
        category: problem.categories?.map(({ name }) => name).join(', ') || '—',
        friends: [],
        additionalFriends: 0,
      };
    },
  });
}
