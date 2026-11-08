import type { ComponentProps } from 'react';
import { Image } from './Image';

interface AssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function Asset({ name, alt = '', ...imageProps }: AssetProps) {
  return <Image {...imageProps} src={`/images/home/${name}`} alt={alt} />;
}
