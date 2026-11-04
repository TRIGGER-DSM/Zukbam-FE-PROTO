import * as S from './ProblemsPage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import {
  defaultProblemFilters,
  type ProblemFilters as Filters,
  type ProblemSort,
} from '../../domains/problem/domain/problem';
import { getProblems } from '../../domains/problem/application/getProblems';
import {
  problemFixtureRepository,
  recommendedProblems,
  friendProblems,
} from '../../domains/problem/infrastructure/problemFixture';
import { ProblemAsset } from '../../domains/problem/presentation/ProblemAsset';
import { ProblemDiscovery } from '../../domains/problem/presentation/ProblemDiscovery';
import { ProblemFilters } from '../../domains/problem/presentation/ProblemFilters';
import { ProblemTable } from '../../domains/problem/presentation/ProblemTable';
import { problemDetailPath } from '../../domains/problem/presentation/problemDetailPath';

const sorts: {
  id: ProblemSort;
  label: string;
}[] = [
  {
    id: 'id',
    label: '번호',
  },
  {
    id: 'difficulty',
    label: '난이도',
  },
  {
    id: 'title',
    label: '제목',
  },
  {
    id: 'solvers',
    label: '푼 사람 수',
  },
  {
    id: 'attempts',
    label: '평균 시도',
  },
  {
    id: 'random',
    label: '랜덤',
  },
];

function pageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7)
    return Array.from(
      {
        length: total,
      },
      (_, i) => i + 1,
    );
  if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis', total];
  if (current >= total - 3)
    return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
  return [1, 'left-gap', current - 1, current, current + 1, 'right-gap', total];
}

export function ProblemsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    ...defaultProblemFilters,
  });
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState<string | null>(null);
  const result = getProblems(problemFixtureRepository, filters, page);
  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((current) => ({
      ...current,
      ...patch,
    }));
    setPage(1);
  };
  const reset = () => {
    setFilters({
      ...defaultProblemFilters,
    });
    setQuery('');
    setPage(1);
  };
  const selectSort = (sort: ProblemSort) =>
    updateFilters({
      sort,
      direction:
        filters.sort === sort && filters.direction === 'asc' && sort !== 'random' ? 'desc' : 'asc',
      randomSeed: sort === 'random' ? Date.now() : filters.randomSeed,
    });

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateFilters({ query });
  }

  return (
    <SiteLayout onNavigate={setPending}>
      <S.sPage id="main">
        <UI.HiddenHeading>문제 목록</UI.HiddenHeading>
        <ProblemDiscovery
          recommended={recommendedProblems}
          friends={friendProblems}
          onSelect={(problem) => navigate(problemDetailPath(problem.id))}
        />
        <S.Browse>
          <ProblemFilters filters={filters} onChange={updateFilters} onReset={reset} />
          <S.Results aria-label="문제 검색 결과">
            <S.Search role="search" onSubmit={handleSearchSubmit}>
              <S.SearchInput
                type="search"
                enterKeyHint="search"
                aria-label="문제 번호나 제목 검색"
                placeholder="문제 번호나 제목으로 검색하세요"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </S.Search>
            <S.Count aria-live="polite">
              <strong>{result.total.toLocaleString()}</strong> 문제
            </S.Count>
            <S.Sort role="group" aria-label="문제 정렬">
              <strong>정렬</strong>
              {sorts.map((sort) => (
                <button
                  key={sort.id}
                  aria-pressed={filters.sort === sort.id}
                  onClick={() => selectSort(sort.id)}
                >
                  {sort.label}
                  {filters.sort === sort.id && sort.id !== 'random' && (
                    <S.SortArrow name="sort-up" $descending={filters.direction === 'desc'} />
                  )}
                </button>
              ))}
            </S.Sort>
            <ProblemTable
              problems={result.items}
              onSelect={(problem) => navigate(problemDetailPath(problem.id))}
            />
            <S.Pagination aria-label="문제 목록 페이지">
              <button
                aria-label="이전 페이지"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ProblemAsset name="left" />
              </button>
              {pageNumbers(page, result.totalPages).map((item) =>
                typeof item === 'number' ? (
                  <button
                    key={item}
                    aria-label={`${item} 페이지`}
                    aria-current={page === item ? 'page' : undefined}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </button>
                ) : (
                  <span key={item}>···</span>
                ),
              )}
              <button
                aria-label="다음 페이지"
                disabled={page === result.totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ProblemAsset name="right" />
              </button>
            </S.Pagination>
          </S.Results>
        </S.Browse>
      </S.sPage>
      {pending && (
        <PreviewDialog title={pending} onClose={() => setPending(null)}>
          <UI.Description>{pending} 화면은 준비 중이에요.</UI.Description>
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
