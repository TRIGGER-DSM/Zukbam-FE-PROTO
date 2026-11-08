import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';
import type { ActivityDay } from '../domain/growth';

interface ActivityHeatmapProps {
  days: ActivityDay[];
}

export function ActivityHeatmap({ days }: ActivityHeatmapProps) {
  return (
    <Grid aria-label="날짜별 풀이 활동" role="img">
      {days.map((day) => (
        <Cell
          key={day.date}
          $count={day.solvedCount}
          title={`${day.date} · ${day.solvedCount}문제`}
        />
      ))}
    </Grid>
  );
}

const levels = Object.values(colors.activity);

const Grid = styled.div`
  min-width: 620px;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 4px;
`;

interface CellProps {
  $count: number;
}

const Cell = styled.span<CellProps>`
  aspect-ratio: 1;
  border-radius: 3px;
  background: ${({ $count }) => levels[Math.min(4, $count)]};
`;
