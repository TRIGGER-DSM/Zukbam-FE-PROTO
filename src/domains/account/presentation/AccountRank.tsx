import type { AccountProfile } from '../domain/account';
import * as S from './Account.styles';
import { tierThresholds } from '../../ranking/domain/leaderboard';

interface AccountRankProps {
  account: AccountProfile;
}

export function AccountRank({ account }: AccountRankProps) {
  const tier = tierThresholds.find((item) => item.label === account.rank);
  return (
    <S.Rank aria-labelledby="account-rank-title">
      {tier && <img src={`/images/ranking/tier-${tier.id}.svg`} alt={account.rank} />}
      <S.Progress>
        <h2 id="account-rank-title">랭크</h2>
        <h3>{account.rank}</h3>
        <S.Values>
          <strong>{account.experience.toLocaleString('ko-KR')} XP</strong>
        </S.Values>
      </S.Progress>
    </S.Rank>
  );
}
