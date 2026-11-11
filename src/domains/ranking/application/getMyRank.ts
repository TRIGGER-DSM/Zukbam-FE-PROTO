import type { UserProfile } from '../../member/infrastructure/profileApi';
import { tierThresholds, type MyRank } from '../domain/leaderboard';

export function getMyRank(profile: UserProfile, streak?: number, position?: number): MyRank {
  const xp = profile.xp ?? undefined;
  const tier =
    tierThresholds.find((tier) => tier.label === profile.rank) ??
    (xp === undefined ? undefined : tierThresholds.find((tier) => xp >= tier.minimumXp));

  return {
    id: String(profile.userId),
    name: profile.name,
    xp,
    solved: profile.solvedCount,
    streak,
    position,
    tier: tier?.id,
    rankLabel: profile.rank || tier?.label || '—',
    isMe: true,
  };
}
