import type { TierId } from '../../ranking/domain/leaderboard';

export type Difficulty = 'dew' | 'cup' | 'bottle' | 'bucket' | 'rain';

export type ProblemStatus = 'solved' | 'attempted' | 'unattempted';

export type ProblemSort = 'id' | 'difficulty' | 'title' | 'solvers' | 'attempts' | 'random';

export const difficulties: {
  id: Difficulty;
  label: string;
}[] = [
  {
    id: 'dew',
    label: '이슬',
  },
  {
    id: 'cup',
    label: '물 한 컵',
  },
  {
    id: 'bottle',
    label: '물 한 병',
  },
  {
    id: 'bucket',
    label: '물 한 통',
  },
  {
    id: 'rain',
    label: '비',
  },
];

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  status: ProblemStatus;
  xp: number;
  solvers: number;
  attempts: number;
  categories: string[];
  beginner?: boolean;
}

export interface ProblemFilters {
  query: string;
  difficultyMin: number;
  difficultyMax: number;
  categories: string;
  categoryLogic: 'OR' | 'AND';
  status: 'all' | ProblemStatus;
  minSolvers: number;
  maxSolvers: number;
  minAttempts: number;
  maxAttempts: number;
  sort: ProblemSort;
  direction: 'asc' | 'desc';
  randomSeed: number;
}

export const defaultProblemFilters: ProblemFilters = {
  query: '',
  difficultyMin: 0,
  difficultyMax: 4,
  categories: '',
  categoryLogic: 'OR',
  status: 'all',
  minSolvers: 0,
  maxSolvers: Infinity,
  minAttempts: 0,
  maxAttempts: Infinity,
  sort: 'id',
  direction: 'asc',
  randomSeed: 0,
};

export interface ProblemCatalogue {
  items: Problem[];
  total: number;
  totalPages: number;
}

export interface ProblemRepository {
  getCatalogue(): ProblemCatalogue;
}

export function hasProblemFilters(filters: ProblemFilters) {
  return Boolean(
    filters.query.trim() ||
    filters.categories.trim() ||
    filters.difficultyMin > 0 ||
    filters.difficultyMax < 4 ||
    filters.status !== 'all' ||
    filters.minSolvers > 0 ||
    filters.maxSolvers < Infinity ||
    filters.minAttempts > 0 ||
    filters.maxAttempts < Infinity,
  );
}

export function filterProblems(problems: Problem[], filters: ProblemFilters) {
  const query = filters.query.trim().toLocaleLowerCase();
  const categories = filters.categories
    .split(/[,，]/)
    .map((tag) => tag.trim().toLocaleLowerCase())
    .filter(Boolean);
  const filtered = problems.filter((problem) => {
    const level = difficulties.findIndex((item) => item.id === problem.difficulty);
    const matchesCategory = (tag: string) =>
      problem.categories.some((category) => category.toLocaleLowerCase().includes(tag));
    const matchesQuery =
      !query || `${problem.id} ${problem.title}`.toLocaleLowerCase().includes(query);
    const matchesDifficulty = level >= filters.difficultyMin && level <= filters.difficultyMax;
    const matchesCategories =
      !categories.length ||
      (filters.categoryLogic === 'AND'
        ? categories.every(matchesCategory)
        : categories.some(matchesCategory));
    const matchesStatus = filters.status === 'all' || filters.status === problem.status;
    const matchesSolvers =
      problem.solvers >= filters.minSolvers && problem.solvers <= filters.maxSolvers;
    const matchesAttempts =
      problem.attempts >= filters.minAttempts && problem.attempts <= filters.maxAttempts;

    return (
      matchesQuery &&
      matchesDifficulty &&
      matchesCategories &&
      matchesStatus &&
      matchesSolvers &&
      matchesAttempts
    );
  });
  const direction = filters.direction === 'asc' ? 1 : -1;
  const randomKey = (id: number) => ((id ^ filters.randomSeed) * 2654435761) >>> 0;
  return filtered.sort((a, b) => {
    let result: number;
    switch (filters.sort) {
      case 'random':
        result = randomKey(a.id) - randomKey(b.id);
        break;
      case 'title':
        result = a.title.localeCompare(b.title, 'ko');
        break;
      case 'difficulty':
        result =
          difficulties.findIndex((item) => item.id === a.difficulty) -
          difficulties.findIndex((item) => item.id === b.difficulty);
        break;
      default:
        result = a[filters.sort] - b[filters.sort];
    }

    return result * direction || a.id - b.id;
  });
}

export interface RecommendedProblem {
  problem: Problem;
  reason: string;
  acceptance: number;
}

export type FriendCardTone = 'red' | 'blue' | 'green' | 'yellow';

export interface FriendProblem {
  problem: Problem;
  friend: string;
  time: string;
  tone: FriendCardTone;
  tier: TierId;
}
