import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'large' | 'small';
  label?: string;
  name?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = 'large',
  label,
  name = '진행도',
}: ProgressBarProps) {
  const maximumValue = Number.isFinite(max) && max > 0 ? max : 100;
  const currentValue = Number.isFinite(value) ? Math.min(maximumValue, Math.max(0, value)) : 0;
  const percentage = (currentValue / maximumValue) * 100;
  return (
    <S.Root
      $size={size}
      role="progressbar"
      aria-label={name}
      aria-valuenow={currentValue}
      aria-valuemin={0}
      aria-valuemax={maximumValue}
      aria-valuetext={label}
    >
      <S.Track $size={size} />
      <S.Fill $size={size} $value={percentage} $complete={percentage === 100} />
      {label && <S.Label $size={size}>{label}</S.Label>}
    </S.Root>
  );
}
