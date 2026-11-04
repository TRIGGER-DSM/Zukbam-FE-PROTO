import type { ComponentProps } from 'react';

interface ProblemAssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function ProblemAsset({ name, alt = '', ...imageProps }: ProblemAssetProps) {
  return <img {...imageProps} src={`/images/problems/${name}.svg`} alt={alt} />;
}
