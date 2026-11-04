import type { JudgementRepository } from '../domain/judgement';

export function getWrongJudgement(repository: JudgementRepository, id: string | undefined) {
  if (!id || !/^\d+$/.test(id)) return undefined;
  const problemId = Number(id);
  if (!Number.isSafeInteger(problemId) || problemId <= 0) return undefined;
  return repository.findWrongByProblemId(problemId);
}
