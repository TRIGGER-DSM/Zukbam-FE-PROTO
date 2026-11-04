export interface AcceptedJudgement {
  problemId: number;
  status: 'accepted';
  earnedXp: number;
  executionTimeMs: number;
  streakDays: number;
  currentTier: string;
  nextTier: string;
  totalXp: number;
  nextTierXp: number;
}

export interface WrongJudgement {
  problemId: number;
  status: 'wrong-answer';
  submissionId: number;
  submittedAtLabel: string;
  progressPercent: number;
  languageLabel: string;
  executionTimeMs: number | null;
  memoryKb: number | null;
  codeLengthBytes: number;
  availableXp: number;
  hint: string;
}

export interface JudgementRepository {
  findAcceptedByProblemId(problemId: number): AcceptedJudgement | undefined;
  findWrongByProblemId(problemId: number): WrongJudgement | undefined;
}
