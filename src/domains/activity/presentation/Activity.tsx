import * as S from './Activity.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import type { ActivitySummary } from '../domain/activity';
import { Asset } from '../../../shared/ui/Asset';

interface StreakCardProps {
  activity: ActivitySummary;
}

export function StreakCard({ activity }: StreakCardProps) {
  return (
    <S.StreakCard aria-labelledby="streak-title">
      <S.Week>
        <h2 id="streak-title">오늘도 불꽃을 지켰어요!</h2>
        <UI.Muted>
          내일도 풀면 {activity.nextStreak}일째 · 최장 기록 {activity.longestStreak}일까지{' '}
          {activity.daysToRecord}일 남았어요
        </UI.Muted>
        <S.Weekdays>
          {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => (
            <S.Weekday key={day} $today={i === activity.completedWeekdays - 1}>
              <span>{day}</span>
              <S.DayCheck
                $complete={i < activity.completedWeekdays}
                $today={i === activity.completedWeekdays - 1}
                aria-label={i < activity.completedWeekdays ? '풀이 완료' : '미완료'}
              >
                {i < activity.completedWeekdays && <Asset name="check.svg" />}
              </S.DayCheck>
            </S.Weekday>
          ))}
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
  return (
    <S.Card aria-labelledby="activity-title">
      <UI.Heading>
        <h2 id="activity-title">{activity.year}년 풀이 활동</h2>
        <S.Year>{activity.year}년 ▾</S.Year>
      </UI.Heading>
      <S.HeatmapScroll>
        <S.Heatmap name="heatmap.svg" alt={`${activity.year}년 날짜별 풀이 활동`} />
        <S.Months>
          {Array.from(
            {
              length: 12,
            },
            (_, i) => (
              <span key={i}>{i + 1}월</span>
            ),
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
