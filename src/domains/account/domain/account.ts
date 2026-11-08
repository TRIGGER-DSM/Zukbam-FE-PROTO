export interface AccountProfile {
  name: string;
  phone: string;
  email: string;
  joinedAt: string;
  friendCount?: number;
  rank: string;
  nextRank?: string;
  experience: number;
  nextRankExperience?: number;
}
