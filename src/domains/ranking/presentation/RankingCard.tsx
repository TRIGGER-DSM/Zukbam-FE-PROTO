import * as S from './RankingCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import { rankTiers, type RankSummary } from '../domain/ranking';
import { Asset } from '../../../shared/ui/Asset';
import { tierThresholds } from '../domain/leaderboard';
import { RankXp } from './RankXp';
import type { ReactNode } from 'react';

interface RankingCardProps {
  rank?: RankSummary;
  children?: ReactNode;
  onShowAll: () => void;
}

export function RankingCard({ rank, onShowAll, children }: RankingCardProps) {
  const xp = rank?.xp;
  const tier =
    tierThresholds.find((item) => item.label === rank?.title) ??
    tierThresholds.find(({ minimumXp }) => xp != null && xp >= minimumXp);
  const currentTierIndex = rankTiers.findIndex((item) => item.id === tier?.id);
  return (
    <S.Card aria-labelledby="rank-title">
      <S.Medal
        name={tier ? `rank-${tier.id}.svg` : 'rank-current.svg'}
        alt={tier ? `${tier.label} 메달` : ''}
      />
      <S.Progress>
        <h2 id="rank-title">랭크</h2>
        <h3>{rank?.title ?? '—'}</h3>
        {children}
        <RankXp xp={xp} />
      </S.Progress>
      <S.Ladder>
        <UI.Heading>
          <h2>랭크 단계</h2>
          <button onClick={onShowAll}>전체</button>
        </UI.Heading>
        <S.Tiers>
          {rankTiers.map((tier, i) => (
            <S.Tier
              key={tier.label}
              $current={i === currentTierIndex}
              $locked={currentTierIndex >= 0 && i > currentTierIndex}
              aria-current={i === currentTierIndex ? 'step' : undefined}
            >
              <Asset name={`rank-${tier.id}.svg`} />
              <strong>{tier.label}</strong>
            </S.Tier>
          ))}
        </S.Tiers>
        {rank?.position !== undefined && rank.percentile !== undefined && (
          <UI.Muted>
            전체 {rank.position}위 · 상위 {rank.percentile}%
          </UI.Muted>
        )}
      </S.Ladder>
    </S.Card>
  );
}
