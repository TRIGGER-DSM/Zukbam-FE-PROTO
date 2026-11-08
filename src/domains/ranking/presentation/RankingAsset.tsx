import type { ComponentProps } from 'react';
import { Image } from '../../../shared/ui/Image';

interface RankingAssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function RankingAsset({ name, alt = '', ...imageProps }: RankingAssetProps) {
  return <Image {...imageProps} src={`/images/ranking/${name}.svg`} alt={alt} />;
}
