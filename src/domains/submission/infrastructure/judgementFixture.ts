import type { JudgementRepository } from '../domain/judgement';

// Design preview data. This repository never runs code or records a submission.
export const judgementFixtureRepository: JudgementRepository = {
  findWrongByProblemId(problemId) {
    if (problemId !== 1287 && problemId !== 2579) return undefined;
    return {
      problemId,
      status: 'wrong-answer',
      submissionId: 4512,
      submittedAtLabel: '방금 전',
      progressPercent: 37,
      languageLabel: 'Python 3',
      executionTimeMs: null,
      memoryKb: null,
      codeLengthBytes: 312,
      availableXp: 20,
      hint: '연속된 세 계단은 밟을 수 없어요. dp[i]를 구할 때 "바로 전 계단을 밟은 경우"와 "두 칸 전에서 올라온 경우"를 나눠서 생각해 보세요.',
    };
  },
  findAcceptedByProblemId(problemId) {
    if (problemId !== 1287 && problemId !== 2579) return undefined;
    return {
      problemId,
      status: 'accepted',
      earnedXp: 20,
      executionTimeMs: 36,
      streakDays: 13,
      currentTier: '대나무 5m',
      nextTier: '대나무 10m',
      totalXp: 1260,
      nextTierXp: 1600,
    };
  },
};
