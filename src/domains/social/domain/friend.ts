export type FriendTier = '10' | '3' | 'gold' | '5' | 'sprout';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export interface FriendRequest {
  id: string;
  friendshipId?: number;
  name: string;
  tier?: FriendTier;
  tierLabel: string;
  requestedAt: string;
  status: FriendRequestStatus;
}

export interface FriendSearchResult {
  id: string;
  studentNumber?: string;
  name: string;
  tier?: FriendTier;
  tierLabel: string;
  requestStatus: 'available' | 'requested';
}

export interface Friend {
  id: string;
  friendshipId?: number;
  name: string;
  tier?: FriendTier;
  tierLabel: string;
  streakDays?: number;
  recentActivity: string;
}

export interface FriendDirectory {
  totalCount: number;
  items: Friend[];
}

export interface FriendRepository {
  list(): FriendDirectory;
}
