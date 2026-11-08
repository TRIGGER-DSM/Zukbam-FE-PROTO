import * as S from './RankingPage.styles';
import { useState } from 'react';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { getLeaderboard } from '../../domains/ranking/application/getLeaderboard';
import type { RankingMetric, RankingPeriod } from '../../domains/ranking/domain/leaderboard';
import { RankingAsset } from '../../domains/ranking/presentation/RankingAsset';
import { Podium } from '../../domains/ranking/presentation/Podium';
import { RankingSidebar } from '../../domains/ranking/presentation/RankingSidebar';
import { LeaderboardTable } from '../../domains/ranking/presentation/LeaderboardTable';
import { useAccessToken } from '../../shared/hooks/useAccessToken';

interface RankingMetricOption {
  id: RankingMetric;
  label: string;
  icon: string;
}

interface RankingPeriodOption {
  id: RankingPeriod;
  label: string;
}

const metrics: RankingMetricOption[] = [
  {
    id: 'xp',
    label: 'XP',
    icon: 'xp',
  },
  {
    id: 'solved',
    label: '푼 문제 수',
    icon: 'solved',
  },
  {
    id: 'streak',
    label: '스트릭',
    icon: 'streak',
  },
];

const periods: RankingPeriodOption[] = [
  {
    id: 'weekly',
    label: '주간',
  },
  {
    id: 'monthly',
    label: '월간',
  },
  {
    id: 'all',
    label: '전체',
  },
];

export function RankingPage() {
  const [metric, setMetric] = useState<RankingMetric>('xp');
  const [period, setPeriod] = useState<RankingPeriod>('weekly');
  const leaderboard = getLeaderboard(period, metric);
  const myRank = useAccessToken() ? leaderboard.me : undefined;
  return (
    <SiteLayout>
      <S.Page id="main">
        <S.Shell>
          <S.Toolbar>
            <S.Intro>
              <span>샘플 랭킹</span>
              <h1>누가 가장 높이 자랐을까요?</h1>
            </S.Intro>
            <S.Countdown aria-label="랭킹 갱신까지 2일 14시간 32분 8초">
              <span>랭킹 갱신까지</span>
              <div>
                <strong>02</strong>
                <small>일</small>
                <strong>14</strong>
                <small>시간</small>
                <strong>32</strong>
                <small>분</small>
                <strong>08</strong>
                <small>초</small>
              </div>
            </S.Countdown>
            <S.Filters>
              <S.Segment role="group" aria-label="랭킹 기준">
                {metrics.map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={metric === item.id}
                    onClick={() => setMetric(item.id)}
                  >
                    <RankingAsset name={item.icon} />
                    {item.label}
                  </button>
                ))}
              </S.Segment>
              <S.PeriodSegment role="group" aria-label="랭킹 기간">
                {periods.map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={period === item.id}
                    onClick={() => setPeriod(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </S.PeriodSegment>
            </S.Filters>
          </S.Toolbar>
          <S.Results aria-live="polite" aria-atomic="false">
            <Podium users={leaderboard.podium} metric={metric} />
            <LeaderboardTable rows={leaderboard.rows} me={myRank} metric={metric} />
          </S.Results>
          <RankingSidebar me={myRank} />
        </S.Shell>
      </S.Page>
    </SiteLayout>
  );
}
