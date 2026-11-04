import type { ComponentProps } from 'react';

interface ProblemDetailAssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function ProblemDetailAsset({ name, alt = '', ...imageProps }: ProblemDetailAssetProps) {
  return <img {...imageProps} src={`/images/problem-detail/${name}`} alt={alt} />;
}
