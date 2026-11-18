import styled from '@emotion/styled';
import { Link } from 'react-router';
import { colors } from '../../shared/styles/colors';

export const Filters = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(8rem, 13.2%) auto;
  gap: clamp(0.5rem, 0.625vw, 12px);

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr) auto;
    > :first-child {
      grid-column: 1 / -1;
    }
  }
`;

export const SearchButton = styled.button`
  min-width: clamp(4.5rem, 4.48vw, 86px);
  border-radius: 0.875rem;
  background: ${colors.primary.normal};
  box-shadow: 0 4px ${colors.primary.heavy};
  font-weight: 700;
`;

export const ProfileCard = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(0.75rem, 1.04vw, 20px);
  padding: clamp(1rem, 1.46vw, 28px);
  border-radius: 1.25rem;
  background: ${colors.background.normal};

  > img {
    width: clamp(3rem, 3.75vw, 72px);
    height: auto;
  }
`;

export const ProfileInfo = styled.div`
  display: grid;
  flex: 1;
  gap: 0.375rem;
  min-width: 0;
  p {
    color: ${colors.label.alternative};
    overflow-wrap: anywhere;
  }
`;

export const ProfileName = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
`;

export const GroupLink = styled(Link)`
  padding: 0.875rem clamp(1rem, 1.46vw, 28px);
  border: 1.5px solid ${colors.line.normal};
  border-radius: 0.875rem;
  background: ${colors.fill.normal};
  font-weight: 700;
  white-space: nowrap;
`;

export const Badge = styled.span<{ $color?: string }>`
  display: inline-block;
  padding: 0.1875rem 0.625rem;
  border-radius: 0.5rem;
  background: ${colors.fill.normal};
  color: ${({ $color }) => $color ?? colors.label.neutral};
  font-size: 0.875rem;
  font-weight: 700;
`;

export const CardHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const ActivityScroll = styled.div`
  overflow-x: auto;
`;

export const Calendar = styled.div`
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  gap: 0.75rem;
  min-width: 620px;
  color: ${colors.label.alternative};
  font-size: 0.875rem;
`;

export const Heatmap = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

export const Days = styled.div`
  display: grid;
  contain: size;
  grid-template-rows: repeat(7, minmax(0, 1fr));
  align-items: center;
  text-align: center;
  font-size: clamp(0.625rem, 0.73vw, 14px);
  line-height: 1;
`;

export const Months = styled.div`
  display: flex;
  grid-column: 2;
  justify-content: space-between;
  color: ${colors.label.assistive};
`;

export const ActivityFoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  color: ${colors.label.alternative};
  font-size: 0.875rem;
`;

export const Scale = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  span {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 0.1875rem;
  }
`;

export const HistoryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  color: ${colors.primary.normal};
  font-size: 0.875rem;
  font-weight: 700;
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 570px;
  border-collapse: collapse;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding-inline: clamp(0.75rem, 1.25vw, 24px);
    text-align: left;
  }
  tr > :first-child {
    width: 47%;
  }
  tr > :nth-child(n + 4) {
    text-align: right;
  }
  tbody td:last-child {
    color: ${colors.label.alternative};
  }
  thead {
    height: clamp(2.75rem, 2.5vw, 48px);
    background: ${colors.background.alternative};
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
  tbody tr {
    height: clamp(3.25rem, 3.33vw, 64px);
    border-top: 1px solid ${colors.line.alternative};
  }
`;

export const Empty = styled.p`
  padding: 1rem;
  color: ${colors.label.alternative};
  text-align: center;
`;
