import * as S from './RankingSidebar.styles';
import type { RankedUser } from '../domain/leaderboard';
import { tierThresholds } from '../domain/leaderboard';
import { RankingAsset } from './RankingAsset';
import { ProgressBar } from '../../../shared/ui/ProgressBar';

interface RankingSidebarProps {
  me?: RankedUser;
}

export function RankingSidebar({ me }: RankingSidebarProps) {
  return (
    <S.Root aria-label={me ? '내 순위와 랭크 안내' : '랭크 안내'}>
      {me && (
        <S.MyRank>
          <S.Summary>
            <RankingAsset name="my-medal" alt="대나무 5m" />
            <h2>내 순위</h2>
            <strong>{me.position}위</strong>
            <p>상위 18.4% · 대나무 5m</p>
          </S.Summary>
          <p>다음 순위까지</p>
          <S.NextRank>
            <strong>183위까지</strong>
            <strong>12 XP</strong>
          </S.NextRank>
          <ProgressBar value={90} size="small" name="다음 순위까지 12 XP 남음" />
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
              <span>{tier.minimumXp.toLocaleString()} XP~</span>
            </li>
          ))}
        </ol>
      </S.TierGuide>
    </S.Root>
  );
}
