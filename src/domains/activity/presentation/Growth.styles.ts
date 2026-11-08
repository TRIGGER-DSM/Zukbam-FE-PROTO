import styled from '@emotion/styled';
import { alpha, colors } from '../../../shared/styles/colors';
import { HeatLevel } from './Activity.styles';

interface WeekdayStyleProps {
  $complete: boolean;
  $today: boolean;
}
interface DateStyleProps {
  $complete: boolean;
  $start: boolean;
  $end: boolean;
  $current: boolean;
}

export const Overview = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 573fr) minmax(0, 771fr);
  gap: 1.25rem;
  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
`;
export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
`;
export const Week = styled.section`
  padding: 1.25rem 1.5rem;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1rem;
  background: ${colors.background.normal};
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
export const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  > div {
    flex: 1;
    min-width: 0;
  }
  h2 {
    font-size: 2.25rem;
    line-height: 1.33;
    letter-spacing: -0.027em;
  }
  p {
    margin-top: 0.25rem;
    color: ${colors.label.alternative};
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    letter-spacing: -0.0167em;
  }
  > img {
    width: 9.375rem;
    height: 9.375rem;
    flex-shrink: 0;
  }
  @media (min-width: 1251px) and (max-width: 1700px) {
    h2 {
      font-size: 1.75rem;
    }
    p {
      font-size: 1.1875rem;
      line-height: 1.4;
    }
    > img {
      width: 6.875rem;
      height: 6.875rem;
    }
  }
  @media (max-width: 600px) {
    gap: 8px;
    h2 {
      font-size: 22px;
    }
    p {
      font-size: 14px;
      line-height: 22px;
    }
    > img {
      width: 72px;
      height: 72px;
    }
  }
`;
export const Days = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border-radius: 1rem;
  background: ${colors.fill.normal};
`;
export const Weekday = styled.li<WeekdayStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0 0.875rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: ${({ $today, $complete }) => ($today ? colors.accent.streak : $complete ? colors.label.neutral : colors.label.assistive)};
  img {
    width: 2.125rem;
    height: 2.3125rem;
  }
  @media (max-width: 600px) {
    img {
      width: 26px;
      height: auto;
    }
  }
`;
export const EmptyDay = styled.span`
  width: 2.125rem;
  height: 2.125rem;
  border: 2px dashed ${colors.line.normal};
  border-radius: 50%;
  background: ${colors.background.elevated};
  @media (max-width: 600px) {
    width: 26px;
    height: 26px;
  }
`;
export const Stats = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  flex: 1;
  min-height: 8.875rem;
  padding: 1.375rem 0.5rem;
  border-radius: 1.25rem;
  background: ${colors.background.normal};
  > div {
    text-align: center;
  }
  > div + div {
    border-left: 1px solid ${colors.line.normal};
  }
  dt {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
  dd {
    margin-top: 0.375rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }
  @media (max-width: 600px) {
    min-height: 110px;
  }
`;
export const Calendar = styled.section`
  min-width: 0;
  padding: 1.75rem;
  border-radius: 1.25rem;
  background: ${colors.background.normal};
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  h2 {
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
  @media (max-width: 600px) {
    padding: 20px 12px;
  }
`;
export const Month = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  strong {
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
  button {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: ${colors.fill.normal};
  }
  button img {
    width: 1.375rem;
    height: 1.375rem;
  }
  button:hover {
    background: ${colors.fill.strong};
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 0.375rem;
`;
export const Label = styled.span`
  display: grid;
  place-items: center;
  height: 1.75rem;
  color: ${colors.label.assistive};
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
`;
export const Date = styled.div<DateStyleProps>`
  display: grid;
  place-items: center;
  height: 3rem;
  color: ${({ $complete }) => ($complete ? colors.accent.streak : colors.label.assistive)};
  background: ${({ $complete }) => ($complete ? alpha(colors.accent.streak, 0.18) : 'transparent')};
  border-radius: ${({ $start, $end }) => `${$start ? '999px' : '0'} ${$end ? '999px 999px' : '0 0'} ${$start ? '999px' : '0'}`};
  font-size: 1rem;
  font-weight: 700;
  span {
    display: grid;
    place-items: center;
    width: 2.625rem;
    height: 2.625rem;
    border-radius: 50%;
    background: ${({ $current }) => ($current ? colors.accent.streakStrong : 'transparent')};
    color: ${({ $current }) => ($current ? colors.static.white : 'inherit')};
  }
  @media (max-width: 600px) {
    height: 40px;
    span {
      width: 32px;
      height: 32px;
    }
  }
`;
export const Activity = styled.section`
  min-width: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  background: ${colors.background.normal};
  @media (max-width: 600px) {
    padding: 20px 16px;
  }
`;
export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  h2 {
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
`;
export const Year = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem 0.375rem 0.875rem;
  border-radius: 999px;
  background: ${colors.fill.normal};
  color: ${colors.label.neutral};
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  img {
    width: 1rem;
    height: 1rem;
  }
`;
export const Scroll = styled.div`
  min-width: 0;
  overflow-x: auto;
  > div {
    min-width: 620px;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;
export const Months = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  color: ${colors.label.assistive};
  font-size: 0.875rem;
  line-height: 1.375rem;
`;
export const Legend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 0.25rem;
  color: ${colors.label.alternative};
  font-size: 0.875rem;
  line-height: 1.375rem;
  > div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: ${colors.label.assistive};
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    font-size: 12px;
  }
`;
export const Level = styled(HeatLevel)`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.1875rem;
`;
