import * as S from './RankingSidebar.styles';
import type { MyRank } from '../domain/leaderboard';
import { tierThresholds } from '../domain/leaderboard';
import { RankingAsset } from './RankingAsset';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { formatNumber } from '../../../shared/format';

interface RankingSidebarProps {
  me?: MyRank;
}

export function RankingSidebar({ me }: RankingSidebarProps) {
  const currentTier = tierThresholds.find((tier) => tier.id === me?.tier);
  const xp = me?.xp;
  const nextTier =
    xp === undefined
      ? undefined
      : [...tierThresholds].reverse().find((tier) => tier.minimumXp > xp);
  const remainingXp = xp !== undefined && nextTier ? nextTier.minimumXp - xp : 0;
  const progress =
    xp !== undefined && nextTier && currentTier && nextTier.minimumXp > currentTier.minimumXp
      ? Math.max(
          0,
          Math.min(
            100,
            ((xp - currentTier.minimumXp) / (nextTier.minimumXp - currentTier.minimumXp)) * 100,
          ),
        )
      : 100;
  return (
    <S.Root aria-label={me ? '내 순위와 랭크 안내' : '랭크 안내'}>
      {me && (
        <S.MyRank>
          <S.Summary>
            {me.tier && <RankingAsset name={`tier-${me.tier}`} alt={me.rankLabel} />}
            <h2>내 순위</h2>
            <strong>{me.position ? `${me.position}위` : '집계 전'}</strong>
            <p>
              {me.name} · {me.rankLabel}
            </p>
          </S.Summary>
          {xp !== undefined && (
            <>
              <p>{nextTier ? '다음 랭크까지' : '최고 랭크에 도달했어요'}</p>
              <S.NextRank>
                <strong>{nextTier?.label ?? me.rankLabel}</strong>
                <strong>{formatNumber(remainingXp)} XP</strong>
              </S.NextRank>
              <ProgressBar
                value={progress}
                size="small"
                name={nextTier ? `다음 랭크까지 ${remainingXp} XP 남음` : '최고 랭크'}
              />
            </>
          )}
        </S.MyRank>
      )}
      <S.TierGuide>
        <h2>랭크 단계</h2>
        <p>XP가 쌓이면 대나무가 자라요</p>
        <ol>
          {tierThresholds.map((tier) => (
            <li key={tier.id} aria-current={tier.id === me?.tier ? 'step' : undefined}>
              <RankingAsset name={`tier-${tier.id}`} />
              <strong>{tier.label}</strong>
              <span>{formatNumber(tier.minimumXp)} XP~</span>
            </li>
          ))}
        </ol>
      </S.TierGuide>
    </S.Root>
  );
}
