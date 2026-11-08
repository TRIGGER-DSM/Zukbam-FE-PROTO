import type { FriendRepository } from '../domain/friend';

export const friendFixtureRepository: FriendRepository = {
  list: () => ({
    totalCount: 18,
    items: [
      {
        id: '1111',
        name: '박지훈',
        tier: '10',
        tierLabel: '대나무 10m',
        streakDays: 21,
        recentActivity: '2시간 전 · 1912. 연속합 해결',
      },
      {
        id: '3418',
        name: '이서연',
        tier: '3',
        tierLabel: '대나무 3m',
        streakDays: 8,
        recentActivity: '어제 · 2206. 벽 부수고 이동하기 해결',
      },
      {
        id: '2212',
        name: '정도윤',
        tier: 'gold',
        tierLabel: '금죽',
        streakDays: 15,
        recentActivity: '방금 전 · 1003. 피보나치 함수 해결',
      },
      {
        id: '3212',
        name: '최유진',
        tier: '5',
        tierLabel: '대나무 5m',
        streakDays: 0,
        recentActivity: '3일 전 마지막 풀이',
      },
    ],
  }),
};
