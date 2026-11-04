import type { ComponentProps } from 'react';
import styled from '@emotion/styled';

interface RootStyleProps {
  $size: number;
}

interface AvatarProps extends Omit<ComponentProps<'img'>, 'src' | 'alt'> {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 40, ...props }: AvatarProps) {
  return (
    <Root src="/images/components/avatar.svg" alt={`${name} 프로필`} $size={size} {...props} />
  );
}

const Root = styled.img<RootStyleProps>`
  width: ${({ $size }) => $size / 16}rem;
  height: ${({ $size }) => $size / 16}rem;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
`;
