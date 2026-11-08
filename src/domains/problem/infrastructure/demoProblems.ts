import type { Problem } from '../domain/problem';
import type { ProblemDetail } from '../domain/problemDetail';
import { catalogueProblems, recommendedProblems, friendProblems } from './problemFixture';
import { problemDetailFixtureRepository } from './problemDetailFixture';

interface ProblemStatement {
  description: string;
  input: string;
  output: string;
  exampleInput: string;
  exampleOutput: string;
}

const addition: ProblemStatement = {
  description: '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하세요.',
  input: '첫째 줄에 A와 B가 주어집니다. (0 < A, B < 10)',
  output: '첫째 줄에 A+B를 출력합니다.',
  exampleInput: '1 2',
  exampleOutput: '3',
};

const statements: Record<number, ProblemStatement> = {
  1000: addition,
  1001: {
    ...addition,
    description: '두 정수 A와 B를 입력받아 A-B를 출력하는 프로그램을 작성하세요.',
    output: '첫째 줄에 A-B를 출력합니다.',
    exampleInput: '3 2',
    exampleOutput: '1',
  },
  1003: {
    description: '피보나치 수를 재귀 함수로 계산할 때 0과 1이 출력되는 횟수를 각각 구하세요.',
    input: '첫 줄에 테스트 케이스 개수 T가 주어지고, 각 줄에 0 이상 40 이하의 정수 N이 주어집니다.',
    output: '각 테스트 케이스마다 0과 1이 출력되는 횟수를 공백으로 구분해 출력합니다.',
    exampleInput: '3\n0\n1\n3',
    exampleOutput: '1 0\n0 1\n1 2',
  },
  1008: {
    ...addition,
    description:
      '두 정수 A와 B를 입력받아 A/B를 출력하세요. 절대오차 또는 상대오차가 10⁻⁹ 이하면 정답입니다.',
    output: '첫째 줄에 A/B를 출력합니다.',
    exampleInput: '1 3',
    exampleOutput: '0.3333333333333333',
  },
  1912: {
    description:
      'n개의 정수로 이루어진 수열에서 연속된 몇 개의 수를 선택해 얻을 수 있는 합 중 가장 큰 합을 구하세요. 수는 한 개 이상 선택해야 합니다.',
    input:
      '첫 줄에 n (1 ≤ n ≤ 100,000)이 주어집니다. 다음 줄에 -1,000 이상 1,000 이하의 정수 n개가 주어집니다.',
    output: '선택한 연속 부분 수열의 합 중 최댓값을 출력합니다.',
    exampleInput: '10\n10 -4 3 1 5 6 -35 12 21 -1',
    exampleOutput: '33',
  },
  9095: {
    description:
      '정수 n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하세요. 더하는 순서가 다르면 다른 방법입니다.',
    input:
      '첫 줄에 테스트 케이스의 개수 T가 주어집니다. 각 테스트 케이스에는 1 이상 10 이하의 정수 n이 주어집니다.',
    output: '각 테스트 케이스마다 방법의 수를 출력합니다.',
    exampleInput: '3\n4\n7\n10',
    exampleOutput: '7\n44\n274',
  },
  1260: {
    description:
      '주어진 무방향 그래프를 DFS와 BFS로 탐색한 결과를 출력하세요. 방문할 수 있는 정점이 여러 개면 번호가 작은 정점부터 방문합니다.',
    input:
      '첫 줄에 정점 수 N, 간선 수 M, 시작 정점 V가 주어집니다. 다음 M개 줄에 간선의 양 끝 정점 번호가 주어집니다.',
    output: '첫 줄에 DFS 방문 순서를, 둘째 줄에 BFS 방문 순서를 출력합니다.',
    exampleInput: '4 5 1\n1 2\n1 3\n1 4\n2 4\n3 4',
    exampleOutput: '1 2 4 3\n1 2 3 4',
  },
  11053: {
    description: '수열 A가 주어졌을 때 가장 긴 증가하는 부분 수열의 길이를 구하세요.',
    input:
      '첫 줄에 수열의 길이 N (1 ≤ N ≤ 1,000)이 주어집니다. 둘째 줄에 수열의 원소가 주어집니다.',
    output: '가장 긴 증가하는 부분 수열의 길이를 출력합니다.',
    exampleInput: '6\n10 20 10 30 20 50',
    exampleOutput: '4',
  },
};

const featuredProblems = [...recommendedProblems, ...friendProblems].map(({ problem }, index) => ({
  ...problem,
  solvers: 15240 - index * 829,
  attempts: Number((1.85 + index * 0.17).toFixed(2)),
}));

export const demoProblems: Problem[] = [
  ...catalogueProblems,
  {
    id: 1287,
    title: '계단 오르기',
    difficulty: 'cup',
    status: 'unattempted',
    xp: 20,
    solvers: 1973,
    attempts: 2.29,
    categories: ['DP'],
  } satisfies Problem,
  ...featuredProblems,
].sort((first, second) => first.id - second.id);

export function demoProblemDetail(id: number): ProblemDetail | undefined {
  const summary = demoProblems.find((problem) => problem.id === id);
  if (!summary) return undefined;
  const stairs = problemDetailFixtureRepository.findById(id);
  if (stairs)
    return {
      ...stairs,
      difficulty: summary.difficulty,
      xp: summary.xp,
      solvedCount: summary.solvers,
    };

  const statement = statements[id] ?? {
    description: `「${summary.title}」 시연용 문제입니다. 주어진 수열에서 가장 큰 수를 찾는 프로그램을 작성하세요.`,
    input: '첫 줄에 수의 개수 N이 주어지고, 다음 줄에 정수 N개가 주어집니다.',
    output: '입력된 정수 중 최댓값을 출력합니다.',
    exampleInput: '5\n3 1 8 2 5',
    exampleOutput: '8',
  };
  return {
    id,
    title: summary.title,
    description: statement.description,
    rules: [],
    objective: '',
    input: statement.input,
    output: statement.output,
    examples: [{ input: statement.exampleInput, output: statement.exampleOutput }],
    difficulty: summary.difficulty,
    difficultyDescription: '차근차근 도전해 보세요.',
    xp: summary.xp,
    timeLimit: '1초',
    memoryLimit: '128 MB',
    acceptance: 48.6,
    submissions: Math.round((summary.solvers ?? 0) / 0.486),
    solvedCount: summary.solvers,
    category: summary.categories.join(' · '),
    friends: ['박지훈', '최유진'],
    additionalFriends: 3,
  };
}
