import type { ComponentProps } from 'react';
import { Image } from '../../../shared/ui/Image';

interface ProblemDetailAssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function ProblemDetailAsset({ name, alt = '', ...imageProps }: ProblemDetailAssetProps) {
  return <Image {...imageProps} src={`/images/problem-detail/${name}`} alt={alt} />;
}
