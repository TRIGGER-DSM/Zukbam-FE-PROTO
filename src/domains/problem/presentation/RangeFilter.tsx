import * as S from './RangeFilter.styles';
import * as Filters from './ProblemFilters.styles';
import { ProblemAsset } from './ProblemAsset';

interface RangeFilterProps {
  label: string;
  ticks: number[];
  minimum: number;
  maximum: number;
  onChange: (minimum: number, maximum: number) => void;
}

export function RangeFilter({ label, ticks, minimum, maximum, onChange }: RangeFilterProps) {
  const findClosestTickIndex = (value: number) =>
    value === Infinity
      ? ticks.length - 1
      : ticks.reduce(
          (closestIndex, tick, index) =>
            Math.abs(tick - value) < Math.abs(ticks[closestIndex] - value) ? index : closestIndex,
          0,
        );
  const minimumTickIndex = findClosestTickIndex(minimum);
  const maximumTickIndex = findClosestTickIndex(maximum);
  return (
    <S.Field>
      <S.Range
        $low={`${(minimumTickIndex / (ticks.length - 1)) * 100}%`}
        $high={`${(maximumTickIndex / (ticks.length - 1)) * 100}%`}
      >
        <Filters.Track />
        <input
          type="range"
          min={0}
          max={ticks.length - 1}
          value={minimumTickIndex}
          aria-label={`${label} 최솟값 슬라이더`}
          aria-valuetext={String(minimum)}
          onChange={(event) =>
            onChange(Math.min(ticks[Number(event.target.value)], maximum), maximum)
          }
        />
        <input
          type="range"
          min={0}
          max={ticks.length - 1}
          value={maximumTickIndex}
          aria-label={`${label} 최댓값 슬라이더`}
          aria-valuetext={maximum === Infinity ? '제한 없음' : String(maximum)}
          onChange={(event) =>
            onChange(minimum, Math.max(minimum, ticks[Number(event.target.value)]))
          }
        />
        <Filters.Labels>
          {ticks.map((tick) => (
            <span key={tick}>{tick === Infinity ? '∞' : tick}</span>
          ))}
        </Filters.Labels>
      </S.Range>
      <S.Inputs>
        <input
          type="number"
          min={0}
          step="any"
          aria-label={`${label} 최솟값`}
          value={minimum || ''}
          placeholder="0"
          onChange={(event) =>
            onChange(Math.min(Math.max(0, Number(event.target.value)), maximum), maximum)
          }
        />
        <span>···</span>
        <input
          type="number"
          min={minimum}
          step="any"
          aria-label={`${label} 최댓값`}
          value={maximum === Infinity ? '' : maximum}
          placeholder="∞"
          onChange={(event) =>
            onChange(
              minimum,
              event.target.value === '' ? Infinity : Math.max(minimum, Number(event.target.value)),
            )
          }
        />
        <button
          type="button"
          aria-label={`${label} 범위 적용`}
          onClick={() => onChange(minimum, maximum)}
        >
          <ProblemAsset name="search-small" />
        </button>
      </S.Inputs>
    </S.Field>
  );
}
