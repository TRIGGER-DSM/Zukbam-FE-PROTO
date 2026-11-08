import type { ComponentProps } from 'react';
import { imageSources } from '../assets/imageSources';

interface ImageProps extends ComponentProps<'img'> {
  src: string;
}

export function Image({
  src,
  width,
  height,
  srcSet,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: ImageProps) {
  const optimized = imageSources[src];
  return (
    <img
      {...props}
      src={optimized?.src ?? src}
      srcSet={srcSet ?? optimized?.srcSet}
      sizes={sizes ?? (optimized ? '100vw' : undefined)}
      width={width ?? optimized?.width}
      height={height ?? optimized?.height}
      loading={loading}
      decoding={decoding}
    />
  );
}
