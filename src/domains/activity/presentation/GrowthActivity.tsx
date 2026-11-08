import type { GrowthSummary } from '../domain/growth';
import * as S from './Growth.styles';
import { ActivityHeatmap } from './ActivityHeatmap';
import { Image } from '../../../shared/ui/Image';

interface GrowthActivityProps {
  summary: GrowthSummary;
}

export function GrowthActivity({ summary }: GrowthActivityProps) {
  const year = Number(summary.referenceDate.slice(0, 4));
  const months = [...new Set(summary.activityDays?.map((day) => day.date.slice(0, 7)))];
  return (
    <S.Activity aria-labelledby="growth-activity-title">
      <S.Head>
        <h2 id="growth-activity-title">최근 365일 풀이 활동</h2>
        <S.Year>
          {year}년<img src="/images/growth/year-chevron.svg" alt="" />
        </S.Year>
      </S.Head>
      <S.Scroll tabIndex={0} role="region" aria-label="연간 풀이 활동, 좌우로 스크롤">
        <div>
          {summary.activityDays ? (
            <ActivityHeatmap days={summary.activityDays} />
          ) : (
            <Image src="/images/growth/heatmap.svg" alt={`${year}년 날짜별 풀이 활동`} />
          )}
          <S.Months>
            {summary.activityDays
              ? months.map((month) => <span key={month}>{Number(month.slice(-2))}월</span>)
              : Array.from({ length: 12 }, (_, month) => <span key={month}>{month + 1}월</span>)}
          </S.Months>
        </div>
      </S.Scroll>
      <S.Legend>
        <p>
          이번 달 {summary.monthlySolved}문제 · 최장 {summary.longestStreak}일
        </p>
        <div aria-label="풀이 활동 강도: 어두울수록 적음, 밝을수록 많음">
          <span>적음</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <S.Level key={level} $level={level} aria-hidden="true" />
          ))}
          <span>많음</span>
        </div>
      </S.Legend>
    </S.Activity>
  );
}
