import * as S from './RankingCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import { rankTiers, type RankSummary } from '../domain/ranking';
import { Asset } from '../../../shared/ui/Asset';

interface RankingCardProps {
  rank: RankSummary;
  onShowAll: () => void;
}

export function RankingCard({ rank, onShowAll }: RankingCardProps) {
  return (
    <S.Card aria-labelledby="rank-title">
      <S.Medal name="rank-current.svg" alt={rank.title + ' 메달'} />
      <S.Progress>
        <h2 id="rank-title">내 대나무</h2>
        <h3>{rank.title}</h3>
        <UI.Muted>
          {rank.nextTitle}까지 {rank.nextXp - rank.xp} XP 남았어요.
        </UI.Muted>
        <S.Bamboo
          name="bamboo-progress.svg"
          alt={`${rank.xp.toLocaleString()} / ${rank.nextXp.toLocaleString()} XP`}
        />
        <S.XpLabels>
          <strong>{rank.xp.toLocaleString()} XP</strong>
          <span>{rank.nextXp.toLocaleString()} XP</span>
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
              $current={i === 3}
              $locked={i > 3}
              aria-current={i === 3 ? 'step' : undefined}
            >
              <Asset name={`rank-${tier.id}.svg`} />
              <strong>{tier.label}</strong>
            </S.Tier>
          ))}
        </S.Tiers>
        <UI.Muted>
          전체 {rank.position}위 · 상위 {rank.percentile}%
        </UI.Muted>
      </S.Ladder>
    </S.Card>
  );
}
