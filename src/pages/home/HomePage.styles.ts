import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';

export const Page = styled.main`
  display: grid;
  gap: var(--section-gap);
  max-width: var(--page-max-width);
  margin-inline: auto;
  padding: clamp(1.5rem, 3vw, 3rem) var(--page-gutter);
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 1.5rem;
  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Notices = styled.ul`
  margin-top: 1.25rem;
  li + li {
    border-top: 1px solid ${colors.line.alternative};
  }
`;

export const NoticeButton = styled.button`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  text-align: left;
  line-height: 1.6;
`;
