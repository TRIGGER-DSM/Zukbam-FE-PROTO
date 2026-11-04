import type { ComponentProps } from 'react';

interface RankingAssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function RankingAsset({ name, alt = '', ...imageProps }: RankingAssetProps) {
  return <img {...imageProps} src={`/images/ranking/${name}.svg`} alt={alt} />;
}
