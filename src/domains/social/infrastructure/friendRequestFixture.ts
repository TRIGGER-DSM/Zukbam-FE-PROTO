import type { FriendRequest } from '../domain/friend';

export const friendRequestFixture: FriendRequest[] = [
  {
    id: '20240572',
    name: '최유진',
    tier: '5',
    tierLabel: '대나무 5m',
    requestedAt: '오늘 14:32에 요청',
    status: 'pending',
  },
  {
    id: '20241740',
    name: '한예준',
    tier: '10',
    tierLabel: '대나무 10m',
    requestedAt: '어제 19:08에 요청',
    status: 'pending',
  },
  {
    id: '20240921',
    name: '박지훈',
    tier: '10',
    tierLabel: '대나무 10m',
    requestedAt: '11월 1일에 요청',
    status: 'accepted',
  },
  {
    id: '20241105',
    name: '김하은',
    tier: '3',
    tierLabel: '대나무 3m',
    requestedAt: '10월 30일에 요청',
    status: 'rejected',
  },
  {
    id: '20240847',
    name: '오민준',
    tier: 'sprout',
    tierLabel: '죽순',
    requestedAt: '10월 27일에 요청',
    status: 'accepted',
  },
];
