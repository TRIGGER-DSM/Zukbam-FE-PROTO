/** Figma 686:3943 — 원본 팔레트. 화면에서는 colors의 의미 토큰을 사용합니다. */
export const palette = {
  common: { 0: '#000000', 100: '#FFFFFF' },
  coolNeutral: {
    5: '#0F0F10',
    15: '#1B1C1E',
    17: '#212225',
    20: '#292A2D',
    22: '#2E2F33',
    23: '#333438',
    24: '#3C3E44',
    25: '#37383C',
    30: '#46474C',
    40: '#5A5C63',
    60: '#878A93',
    90: '#C2C4C8',
    99: '#F7F7F8',
  },
  neonGreen: { 10: '#062900', 20: '#106300', 30: '#199E00', 40: '#22D800', 50: '#39FF14' },
  orange: { 50: '#FF9200', 80: '#FFC15C' },
  red: { 70: '#FF7D7D', 60: '#D16666', 75: '#FF8F8F', 30: '#8A3434' },
  blue: { 50: '#2FA8EE', 70: '#6FA9FF', 80: '#A5E4FF' },
  mint: { 60: '#52D98F' },
  pink: { 55: '#F2456B' },
  indigo: { 55: '#5561EA' },
  yellow: { 75: '#FFE45C', 70: '#FFBE2E', 80: '#FFC94F', 85: '#FFDB6A' },
  amber: { 55: '#D18F14' },
} as const;

/** 불투명도도 원본 색을 참조하며, 입력은 0~1 범위입니다. */
export function alpha(color: string, opacity: number) {
  const channels = [1, 3, 5].map((start) => parseInt(color.slice(start, start + 2), 16));
  return `rgba(${channels.join(', ')}, ${Math.min(1, Math.max(0, opacity))})`;
}

export const colors = {
  background: {
    normal: palette.coolNeutral[15],
    alternative: palette.coolNeutral[5],
    elevated: palette.coolNeutral[17],
  },
  fill: {
    normal: palette.coolNeutral[20],
    strong: palette.coolNeutral[23],
    heavy: palette.coolNeutral[30],
    raised: palette.coolNeutral[24],
  },
  line: {
    normal: palette.coolNeutral[25],
    alternative: palette.coolNeutral[22],
    strong: palette.coolNeutral[40],
  },
  label: {
    strong: palette.common[100],
    normal: palette.coolNeutral[99],
    neutral: palette.coolNeutral[90],
    alternative: palette.coolNeutral[60],
    assistive: palette.coolNeutral[40],
    onPrimary: palette.neonGreen[10],
  },
  primary: {
    normal: palette.neonGreen[40],
    strong: palette.neonGreen[50],
    heavy: palette.neonGreen[30],
    subtle: palette.neonGreen[10],
  },
  status: {
    cautionary: palette.orange[80],
    negative: palette.red[70],
    negativeStrong: palette.red[75],
    negativeHeavy: palette.red[60],
    negativeSubtle: palette.red[30],
  },
  static: { white: palette.common[100], black: palette.common[0] },
  accent: {
    streak: palette.orange[80],
    streakStrong: palette.orange[50],
    water: palette.blue[50],
    waterLight: palette.blue[80],
  },
  activity: {
    level0: palette.coolNeutral[20],
    level1: palette.neonGreen[20],
    level2: palette.neonGreen[30],
    level3: palette.neonGreen[40],
    level4: palette.neonGreen[50],
  },
  banner: {
    hotBg: palette.pink[55],
    liveBg: palette.coolNeutral[22],
    pickBg: palette.indigo[55],
    highlight: palette.yellow[75],
    title: palette.common[100],
    sub: alpha(palette.common[100], 0.88),
    pill: alpha(palette.common[0], 0.28),
  },
  progress: {
    track: palette.coolNeutral[22],
    trackDepth: palette.coolNeutral[15],
    active: palette.yellow[70],
    activeDepth: palette.amber[55],
    activeLight: palette.yellow[85],
    complete: palette.neonGreen[40],
    completeDepth: palette.neonGreen[30],
    completeLight: palette.neonGreen[50],
  },
  friendCard: {
    red: palette.red[70],
    blue: palette.blue[70],
    green: palette.mint[60],
    yellow: palette.yellow[80],
  },
} as const;
