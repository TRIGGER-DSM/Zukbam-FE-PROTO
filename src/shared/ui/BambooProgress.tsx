import styled from '@emotion/styled';
import { Image } from './Image';

/** Figma의 고정된 대나무 성장 아트. 수치 진행도는 ProgressBar를 사용합니다. */
export function BambooProgress() {
  return <Art src="/images/components/bamboo.svg" alt="대나무 성장 진행도 일러스트" />;
}

const Art = styled(Image)`
  display: block;
  width: 44.1875rem;
  max-width: 100%;
  height: auto;
`;
