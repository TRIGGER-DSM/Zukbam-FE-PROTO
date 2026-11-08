import type { GrowthSummary } from '../domain/growth';
import * as S from './Growth.styles';

interface GrowthOverviewProps {
  summary: GrowthSummary;
}

export function GrowthOverview({ summary }: GrowthOverviewProps) {
  const stats = [
    { label: '현재 스트릭', value: summary.currentStreak },
    { label: '최장 스트릭', value: summary.longestStreak },
    { label: '활동한 날', value: summary.activeDays },
  ];

  return (
    <S.Summary>
      <S.Week aria-labelledby="growth-streak-title">
        <S.Intro>
          <div>
            <h2 id="growth-streak-title">{summary.currentStreak}일 연속 풀이 중</h2>
            <p>오늘 레슨을 진행하여 연속 학습을 새로 시작하세요!</p>
          </div>
          <img src="/images/growth/streak.svg" alt="" />
        </S.Intro>
        <S.Days aria-label="이번 주 풀이 기록">
          {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
            const completed = summary.week?.[index] ?? index < summary.completedWeekdays;
            const today = index === (summary.todayIndex ?? summary.completedWeekdays - 1);
            return (
              <S.Weekday
                key={day}
                $complete={completed}
                $today={today}
                aria-label={`${day}요일 ${completed ? '풀이 완료' : '미완료'}`}
                aria-current={today ? 'date' : undefined}
              >
                <span>{day}</span>
                {completed ? (
                  <img src={`/images/growth/${today ? 'check-today' : 'check'}.svg`} alt="" />
                ) : (
                  <S.EmptyDay aria-hidden="true" />
                )}
              </S.Weekday>
            );
          })}
        </S.Days>
      </S.Week>
      <S.Stats aria-label="성장 통계">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}일</dd>
          </div>
        ))}
      </S.Stats>
    </S.Summary>
  );
}
