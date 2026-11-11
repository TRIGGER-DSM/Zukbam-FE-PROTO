export type RankingMetric = 'xp' | 'solved' | 'streak';

export type RankingPeriod = 'weekly' | 'monthly' | 'all';

export type TierId = 'sprout' | '1' | '3' | '5' | '10' | 'gold' | 'black';

export interface RankedUser {
  id: string;
  name: string;
  position: number;
  xp: number;
  solved: number;
  streak: number;
  tier: TierId;
  isMe?: boolean;
}

export interface MyRank extends Omit<RankedUser, 'position' | 'streak' | 'xp' | 'tier'> {
  position?: number;
  streak?: number;
  xp?: number;
  tier?: TierId;
  rankLabel: string;
}

export const tierThresholds: {
  id: TierId;
  label: string;
  minimumXp: number;
}[] = [
  {
    id: 'black',
    label: '오죽',
    minimumXp: 6000,
  },
  {
    id: 'gold',
    label: '금죽',
    minimumXp: 3000,
  },
  {
    id: '10',
    label: '대나무 10m',
    minimumXp: 1600,
  },
  {
    id: '5',
    label: '대나무 5m',
    minimumXp: 800,
  },
  {
    id: '3',
    label: '대나무 3m',
    minimumXp: 300,
  },
  {
    id: '1',
    label: '대나무 1m',
    minimumXp: 100,
  },
  {
    id: 'sprout',
    label: '죽순',
    minimumXp: 0,
  },
];

export function sortLeaderboard(users: RankedUser[], metric: RankingMetric): RankedUser[] {
  return [...users]
    .sort((a, b) => b[metric] - a[metric] || a.position - b.position)
    .map((user, index) => ({
      ...user,
      position: index + 1,
    }));
}
