import * as S from './RankingPage.styles';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  getRankingCountdown,
  type CountdownPeriod,
} from '../../domains/ranking/domain/rankingCountdown';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { rankingOptions } from '../../domains/ranking/infrastructure/rankingApi';
import type { RankingMetric, RankingPeriod } from '../../domains/ranking/domain/leaderboard';
import { RankingAsset } from '../../domains/ranking/presentation/RankingAsset';
import { Podium } from '../../domains/ranking/presentation/Podium';
import { RankingSidebar } from '../../domains/ranking/presentation/RankingSidebar';
import { LeaderboardTable } from '../../domains/ranking/presentation/LeaderboardTable';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
  const signedIn = Boolean(useAccessToken());
  const result = useInfiniteQuery({ ...rankingOptions(period, metric), enabled: signedIn });
  const users = signedIn
    ? [
        ...new Map(
          result.data?.pages.flatMap(({ users }) => users).map((user) => [user.id, user]),
        ).values(),
      ]
    : [];
  const podium = users.slice(0, 3);
  const rows = users.slice(3);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { hasNextPage, isFetching, isFetchNextPageError, fetchNextPage } = result;

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !signedIn || !hasNextPage || isFetching || isFetchNextPageError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void fetchNextPage({ cancelRefetch: false });
      },
      { rootMargin: '240px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [signedIn, hasNextPage, isFetching, isFetchNextPageError, fetchNextPage]);
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const streak = useQuery({ ...streakOptions(), enabled: signedIn });
  const myId = signedIn && profile.data ? String(profile.data.userId) : undefined;
  const rankedMe = users.find(({ id }) => id === myId);
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
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </S.PeriodSegment>
            </S.Filters>
          </S.Toolbar>
          {signedIn ? (
            <S.Results aria-live="polite" aria-atomic="false">
              <Podium users={podium} metric={metric} />
              <ApiFeedback
                pending={result.isPending}
                error={isFetchNextPageError ? null : result.error}
              />
              <ApiFeedback pending={profile.isPending} error={profile.error} />
              {metric === 'streak' && (
                <ApiFeedback pending={streak.isPending} error={streak.error} />
              )}
              <LeaderboardTable
                rows={rows.map((row) => (row.id === myId ? { ...row, isMe: true } : row))}
                me={rankedMe && myRank ? { ...myRank, ...rankedMe, isMe: true } : myRank}
                metric={metric}
                emptyMessage={
                  result.isSuccess && !users.length ? '표시할 랭킹이 없어요.' : undefined
                }
              />
              <S.LoadMore ref={loadMoreRef}>
                <ApiFeedback
                  pending={result.isFetchingNextPage}
                  error={isFetchNextPageError ? result.error : null}
                />
                {hasNextPage && !result.isFetchingNextPage && (
                  <button
                    type="button"
                    disabled={isFetching}
                    onClick={() => void fetchNextPage({ cancelRefetch: false })}
                  >
                    {isFetchNextPageError ? '다시 시도' : '순위 더 보기'}
                  </button>
                )}
              </S.LoadMore>
            </S.Results>
          ) : (
            <GuestRanking metric={metric} />
          )}
          <RankingSidebar me={myRank} />
        </S.Shell>
      </S.Page>
    </SiteLayout>
  );
}

function GuestRanking({ metric }: { metric: RankingMetric }) {
  return (
    <S.Results>
      <Podium users={[]} metric={metric} />
      <LeaderboardTable
        rows={[]}
        metric={metric}
        preview={
          <S.LoginNotice>
            <p>로그인하면 전체 순위와 내 순위를 볼 수 있어요.</p>
            <Link to="/login">로그인</Link>
          </S.LoginNotice>
        }
      />
    </S.Results>
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
