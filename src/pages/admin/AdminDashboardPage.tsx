import { useState } from 'react';
import { useSearchParams } from 'react-router';
import styled from '@emotion/styled';
import { AdminLayout } from './AdminLayout';
import { colors } from '../../shared/styles/colors';
import { groups, students } from './dashboardData';
import { SubmissionChart, chartSeries, type ChartInterval } from './SubmissionChart';
import { StudentTable } from './StudentTable';
import * as S from './AdminDashboardPage.styles';

const summary = [
  { label: '총 제출 수', value: '1,248', color: colors.label.neutral },
  { label: '정답 수', value: '842', color: colors.primary.normal },
  { label: '오답 수', value: '406', color: colors.status.negative },
  { label: '평균 정답률', value: '67.5%' },
];

export function AdminDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const group = searchParams.get('group') ?? '';
  const [period, setPeriod] = useState('28');
  const [interval, setInterval] = useState<ChartInterval>('week');

  const query = search.trim();
  const visibleStudents = students.filter(
    (student) =>
      (student.name.includes(query) || String(student.number).includes(query)) &&
      (!group || student.groups.includes(group)) &&
      student.minutesSinceSubmission < Number(period) * 24 * 60,
  );

  function resetFilters() {
    setSearch('');
    setSearchParams({});
    setPeriod('28');
    setInterval('week');
  }

  return (
    <AdminLayout>
      <S.Panel id="overview">
        <S.Heading>
          <h1>학생 풀이 현황</h1>
          <p>전체 학생의 풀이 현황과 기간별 통계를 한눈에 확인해요.</p>
        </S.Heading>
        <S.Filters>
          <S.Search>
            <img src="/images/admin/search.svg" alt="" width={20} height={20} />
            <input
              type="search"
              aria-label="학생 이름 또는 학번 검색"
              placeholder="학생 이름 또는 학번 검색"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </S.Search>
          <S.Select
            aria-label="그룹"
            value={group}
            onChange={(event) =>
              setSearchParams(event.target.value ? { group: event.target.value } : {})
            }
          >
            <option value="">전체 그룹</option>
            {groups.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </S.Select>
          <S.Select
            aria-label="최근 제출 기간"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            <option value="28">최근 4주</option>
            <option value="7">최근 1주</option>
            <option value="3">최근 3일</option>
          </S.Select>
          <IntervalSelect interval={interval} onChange={setInterval} label="통계 집계 단위" />
          <S.Reset type="button" onClick={resetFilters}>
            초기화
          </S.Reset>
        </S.Filters>
        <S.Stats aria-label="전체 풀이 요약">
          {summary.map(({ label, value, color }) => (
            <li key={label}>
              <span>
                {color && <Dot style={{ background: color }} />}
                {label}
              </span>
              <strong>{value}</strong>
            </li>
          ))}
        </S.Stats>
        <S.Card id="statistics" aria-labelledby="statistics-title">
          <S.ChartHead>
            <S.Heading>
              <h2 id="statistics-title">문제 풀이 통계</h2>
              <p>
                {interval === 'week'
                  ? '주차별 제출 수, 정답 수, 오답 수 (최근 8주)'
                  : '월별 제출 수, 정답 수, 오답 수 (최근 2개월)'}
              </p>
            </S.Heading>
            <S.Legend>
              {chartSeries.map(({ key, label, color }) => (
                <li key={key}>
                  <Dot style={{ background: color }} />
                  {label}
                </li>
              ))}
            </S.Legend>
            <IntervalSelect interval={interval} onChange={setInterval} label="차트 집계 단위" />
          </S.ChartHead>
          <SubmissionChart interval={interval} />
        </S.Card>
        <S.Card id="students" aria-labelledby="students-title">
          <h2 id="students-title">학생별 풀이 현황</h2>
          <StudentTable students={visibleStudents} />
        </S.Card>
      </S.Panel>
    </AdminLayout>
  );
}

interface IntervalSelectProps {
  interval: ChartInterval;
  onChange: (interval: ChartInterval) => void;
  label: string;
}

function IntervalSelect({ interval, onChange, label }: IntervalSelectProps) {
  return (
    <S.Select
      aria-label={label}
      value={interval}
      onChange={(event) => onChange(event.target.value === 'month' ? 'month' : 'week')}
    >
      <option value="week">주차별</option>
      <option value="month">월별</option>
    </S.Select>
  );
}

const Dot = styled.span`
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
`;
