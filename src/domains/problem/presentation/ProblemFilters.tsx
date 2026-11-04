import * as S from './ProblemFilters.styles';
import { difficulties, type ProblemFilters as Filters } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';
import { RangeFilter } from './RangeFilter';

interface ProblemFiltersProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}

export function ProblemFilters({ filters, onChange, onReset }: ProblemFiltersProps) {
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
        <S.Range $low={`${filters.difficultyMin * 25}%`} $high={`${filters.difficultyMax * 25}%`}>
          <S.Track />
          <input
            type="range"
            min={0}
            max={4}
            value={filters.difficultyMin}
            aria-label="최소 난이도 슬라이더"
            aria-valuetext={difficulties[filters.difficultyMin].label}
            onChange={(event) =>
              onChange({
                difficultyMin: Math.min(Number(event.target.value), filters.difficultyMax),
              })
            }
          />
          <input
            type="range"
            min={0}
            max={4}
            value={filters.difficultyMax}
            aria-label="최대 난이도 슬라이더"
            aria-valuetext={difficulties[filters.difficultyMax].label}
            onChange={(event) =>
              onChange({
                difficultyMax: Math.max(Number(event.target.value), filters.difficultyMin),
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
          {[false, true].map((isMaximum) => {
            const value = isMaximum ? filters.difficultyMax : filters.difficultyMin;
            return (
              <label key={String(isMaximum)}>
                <ProblemAsset name={difficulties[value].id} />
                <select
                  aria-label={isMaximum ? '최대 난이도' : '최소 난이도'}
                  value={value}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    onChange(
                      isMaximum
                        ? {
                            difficultyMax: next,
                            difficultyMin: Math.min(filters.difficultyMin, next),
                          }
                        : {
                            difficultyMin: next,
                            difficultyMax: Math.max(filters.difficultyMax, next),
                          },
                    );
                  }}
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
          {[
            {
              id: 'all',
              label: '전체',
            },
            {
              id: 'solved',
              label: '해결',
            },
            {
              id: 'attempted',
              label: '시도했으나 미해결',
            },
            {
              id: 'unattempted',
              label: '미해결',
            },
          ].map((status) => (
            <button
              key={status.id}
              aria-pressed={filters.status === status.id}
              onClick={() =>
                onChange({
                  status: status.id as Filters['status'],
                })
              }
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
