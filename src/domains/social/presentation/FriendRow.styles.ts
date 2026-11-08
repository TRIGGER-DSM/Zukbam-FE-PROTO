import styled from '@emotion/styled';
import { Avatar } from '../../../shared/ui/Avatar';
import { Button } from '../../../shared/ui/Button';
import { colors } from '../../../shared/styles/colors';

interface StreakStyleProps {
  $active: boolean;
}

export const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 0.5rem;
  & + & {
    border-top: 1px solid ${colors.line.alternative};
  }
  @media (max-width: 600px) {
    gap: 12px;
    padding-inline: 0;
    align-items: flex-start;
  }
`;

export const Profile = styled(Avatar)`
  width: 3.5rem;
  height: 3.5rem;
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;

export const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  strong {
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
  > span {
    color: ${colors.label.assistive};
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 4px;
  font-size: 0.875rem;
  line-height: 1.375rem;
`;

export const Tier = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.label.neutral};
  white-space: nowrap;
  img {
    width: 1.25rem;
    height: 1.4375rem;
  }
`;

export const Dot = styled.span`
  color: ${colors.label.assistive};
  @media (max-width: 600px) {
    display: none;
  }
`;

export const Streak = styled.span<StreakStyleProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $active }) => ($active ? colors.status.cautionary : colors.label.assistive)};
  white-space: nowrap;
  img {
    width: 1.125rem;
    height: 1.125rem;
    opacity: ${({ $active }) => ($active ? 1 : 0.35)};
  }
`;

export const Activity = styled.span`
  color: ${colors.label.alternative};
  @media (max-width: 1250px) {
    flex-basis: 100%;
  }
`;

export const Action = styled(Button)`
  flex-shrink: 0;
  min-height: 3.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.875rem;
  box-shadow: none;
  font-size: 1rem;
  line-height: 1.5rem;
  @media (max-width: 600px) {
    min-height: 36px;
    padding: 6px 12px;
  }
`;
