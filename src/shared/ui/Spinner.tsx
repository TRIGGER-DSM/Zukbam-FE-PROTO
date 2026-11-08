import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export function Spinner() {
  return <Icon aria-hidden="true" />;
}

const spin = keyframes`to { transform: rotate(360deg); }`;

const Icon = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
