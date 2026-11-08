import type { ComponentProps } from 'react';
import { Image } from '../../../shared/ui/Image';

interface ProblemAssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function ProblemAsset({ name, alt = '', ...imageProps }: ProblemAssetProps) {
  return <Image {...imageProps} src={`/images/problems/${name}.svg`} alt={alt} />;
}
