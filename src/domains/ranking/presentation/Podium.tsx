import * as S from './Podium.styles';
import type { RankedUser, RankingMetric } from '../domain/leaderboard';
import { RankingAsset } from './RankingAsset';

interface PodiumProps {
  users: RankedUser[];
  metric: RankingMetric;
}

export function Podium({ users, metric }: PodiumProps) {
  const unit = metric === 'xp' ? 'XP' : metric === 'solved' ? '문제' : '일';
  return (
    <S.Scene aria-label="상위 3명">
      <S.Canvas>
        <S.StageArt name="stage" />
        {[1, 2, 3].map((place) => (
          <S.Place $place={place} key={place} aria-hidden="true">
            <strong>{place}</strong>
            <RankingAsset name={`panda-${place}`} />
          </S.Place>
        ))}
        {users.map((user, index) => {
          const place = index + 1;
          return (
            <S.Badge
              key={user.id}
              $place={place}
              aria-label={`${place}위 ${user.name}, ${user[metric].toLocaleString()} ${unit}`}
            >
              {['shadow', 'shield', 'inner', 'deco', 'sparkles', 'crown'].map((layer) => (
                <S.Layer
                  key={layer}
                  name={`podium-${place}-${layer}`}
                  $layer={layer}
                  $place={place}
                />
              ))}
              <S.Layer
                name={
                  user.tier === 'black'
                    ? 'podium-1-medal'
                    : user.tier === 'gold'
                      ? 'podium-3-medal'
                      : `tier-${user.tier}`
                }
                $layer="medal"
                $place={place}
              />
              <S.CrownNumber aria-hidden="true">{place}</S.CrownNumber>
              <S.User>
                <RankingAsset name={`podium-${place}-avatar`} />
                <strong>{user.name}</strong>
              </S.User>
              <S.Score>
                <RankingAsset
                  name={metric === 'xp' ? 'xp' : metric === 'solved' ? 'solved' : 'streak'}
                />
                <span>
                  {user[metric].toLocaleString()} {unit}
                </span>
              </S.Score>
            </S.Badge>
          );
        })}
      </S.Canvas>
    </S.Scene>
  );
}
