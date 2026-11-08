import * as S from './ProblemFilters.styles';
import { difficulties, type ProblemFilters as ProblemFilterValues } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';
import { RangeFilter } from './RangeFilter';

interface ProblemFiltersProps {
  filters: ProblemFilterValues;
  onChange: (patch: Partial<ProblemFilterValues>) => void;
  onReset: () => void;
}

interface StatusOption {
  id: ProblemFilterValues['status'];
  label: string;
}

const statusOptions: StatusOption[] = [
  { id: 'all', label: '전체' },
  { id: 'solved', label: '해결' },
  { id: 'attempted', label: '시도했으나 미해결' },
  { id: 'unattempted', label: '미해결' },
];

const difficultyBounds = ['min', 'max'] as const;
const highestDifficultyIndex = difficulties.length - 1;

export function ProblemFilters({ filters, onChange, onReset }: ProblemFiltersProps) {
  const { difficultyMin, difficultyMax } = filters;

  function selectDifficulty(bound: (typeof difficultyBounds)[number], index: number) {
    if (bound === 'max') {
      onChange({ difficultyMax: index, difficultyMin: Math.min(difficultyMin, index) });
      return;
    }

    onChange({ difficultyMin: index, difficultyMax: Math.max(difficultyMax, index) });
  }

  return (
    <S.Panel aria-label="문제 필터">
      <S.Header>
        <h2>필터</h2>
        <button onClick={onReset}>
          <ProblemAsset name="refresh" />
          초기화
        </button>
      </S.Header>
      <S.Section>
        <h3>난이도</h3>
        <S.Range
          $low={`${(difficultyMin / highestDifficultyIndex) * 100}%`}
          $high={`${(difficultyMax / highestDifficultyIndex) * 100}%`}
        >
          <S.Track />
          <input
            type="range"
            min={0}
            max={highestDifficultyIndex}
            value={difficultyMin}
            aria-label="최소 난이도 슬라이더"
            aria-valuetext={difficulties[difficultyMin].label}
            onChange={(event) =>
              onChange({
                difficultyMin: Math.min(Number(event.target.value), difficultyMax),
              })
            }
          />
          <input
            type="range"
            min={0}
            max={highestDifficultyIndex}
            value={difficultyMax}
            aria-label="최대 난이도 슬라이더"
            aria-valuetext={difficulties[difficultyMax].label}
            onChange={(event) =>
              onChange({
                difficultyMax: Math.max(Number(event.target.value), difficultyMin),
              })
            }
          />
          <S.Labels>
            {difficulties.map((item) => (
              <ProblemAsset key={item.id} name={item.id} alt={item.label} />
            ))}
          </S.Labels>
        </S.Range>
        <S.DifficultyFields>
          {difficultyBounds.map((bound) => {
            const isMaximum = bound === 'max';
            const selectedIndex = isMaximum ? difficultyMax : difficultyMin;
            return (
              <label key={bound}>
                <ProblemAsset name={difficulties[selectedIndex].id} />
                <select
                  aria-label={isMaximum ? '최대 난이도' : '최소 난이도'}
                  value={selectedIndex}
                  onChange={(event) => selectDifficulty(bound, Number(event.target.value))}
                >
                  {difficulties.map((item, index) => (
                    <option key={item.id} value={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ProblemAsset name="chevron" />
              </label>
            );
          })}
          <span aria-hidden="true">···</span>
        </S.DifficultyFields>
      </S.Section>
      <S.Section>
        <S.Heading>
          <h3>분류</h3>
          <S.Logic role="group" aria-label="분류 조합">
            {(['OR', 'AND'] as const).map((logic) => (
              <button
                key={logic}
                aria-pressed={filters.categoryLogic === logic}
                onClick={() =>
                  onChange({
                    categoryLogic: logic,
                  })
                }
              >
                {logic}
              </button>
            ))}
          </S.Logic>
        </S.Heading>
        <S.CategoryInput>
          <input
            aria-label="분류 검색"
            value={filters.categories}
            placeholder="DP, 그래프, 구현…"
            onChange={(event) =>
              onChange({
                categories: event.target.value,
              })
            }
          />
          <ProblemAsset name="search-small" />
        </S.CategoryInput>
      </S.Section>
      <S.Section>
        <h3>해결 상태</h3>
        <S.StatusOptions role="group" aria-label="해결 상태">
          {statusOptions.map((status) => (
            <button
              key={status.id}
              aria-pressed={filters.status === status.id}
              onClick={() => onChange({ status: status.id })}
            >
              {status.label}
            </button>
          ))}
        </S.StatusOptions>
      </S.Section>
      <S.Section>
        <h3>해결한 사람 수</h3>
        <RangeFilter
          label="해결한 사람 수"
          ticks={[0, 1, 10, 25, 50, 75, 100, Infinity]}
          minimum={filters.minSolvers}
          maximum={filters.maxSolvers}
          onChange={(minSolvers, maxSolvers) =>
            onChange({
              minSolvers,
              maxSolvers,
            })
          }
        />
      </S.Section>
      <S.Section>
        <h3>평균 시도 횟수</h3>
        <RangeFilter
          label="평균 시도 횟수"
          ticks={[0, 1, 1.5, 2, 3, 4, 6, 8, 10, Infinity]}
          minimum={filters.minAttempts}
          maximum={filters.maxAttempts}
          onChange={(minAttempts, maxAttempts) =>
            onChange({
              minAttempts,
              maxAttempts,
            })
          }
        />
      </S.Section>
    </S.Panel>
  );
}
