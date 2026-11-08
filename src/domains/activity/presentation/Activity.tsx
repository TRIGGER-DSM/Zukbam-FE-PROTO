import * as S from './Activity.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import type { ActivitySummary } from '../domain/activity';
import { Asset } from '../../../shared/ui/Asset';
import { ActivityHeatmap } from './ActivityHeatmap';

interface StreakCardProps {
  activity: ActivitySummary;
}

export function StreakCard({ activity }: StreakCardProps) {
  return (
    <S.StreakCard aria-labelledby="streak-title">
      <S.Week>
        <h2 id="streak-title">이번 주 풀이 기록</h2>
        <UI.Muted>
          내일도 풀면 {activity.nextStreak}일째 · 최장 기록 {activity.longestStreak}일까지{' '}
          {activity.daysToRecord}일 남았어요
        </UI.Muted>
        <S.Weekdays>
          {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
            const complete = activity.week?.[index] ?? index < activity.completedWeekdays;
            const today = index === (activity.todayIndex ?? activity.completedWeekdays - 1);
            return (
              <S.Weekday key={day} $today={today}>
                <span>{day}</span>
                <S.DayCheck
                  $complete={complete}
                  $today={today}
                  aria-label={complete ? '풀이 완료' : '미완료'}
                >
                  {complete && <Asset name="check.svg" />}
                </S.DayCheck>
              </S.Weekday>
            );
          })}
        </S.Weekdays>
      </S.Week>
      <S.Count>
        <div>
          <strong>
            {activity.streak}
            <small>일</small>
          </strong>
          <UI.Muted>연속 풀이 중</UI.Muted>
        </div>
        <Asset name="streak.svg" />
      </S.Count>
    </S.StreakCard>
  );
}

interface ActivityCardProps {
  activity: ActivitySummary;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const months = [...new Set(activity.activityDays?.map((day) => day.date.slice(0, 7)))];
  return (
    <S.Card aria-labelledby="activity-title">
      <UI.Heading>
        <h2 id="activity-title">
          {activity.activityDays ? '최근 365일 풀이 활동' : `${activity.year}년 풀이 활동`}
        </h2>
        <S.Year>{activity.year}년 ▾</S.Year>
      </UI.Heading>
      <S.HeatmapScroll>
        {activity.activityDays ? (
          <ActivityHeatmap days={activity.activityDays} />
        ) : (
          <S.Heatmap name="heatmap.svg" alt={`${activity.year}년 날짜별 풀이 활동`} />
        )}
        <S.Months>
          {activity.activityDays
            ? months.map((month) => <span key={month}>{Number(month.slice(-2))}월</span>)
            : Array.from(
                {
                  length: 12,
                },
                (_, i) => <span key={i}>{i + 1}월</span>,
              )}
        </S.Months>
      </S.HeatmapScroll>
      <S.Legend>
        <p>
          이번 달 {activity.monthlySolved}문제 · 최장 {activity.longestStreak}일
        </p>
        <div>
          <span>적음</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <S.HeatLevel key={level} $level={level} />
          ))}
          <span>많음</span>
        </div>
      </S.Legend>
    </S.Card>
  );
}
