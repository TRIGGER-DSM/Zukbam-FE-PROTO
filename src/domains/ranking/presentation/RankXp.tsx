import { formatNumber } from '../../../shared/format';
import { Muted } from '../../../shared/ui/primitives.styles';
import { tierThresholds } from '../domain/leaderboard';
import * as S from './RankXp.styles';

interface RankXpProps {
  xp?: number | null;
}

export function RankXp({ xp }: RankXpProps) {
  const tierIndex = xp == null ? -1 : tierThresholds.findIndex(({ minimumXp }) => xp >= minimumXp);
  const currentTier = tierThresholds[tierIndex];
  const nextTier = tierThresholds[tierIndex - 1];
  const progress =
    xp == null || !currentTier
      ? 0
      : nextTier
        ? ((xp - currentTier.minimumXp) / (nextTier.minimumXp - currentTier.minimumXp)) * 100
        : 100;

  return (
    <>
      {xp != null && currentTier && (
        <Muted>
          {nextTier
            ? `${nextTier.label}까지 ${formatNumber(nextTier.minimumXp - xp)} XP 남았어요.`
            : '최고 랭크에 도달했어요.'}
        </Muted>
      )}
      <S.Track
        role="progressbar"
        aria-label={nextTier ? `${nextTier.label}까지 XP 진행도` : '랭크 XP 진행도'}
        aria-valuenow={Math.round(progress)}
      >
        {progress > 0 && (
          <S.Fill $progress={progress}>
            <S.Leaf name="xp-leaf.svg" alt="" />
            <S.SmallLeaf name="xp-leaf-small.svg" alt="" />
            <S.Spark name="xp-spark.svg" alt="" />
          </S.Fill>
        )}
      </S.Track>
      <S.XpLabels>
        <strong>{formatNumber(xp)} XP</strong>
        {nextTier && <span>{formatNumber(nextTier.minimumXp)} XP</span>}
      </S.XpLabels>
    </>
  );
}
