import type { ComponentProps } from 'react';

interface AssetProps extends Omit<ComponentProps<'img'>, 'src'> {
  name: string;
}

export function Asset({ name, alt = '', ...imageProps }: AssetProps) {
  return <img {...imageProps} src={`/images/home/${name}`} alt={alt} />;
}
