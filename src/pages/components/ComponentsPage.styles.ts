import { colors } from '../../shared/styles/colors';
import styled from '@emotion/styled';

export const Root = styled.div`
  background: ${colors.background.alternative};
`;

export const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
  h1 {
    margin: 0 0 2.5rem;
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: -0.025em;
  }
  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`;

export const Section = styled.section`
  margin-top: 2.5rem;
  min-width: 0;
  & > h2 {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0 0 1.25rem;
  }
`;

export const Panel = styled.div`
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${colors.background.normal};
  border: 1px solid ${colors.line.alternative};
  min-width: 0;
`;

export const Scroll = styled.div`
  overflow-x: auto;
  padding: 0.25rem 0.25rem 0.75rem;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 720px;
  border-spacing: 1rem;
  text-align: center;
  th {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    font-weight: 500;
  }
  th:first-of-type {
    text-align: left;
  }
  td {
    padding: 0.5rem 0;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Progress = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 1fr;
  align-items: center;
  gap: 1.5rem 2rem;
  max-width: 64rem;
  & > span {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
  @media (max-width: 600px) {
    grid-template-columns: 2rem 1fr 1fr;
    gap: 1.25rem 0.75rem;
  }
`;

export const Headers = styled.div`
  display: grid;
  gap: 1rem;
  overflow-x: auto;
  & > header {
    min-width: 660px;
    border: 1px solid ${colors.line.alternative};
    border-radius: 1rem;
  }
`;

export const Banner = styled.div`
  position: relative;
  height: min(21rem, calc((100vw - 64px) * 0.38889));
  margin-bottom: 1.5rem;
  overflow: hidden;
  border-radius: 1.5rem;
  @media (max-width: 700px) {
    height: calc((100vw - 2rem) * 0.38889);
  }
`;

export const Range = styled.div`
  width: 20.1875rem;
  max-width: 100%;
  display: grid;
  gap: 1rem;
  output {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
`;

export const Notice = styled.p`
  min-height: 1.5rem;
  margin: 1rem 0 0;
  color: ${colors.label.neutral};
  font-size: 0.875rem;
`;
