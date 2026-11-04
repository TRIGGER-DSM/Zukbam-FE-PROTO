import * as S from './RangeSlider.styles';

interface RangeSliderProps {
  value: readonly [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
}

export function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
}: RangeSliderProps) {
  const rangeMaximum = Math.max(min + step, max);
  const minimumValue = Math.min(rangeMaximum, Math.max(min, value[0]));
  const maximumValue = Math.min(rangeMaximum, Math.max(minimumValue, value[1]));
  return (
    <S.Root
      role="group"
      aria-label={label}
      $low={((minimumValue - min) / (rangeMaximum - min)) * 100}
      $high={((maximumValue - min) / (rangeMaximum - min)) * 100}
    >
      <S.Track />
      <S.Input
        type="range"
        min={min}
        max={rangeMaximum}
        step={step}
        value={minimumValue}
        aria-label={`${label} 최솟값`}
        aria-valuemax={maximumValue}
        $front={minimumValue === rangeMaximum}
        onChange={(event) =>
          onChange([Math.min(Number(event.target.value), maximumValue), maximumValue])
        }
      />
      <S.Input
        type="range"
        min={min}
        max={rangeMaximum}
        step={step}
        value={maximumValue}
        aria-label={`${label} 최댓값`}
        aria-valuemin={minimumValue}
        onChange={(event) =>
          onChange([minimumValue, Math.max(minimumValue, Number(event.target.value))])
        }
      />
    </S.Root>
  );
}
