import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { alpha, colors } from '../../../shared/styles/colors';

const float = keyframes`
  from { transform: translateY(3px) rotate(-5deg); }
  to { transform: translateY(-5px) rotate(5deg); }
`;

export const Content = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  text-align: center;

  h2 {
    color: ${colors.status.cautionary};
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 900;
  }

  p {
    overflow-wrap: anywhere;
    font-size: 1.125rem;
    font-weight: 700;
  }

  > span {
    color: ${colors.label.neutral};
  }

  > button {
    width: 100%;
    margin-top: 1.25rem;
  }
`;

export const Lightning = styled.div`
  display: grid;
  place-items: center;
  width: 10rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${alpha(colors.status.cautionary, 0.22)}, transparent 70%);

  img {
    width: 5rem;
    height: auto;
    filter: drop-shadow(0 0 1rem ${alpha(colors.status.cautionary, 0.5)});
    animation: ${float} 1.2s ease-in-out infinite alternate;
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      animation: none;
    }
  }
`;
