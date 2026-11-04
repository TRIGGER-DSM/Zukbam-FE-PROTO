import type { Difficulty } from './problem';

export interface ProblemDetail {
  id: number;
  title: string;
  acceptance: number;
  submissions: number;
  solvedCount: number;
  description: string;
  rules: string[];
  objective: string;
  input: string;
  output: string;
  examples: {
    input: string;
    output: string;
  }[];
  difficulty: Difficulty;
  difficultyDescription: string;
  xp: number;
  timeLimit: string;
  memoryLimit: string;
  category: string;
  friends: string[];
  additionalFriends: number;
}

export interface ProblemDetailRepository {
  findById(id: number): ProblemDetail | undefined;
}
