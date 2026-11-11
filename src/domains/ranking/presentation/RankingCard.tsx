import { formatNumber } from '../../../shared/format';
import * as S from './RankingCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import { rankTiers, type RankSummary } from '../domain/ranking';
import { Asset } from '../../../shared/ui/Asset';
import { tierThresholds } from '../domain/leaderboard';
import type { ReactNode } from 'react';

interface RankingCardProps {
  rank?: RankSummary;
  children?: ReactNode;
  onShowAll: () => void;
}

export function RankingCard({ rank, onShowAll, children }: RankingCardProps) {
  const tier = tierThresholds.find((item) => item.label === rank?.title);
  const currentTierIndex = rankTiers.findIndex((item) => item.id === tier?.id);
  const xp = rank?.xp;
  const nextXp = rank?.nextXp;
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
        {xp != null && nextXp != null ? (
          <>
            <UI.Muted>
              {rank?.nextTitle}까지 {nextXp - xp} XP 남았어요.
            </UI.Muted>
            <S.Bamboo
              name="bamboo-progress.svg"
              alt={`${formatNumber(xp)} / ${formatNumber(nextXp)} XP`}
            />
          </>
        ) : (
          <S.Track aria-hidden="true" />
        )}
        <S.XpLabels>
          <strong>{formatNumber(xp)} XP</strong>
          {nextXp != null && <span>{formatNumber(nextXp)} XP</span>}
        </S.XpLabels>
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
