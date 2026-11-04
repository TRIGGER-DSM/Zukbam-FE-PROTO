export interface RankSummary {
  title: string;
  xp: number;
  nextXp: number;
  nextTitle: string;
  position: number;
  percentile: number;
}

export const rankTiers = [
  {
    label: '죽순',
    id: 'sprout',
  },
  {
    label: '1m',
    id: '1',
  },
  {
    label: '3m',
    id: '3',
  },
  {
    label: '5m',
    id: '5',
  },
  {
    label: '10m',
    id: '10',
  },
  {
    label: '금죽',
    id: 'gold',
  },
  {
    label: '오죽',
    id: 'black',
  },
] as const;
