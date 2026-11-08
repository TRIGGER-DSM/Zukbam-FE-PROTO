import type { UserProfile } from '../../member/infrastructure/profileApi';
import { tierThresholds, type MyRank } from '../domain/leaderboard';

export function getMyRank(profile: UserProfile, streak?: number, position?: number): MyRank {
  const tier =
    tierThresholds.find((tier) => tier.label === profile.rank) ??
    tierThresholds.find((tier) => profile.score >= tier.minimumXp)!;

  return {
    id: String(profile.userId),
    name: profile.name,
    xp: profile.score,
    solved: profile.solvedCount,
    streak,
    position,
    tier: tier.id,
    rankLabel: profile.rank || tier.label,
    isMe: true,
  };
}
