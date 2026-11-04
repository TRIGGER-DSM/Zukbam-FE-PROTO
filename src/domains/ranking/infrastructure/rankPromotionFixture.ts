import type { RankPromotion } from '../domain/rankPromotion';

// Figma preview data; opening the modal does not change the user's rank or XP.
export const rankPromotionFixture: RankPromotion = {
  previousTier: '대나무 5m',
  currentTier: '대나무 10m',
  nextTier: '금죽',
  headline: '대나무가 10m까지 자랐어요!',
  description: '꾸준히 물을 준 덕분이에요.\n다음 목표는 반짝이는 금죽이에요.',
  remainingXp: 1400,
};
