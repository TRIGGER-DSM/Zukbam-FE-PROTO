import type { ProblemDetailRepository } from '../domain/problemDetail';

export function getProblemDetail(repository: ProblemDetailRepository, id: string | undefined) {
  if (!id || !/^\d+$/.test(id)) return undefined;
  const problemId = Number(id);
  if (!Number.isSafeInteger(problemId) || problemId <= 0) return undefined;
  return repository.findById(problemId);
}
