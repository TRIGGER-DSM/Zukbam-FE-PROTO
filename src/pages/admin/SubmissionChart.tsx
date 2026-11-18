import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';
import { weeklySubmissions } from './dashboardData';

export type ChartInterval = 'week' | 'month';

export const chartSeries = [
  { key: 'total', label: '제출', color: colors.label.neutral },
  { key: 'correct', label: '정답', color: colors.primary.normal },
  { key: 'wrong', label: '오답', color: colors.status.negative },
] as const;

interface SubmissionChartProps {
  interval: ChartInterval;
}

export function SubmissionChart({ interval }: SubmissionChartProps) {
  const weekly = interval === 'week';
  const periodSize = weekly ? 1 : 4;
  const points = weeklySubmissions
    .filter((_, index) => index % periodSize === 0)
    .map((_, index) => {
      const weeks = weeklySubmissions.slice(index * periodSize, (index + 1) * periodSize);
      const correct = weeks.reduce((sum, week) => sum + week.correct, 0);
      const wrong = weeks.reduce((sum, week) => sum + week.wrong, 0);
      return {
        label: `${index + 1}${weekly ? '주차' : '개월차'}`,
        correct,
        wrong,
        total: correct + wrong,
      };
    });
  const axisMax = weekly ? 250 : 1000;
  const ticks = Array.from({ length: 6 }, (_, index) => (axisMax * (5 - index)) / 5);

  return (
    <Chart
      role="img"
      aria-label={points
        .map(
          ({ label, total, correct, wrong }) =>
            `${label} 제출 ${total}건, 정답 ${correct}건, 오답 ${wrong}건`,
        )
        .join('. ')}
    >
      <Axis aria-hidden="true">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </Axis>
      <Plot aria-hidden="true">
        <Grid>
          {ticks.map((tick) => (
            <span key={tick} />
          ))}
        </Grid>
        <Lines viewBox="0 0 1000 250" preserveAspectRatio="none">
          {chartSeries.map(({ key, color }) => (
            <polyline
              key={key}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              points={points
                .map(
                  (point, index) =>
                    `${(1000 * (index + 0.5)) / points.length},${250 * (1 - point[key] / axisMax)}`,
                )
                .join(' ')}
            />
          ))}
        </Lines>
        {chartSeries.flatMap(({ key, color }) =>
          points.map((point, index) => (
            <Point
              key={`${key}-${point.label}`}
              style={{
                left: `${(100 * (index + 0.5)) / points.length}%`,
                bottom: `${(100 * point[key]) / axisMax}%`,
                background: color,
              }}
            />
          )),
        )}
      </Plot>
      <Labels aria-hidden="true">
        {points.map(({ label }) => (
          <span key={label}>{label}</span>
        ))}
      </Labels>
    </Chart>
  );
}

const Chart = styled.div`
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  grid-template-rows: clamp(11rem, 14vw, 18.125rem) auto;
  gap: 0.75rem;
  margin: 0.75rem 0.75rem 0;
  color: ${colors.label.assistive};
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 600px) {
    grid-template-columns: 1.75rem minmax(0, 1fr);
    gap: 0.375rem;
    margin-inline: 0;
    font-size: 0.625rem;
  }
`;

const Axis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-block: -0.625rem;
`;

const Plot = styled.div`
  position: relative;
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    border-top: 1px solid ${colors.line.alternative};
  }
`;

const Lines = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Point = styled.span`
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid ${colors.background.normal};
  border-radius: 50%;
  transform: translate(-50%, 50%);
`;

const Labels = styled.div`
  grid-column: 2;
  display: flex;
  span {
    flex: 1;
    text-align: center;
    white-space: nowrap;
  }
`;
