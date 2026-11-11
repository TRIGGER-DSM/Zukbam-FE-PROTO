export interface AccountProfile {
  userId: number;
  name: string;
  phone: string;
  email: string;
  joinedAt: string;
  friendCount?: number;
  rank: string;
  nextRank?: string;
  experience?: number | null;
  nextRankExperience?: number;
}
