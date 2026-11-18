import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';
import { Asset } from '../../shared/ui/Asset';

const gutter = 'clamp(1rem, 4.17vw, 5rem)';
const gap = 'clamp(1rem, 1.25vw, 1.5rem)';

export const Header = styled.header`
  border-bottom: 1px solid ${colors.line.alternative};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  max-width: 1920px;
  min-height: clamp(4rem, 4.17vw, 80px);
  margin-inline: auto;
  padding-inline: ${gutter};

  @media (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem;
    padding-block: 0.75rem;
  }
`;

export const Wordmark = styled(Asset)`
  width: clamp(9rem, 14.7vw, 282px);
  height: auto;
`;

export const TopNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${colors.label.alternative};
  font-weight: 700;

  > * {
    padding: 0.5rem 1rem;
    white-space: nowrap;
  }

  [aria-current] {
    border-radius: 999px;
    color: ${colors.primary.normal};
    background: ${colors.fill.heavy};
  }

  @media (max-width: 640px) {
    order: 1;
    width: 100%;
    font-size: 0.875rem;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-left: auto;
  color: ${colors.label.normal};
  font-weight: 700;
  white-space: nowrap;

  img {
    width: clamp(2rem, 2.2vw, 42px);
    height: auto;
  }

  @media (max-width: 640px) {
    gap: 0.5rem;
    font-size: 0.75rem;
  }
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: clamp(12rem, 15.625vw, 300px) minmax(0, 1fr);
  align-items: start;
  gap: ${gap};
  max-width: 1920px;
  margin-inline: auto;
  padding: clamp(1.5rem, 2.08vw, 40px) ${gutter} clamp(3rem, 5vw, 96px);

  @media (max-width: 950px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0.75rem;
  border-radius: 1.5rem;
  background: ${colors.background.elevated};

  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: 0.875rem;
    color: ${colors.label.alternative};
    font-weight: 700;
    white-space: nowrap;
  }

  a:hover,
  [aria-current] {
    color: ${colors.label.strong};
    background: ${colors.fill.strong};
  }

  @media (max-width: 950px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    padding: 0.5rem;
    a {
      padding: 0.5rem;
      gap: 0.375rem;
      font-size: 0.75rem;
    }
    img {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const Panel = styled.div`
  display: grid;
  min-width: 0;
  gap: ${gap};
  padding: clamp(1rem, 1.67vw, 32px) clamp(1rem, 1.875vw, 36px) clamp(1rem, 1.875vw, 36px);
  border-radius: 1.5rem;
  background: ${colors.background.elevated};
`;

export const Heading = styled.div`
  display: grid;
  gap: 0.25rem;
  h1 {
    font-size: clamp(1.375rem, 1.25vw, 24px);
    line-height: 1.5;
  }
  p {
    color: ${colors.label.alternative};
    line-height: 1.5;
  }
`;

export const Filters = styled.div`
  display: grid;
  grid-template-columns:
    minmax(10rem, 1fr) minmax(7rem, 13.2%) minmax(7rem, 13.2%) minmax(6rem, 11.7%)
    auto;
  gap: clamp(0.5rem, 0.625vw, 12px);

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > :first-child {
      grid-column: 1 / -1;
    }
  }
`;

export const Search = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: clamp(3rem, 2.92vw, 56px);
  padding-inline: clamp(0.625rem, 0.94vw, 18px);
  border: 1px solid ${colors.line.normal};
  border-radius: 1rem;
  background: ${colors.background.normal};
  &:focus-within {
    border-color: ${colors.primary.normal};
  }
  input {
    width: 100%;
    min-width: 0;
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
    color: ${colors.label.normal};
    font: inherit;
  }
  input::placeholder {
    color: ${colors.label.assistive};
  }
`;

export const Select = styled.select`
  appearance: none;
  min-height: clamp(3rem, 2.92vw, 56px);
  padding: 0.625rem 2.25rem 0.625rem clamp(0.625rem, 0.94vw, 18px);
  border: 1px solid ${colors.line.normal};
  border-radius: 1rem;
  color: ${colors.label.normal};
  background: ${colors.background.normal} url('/images/admin/chevron.svg') right 0.875rem center /
    1.25rem no-repeat;
  color-scheme: dark;
  cursor: pointer;
  &:focus-visible {
    outline: 1px solid ${colors.primary.normal};
  }
`;

export const Reset = styled.button`
  padding-inline: clamp(0.875rem, 1.46vw, 28px);
  border: 1.5px solid ${colors.line.normal};
  border-radius: 0.875rem;
  background: ${colors.fill.normal};
  font-weight: 700;
  white-space: nowrap;
`;

export const Stats = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(0.5rem, 0.83vw, 16px);

  li {
    display: grid;
    gap: 0.375rem;
    padding: clamp(0.875rem, 1.25vw, 24px);
    border-radius: 1.25rem;
    background: ${colors.background.normal};
  }
  li > span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: ${colors.label.alternative};
  }
  strong {
    font-size: clamp(1.5rem, 1.46vw, 28px);
    line-height: 1.35;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Card = styled.section`
  display: grid;
  min-width: 0;
  gap: clamp(0.75rem, 0.83vw, 16px);
  padding: clamp(1rem, 1.46vw, 28px);
  border-radius: 1.25rem;
  background: ${colors.background.normal};
  h2 {
    font-size: clamp(1.0625rem, 0.94vw, 18px);
    line-height: 1.5;
  }
  p {
    font-size: 0.875rem;
  }
`;

export const ChartHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  > :first-child {
    flex: 1 0 auto;
  }
  select {
    width: clamp(7rem, 7.3vw, 140px);
  }
`;

export const Legend = styled.ul`
  display: flex;
  gap: 1rem;
  color: ${colors.label.neutral};
  font-size: 0.875rem;
  li {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
`;
