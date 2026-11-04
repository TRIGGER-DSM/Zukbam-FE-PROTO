import type { ProblemDetail, ProblemDetailRepository } from '../domain/problemDetail';

// The problem number and text are preserved from Figma, including its 1287 identifier.
const stairProblem: ProblemDetail = {
  id: 1287,
  title: '계단 오르기',
  acceptance: 43.7,
  submissions: 4512,
  solvedCount: 1973,
  description:
    '계단 아래 시작점부터 꼭대기 도착점까지 올라가는 게임이에요. 각 계단에는 점수가 쓰여 있고, 밟은 계단의 점수를 모두 얻어요.',
  rules: [
    '한 번에 한 계단 또는 두 계단씩 오를 수 있어요.',
    '연속된 세 계단을 모두 밟을 수는 없어요.',
    '마지막 도착 계단은 반드시 밟아야 해요.',
  ],
  objective: '얻을 수 있는 총 점수의 최댓값을 구해 보세요.',
  input:
    '첫째 줄에 계단의 개수 n (1 ≤ n ≤ 300)이 주어져요. 둘째 줄부터 n개의 줄에 아래 계단부터 차례로 각 계단의 점수가 주어져요. 점수는 10,000 이하의 자연수예요.',
  output: '얻을 수 있는 총 점수의 최댓값을 출력해요.',
  examples: [
    {
      input: '6\n10\n20\n15\n25\n10\n20',
      output: '75',
    },
  ],
  difficulty: 'cup',
  difficultyDescription: '가볍게 목을 축이는 정도',
  xp: 20,
  timeLimit: '1초',
  memoryLimit: '128MB',
  category: '동적 계획법',
  friends: ['박지훈', '최유진'],
  additionalFriends: 2,
};

export const problemDetailFixtureRepository: ProblemDetailRepository = {
  findById: (id) =>
    id === stairProblem.id
      ? stairProblem
      : id === 2579
        ? {
            ...stairProblem,
            id,
          }
        : undefined,
};
