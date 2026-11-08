import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';

interface SampleStyleProps {
  $color: string;
}

export const Root = styled.div`
  min-height: 100vh;
  background: ${colors.background.alternative};
  color: ${colors.label.strong};
`;

export const Main = styled.main`
  max-width: 74.5rem;
  margin: 0 auto;
  padding: 3.5rem;
  display: grid;
  gap: 2.5rem;
  @media (max-width: 600px) {
    padding: 2rem 1rem;
    gap: 2rem;
  }
`;

export const Header = styled.header`
  display: grid;
  gap: 0.625rem;
  h1 {
    font-size: 2rem;
    line-height: 2.625rem;
    font-weight: 900;
    letter-spacing: -0.025em;
  }
  p {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
  a {
    color: ${colors.primary.strong};
    font-size: 0.875rem;
    justify-self: start;
  }
`;

export const Title = styled.div`
  display: grid;
  gap: 0.25rem;
  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  p {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;

export const Group = styled.section`
  display: grid;
  gap: 0.875rem;
  h3 {
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 10.625rem), 1fr));
  gap: 1.25rem 1rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Swatch = styled.div`
  display: grid;
  gap: 0.5rem;
  align-content: start;
  min-width: 0;
  strong {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  span {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    line-height: 1.375rem;
    overflow-wrap: anywhere;
  }
`;

export const Sample = styled.div<SampleStyleProps>`
  height: 4.5rem;
  background: ${({ $color }) => $color};
  border: 1px solid ${colors.line.normal};
  border-radius: 0.875rem;
`;
