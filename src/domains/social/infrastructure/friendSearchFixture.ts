import type { FriendSearchResult } from '../domain/friend';

export const friendSearchFixture: FriendSearchResult[] = [
  { id: '2113', name: '윤서준', tier: '3', tierLabel: '대나무 3m', requestStatus: 'available' },
  { id: '2312', name: '윤서아', tier: 'sprout', tierLabel: '죽순', requestStatus: 'requested' },
  { id: '2114', name: '윤서아', tier: 'sprout', tierLabel: '죽순', requestStatus: 'requested' },
  { id: '3303', name: '윤서아', tier: 'sprout', tierLabel: '죽순', requestStatus: 'requested' },
  { id: '2202', name: '윤서아', tier: 'sprout', tierLabel: '죽순', requestStatus: 'requested' },
];
