import * as S from './LeaderboardTable.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import {
  tierThresholds,
  type MyRank,
  type RankedUser,
  type RankingMetric,
} from '../domain/leaderboard';
import { RankingAsset } from './RankingAsset';

interface LeaderboardTableProps {
  rows: RankedUser[];
  me?: MyRank;
  metric: RankingMetric;
}

export function LeaderboardTable({ rows, me, metric }: LeaderboardTableProps) {
  const scoreLabel = metric === 'xp' ? 'XP' : metric === 'solved' ? '푼 문제 수' : '스트릭';
  const scoreIcon = metric === 'xp' ? 'xp' : metric === 'solved' ? 'solved' : 'streak';
  const renderRow = (user: RankedUser | MyRank) => (
    <S.Row key={user.id} $mine={!!user.isMe}>
      <S.Position>{user.position ?? '—'}</S.Position>
      <S.CardCell>
        <RankingAsset
          name={user.isMe ? `tier-${user.tier}` : user.tier === 'gold' ? 'card-gold' : 'card-10'}
          alt={tierThresholds.find((tier) => tier.id === user.tier)?.label}
        />
      </S.CardCell>
      <S.Score>
        <span>
          <RankingAsset name={scoreIcon} />
          {user[metric]?.toLocaleString() ?? '—'}
        </span>
      </S.Score>
      <S.User>
        <span>
          <RankingAsset name="avatar" />
          <strong>{user.name}</strong>
          {user.isMe && <small>나</small>}
        </span>
      </S.User>
      <S.Solved>
        <strong>{user.solved}</strong>
        <small>문제 해결</small>
      </S.Solved>
    </S.Row>
  );
  return (
    <S.Panel aria-label="전체 랭킹">
      <S.Table>
        <UI.HiddenCaption>
          {scoreLabel} 기준 전체 랭킹{me && '과 내 순위'}
        </UI.HiddenCaption>
        <thead>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">랭크</th>
            <th scope="col">{scoreLabel}</th>
            <th scope="col">사용자</th>
            <th scope="col">푼 문제</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(renderRow)}
          {me && (
            <>
              <S.Ellipsis aria-hidden="true">
                <td colSpan={5}>···</td>
              </S.Ellipsis>
              {renderRow(me)}
            </>
          )}
        </tbody>
      </S.Table>
    </S.Panel>
  );
}
