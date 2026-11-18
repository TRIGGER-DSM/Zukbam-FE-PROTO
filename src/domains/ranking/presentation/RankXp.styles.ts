import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from '../../../shared/styles/colors';
import { Asset } from '../../../shared/ui/Asset';

export const Track = styled.div`
  position: relative;
  height: 1.625rem;
  margin-block: 1rem 0.5rem;
  border-radius: 0.3125rem;
  background: repeating-linear-gradient(90deg, #33363c 0 3.5rem, #45484f 3.5rem 3.8rem);
  box-shadow: 0 0.375rem #1e2024;
`;

interface FillProps {
  $progress: number;
}

const grow = keyframes`from { width: 0; }`;

export const Fill = styled.div<FillProps>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $progress }) => $progress}%;
  border-radius: 0.3125rem 0.125rem 0.5rem 0.3125rem;
  background:
    repeating-linear-gradient(90deg, transparent 0 3.5rem, #4e9e22 3.5rem 3.8rem),
    linear-gradient(#a6ee6a 16%, #82d946 16% 87%, #a6ee6a 87%);
  box-shadow: 0 0.375rem #5aae28;
  animation: ${grow} 0.45s ease-out;
  transition: width 0.35s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

export const Leaf = styled(Asset)`
  position: absolute;
  bottom: 75%;
  right: 0.125rem;
  transform: rotate(35deg);
`;

export const SmallLeaf = styled(Asset)`
  position: absolute;
  top: 0;
  right: 0.625rem;
  transform: rotate(30deg);
`;

export const Spark = styled(Asset)`
  position: absolute;
  bottom: 85%;
  right: 0;
  transform: translateX(65%);
`;

export const XpLabels = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: ${colors.label.assistive};
  font-size: 1rem;
  strong {
    color: ${colors.label.neutral};
  }
`;
