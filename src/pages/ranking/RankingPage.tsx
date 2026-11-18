import * as S from './RankingPage.styles';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  getRankingCountdown,
  type CountdownPeriod,
} from '../../domains/ranking/domain/rankingCountdown';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { rankingPageOptions } from '../../domains/ranking/infrastructure/rankingApi';
import type { RankingMetric, RankingPeriod } from '../../domains/ranking/domain/leaderboard';
import { RankingAsset } from '../../domains/ranking/presentation/RankingAsset';
import { Podium } from '../../domains/ranking/presentation/Podium';
import { RankingSidebar } from '../../domains/ranking/presentation/RankingSidebar';
import { LeaderboardTable } from '../../domains/ranking/presentation/LeaderboardTable';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { useQuery } from '@tanstack/react-query';
import { myProfileOptions } from '../../domains/member/infrastructure/profileApi';
import { streakOptions } from '../../domains/activity/infrastructure/activityApi';
import { getMyRank } from '../../domains/ranking/application/getMyRank';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';

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
  const [page, setPage] = useState(0);
  const signedIn = Boolean(useAccessToken());
  const firstPage = useQuery({ ...rankingPageOptions(period, metric, 0), enabled: signedIn });
  const leaderboard = useQuery({
    ...rankingPageOptions(period, metric, page),
    enabled: signedIn && page > 0,
  });
  const result = page === 0 ? firstPage : leaderboard;
  const podium = signedIn ? (firstPage.data?.users.slice(0, 3) ?? []) : [];
  const users = signedIn ? (result.data?.users ?? []) : [];
  const rows = page === 0 && users.length > 3 ? users.slice(3) : users;
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const streak = useQuery({ ...streakOptions(), enabled: signedIn });
  const myId = signedIn && profile.data ? String(profile.data.userId) : undefined;
  const rankedMe = users.find(({ id }) => id === myId) ?? podium.find(({ id }) => id === myId);
  const myRank =
    signedIn && profile.data
      ? getMyRank(profile.data, streak.data?.currentStreak, rankedMe?.position)
      : undefined;
  return (
    <SiteLayout>
      <S.Page id="main">
        <S.Shell>
          <S.Toolbar>
            <S.Intro>
              <span>랭킹</span>
              <h1>누가 가장 높이 자랐을까요?</h1>
            </S.Intro>
            {period !== 'all' && metric !== 'streak' && <RankingCountdown period={period} />}
            <S.Filters>
              <S.Segment role="group" aria-label="랭킹 기준">
                {metrics.map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={metric === item.id}
                    onClick={() => {
                      setMetric(item.id);
                      setPage(0);
                    }}
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
                    disabled={metric === 'streak'}
                    aria-pressed={(metric === 'streak' ? 'all' : period) === item.id}
                    onClick={() => {
                      setPeriod(item.id);
                      setPage(0);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </S.PeriodSegment>
            </S.Filters>
          </S.Toolbar>
          <S.Results aria-live="polite" aria-atomic="false">
            <Podium users={podium} metric={metric} />
            {signedIn && <ApiFeedback pending={result.isPending} error={result.error} />}
            {!signedIn && (
              <S.LoginNotice>
                랭킹을 보려면 <Link to="/login">로그인</Link>해 주세요.
              </S.LoginNotice>
            )}
            {signedIn && <ApiFeedback pending={profile.isPending} error={profile.error} />}
            {signedIn && metric === 'streak' && (
              <ApiFeedback pending={streak.isPending} error={streak.error} />
            )}
            <LeaderboardTable
              rows={rows.map((row) => (row.id === myId ? { ...row, isMe: true } : row))}
              me={rankedMe && myRank ? { ...myRank, ...rankedMe, isMe: true } : myRank}
              metric={metric}
              emptyMessage={
                signedIn && result.isSuccess && !users.length ? '표시할 랭킹이 없어요.' : undefined
              }
            />
            {signedIn && (firstPage.data?.totalPages ?? 0) > 1 && (
              <S.Pagination aria-label="랭킹 페이지">
                <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)}>
                  이전
                </button>
                <span>
                  {page + 1} / {firstPage.data?.totalPages}
                </span>
                <button
                  type="button"
                  disabled={page + 1 >= (firstPage.data?.totalPages ?? 0)}
                  onClick={() => setPage(page + 1)}
                >
                  다음
                </button>
              </S.Pagination>
            )}
          </S.Results>
          <RankingSidebar me={myRank} />
        </S.Shell>
      </S.Page>
    </SiteLayout>
  );
}

function RankingCountdown({ period }: { period: CountdownPeriod }) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = window.setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  const { days, hours, minutes, seconds } = getRankingCountdown(period, now);
  const units = [
    { value: days, label: '일' },
    { value: hours, label: '시간' },
    { value: minutes, label: '분' },
    { value: seconds, label: '초' },
  ];

  return (
    <S.Countdown role="timer" aria-label="랭킹 갱신까지">
      <span aria-hidden="true">랭킹 갱신까지</span>
      <div>
        {units.map(({ value, label }) => (
          <Fragment key={label}>
            <strong>{String(value).padStart(2, '0')}</strong>
            <small>{label}</small>
          </Fragment>
        ))}
      </div>
    </S.Countdown>
  );
}
