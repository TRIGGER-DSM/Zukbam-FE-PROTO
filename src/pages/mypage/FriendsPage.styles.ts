import styled from '@emotion/styled';
import { Button } from '../../shared/ui/Button';
import { colors } from '../../shared/styles/colors';

export const Page = styled.main`
  max-width: var(--page-max-width);
  min-height: calc(100vh - 260px);
  margin-inline: auto;
  padding: clamp(1.5rem, 3vw, 2.5rem) var(--page-gutter) clamp(2.5rem, 6vw, 6rem);
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: clamp(13rem, 22%, 18.75rem) minmax(0, 1fr);
  align-items: start;
  gap: 1.5rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0.75rem;
  border-radius: 1.5rem;
  background: ${colors.background.elevated};
  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.875rem;
  text-align: left;
  color: ${colors.label.alternative};
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  > img {
    width: 1.375rem;
    height: 1.375rem;
  }
  > span {
    flex: 1;
  }
  &[aria-current='page'] {
    color: ${colors.static.white};
    background: ${colors.fill.strong};
  }
  > small {
    padding: 0.125rem 0.5rem;
    border-radius: 999px;
    background: ${colors.primary.normal};
    color: ${colors.label.onPrimary};
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  @media (max-width: 600px) {
    padding: 10px 8px;
    gap: 8px;
  }
`;

export const Panel = styled.section`
  min-width: 0;
  padding: 2rem 2.25rem 2.25rem;
  border-radius: 1.5rem;
  background: ${colors.background.elevated};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 600px) {
    padding: 24px 16px;
  }
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }
  p {
    color: ${colors.label.alternative};
    font-size: 1rem;
    line-height: 1.625rem;
  }
`;

export const Search = styled.form`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Field = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  > img {
    position: absolute;
    left: 1.125rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.375rem;
    height: 1.375rem;
    pointer-events: none;
  }
  input {
    display: block;
    width: 100%;
    min-height: 3.5rem;
    padding: 0.875rem 1.25rem 0.875rem 3.25rem;
    border: 1px solid ${colors.line.normal};
    border-radius: 1rem;
    background: ${colors.background.normal};
    color: ${colors.label.normal};
    font: inherit;
    font-size: 1rem;
    line-height: 1.625rem;
  }
  input::placeholder {
    color: ${colors.label.assistive};
  }
  input:focus-visible {
    outline: 2px solid ${colors.primary.normal};
    outline-offset: 2px;
  }
`;

export const SearchButton = styled(Button)`
  min-height: 3.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.875rem;
  box-shadow: none;
  font-size: 1rem;
  line-height: 1.5rem;
  @media (max-width: 600px) {
    padding-inline: 16px;
  }
`;

export const Count = styled.p`
  display: flex;
  gap: 0.375rem;
  color: ${colors.label.neutral};
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  strong {
    color: ${colors.primary.normal};
  }
`;

export const Empty = styled.div`
  padding: 48px 16px;
  text-align: center;
  strong {
    display: block;
    margin-bottom: 8px;
    font-size: 18px;
  }
  p {
    color: ${colors.label.alternative};
    line-height: 26px;
  }
`;

export const Notice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${colors.fill.strong};
  font-size: 14px;
  button {
    color: ${colors.primary.strong};
    font-weight: 700;
    white-space: nowrap;
  }
`;
