import type { ComponentProps } from 'react';
import * as S from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type ButtonState = 'default' | 'hover' | 'active' | 'focus';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  previewState?: ButtonState;
}

export function Button({
  variant = 'primary',
  previewState = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return <S.Root type={type} $variant={variant} $state={previewState} {...props} />;
}
