import { useState } from 'react';
import { buildCalendar } from '../application/buildCalendar';
import type { GrowthSummary } from '../domain/growth';
import * as S from './Growth.styles';

interface StreakCalendarProps {
  summary: GrowthSummary;
}

export function StreakCalendar({ summary }: StreakCalendarProps) {
  const [displayMonth, setDisplayMonth] = useState(
    () => new Date(`${summary.referenceDate}T00:00:00`),
  );
  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();
  const days = buildCalendar(year, month, summary);

  function changeMonth(offset: number) {
    setDisplayMonth(
      (currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1),
    );
  }

  return (
    <S.Calendar aria-labelledby="streak-calendar-title">
      <h2 id="streak-calendar-title">스트릭 달력</h2>
      <S.Month>
        <button aria-label="이전 달" onClick={() => changeMonth(-1)}>
          <img src="/images/growth/previous.svg" alt="" />
        </button>
        <strong aria-live="polite">
          {year}년 {month + 1}월
        </strong>
        <button aria-label="다음 달" onClick={() => changeMonth(1)}>
          <img src="/images/growth/next.svg" alt="" />
        </button>
      </S.Month>
      <S.Grid aria-hidden="true">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <S.Label key={day}>{day}</S.Label>
        ))}
      </S.Grid>
      <S.Grid role="list" aria-label={`${year}년 ${month + 1}월 풀이 기록`}>
        {days.map((day, index) =>
          day ? (
            <S.Date
              key={day.date}
              role="listitem"
              $complete={day.completed}
              $current={day.current}
              $start={day.startsBand}
              $end={day.endsBand}
              aria-current={day.current ? 'date' : undefined}
              aria-label={`${month + 1}월 ${day.day}일 ${day.completed ? '풀이 완료' : '풀이 기록 없음'}`}
            >
              <span>{day.day}</span>
            </S.Date>
          ) : (
            <div key={`empty-${index}`} aria-hidden="true" />
          ),
        )}
      </S.Grid>
    </S.Calendar>
  );
}
