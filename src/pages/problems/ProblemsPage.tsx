import { formatNumber } from '../../shared/format';
import * as S from './ProblemsPage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import {
  defaultProblemFilters,
  type Problem,
  type ProblemFilters as ProblemFilterValues,
  type ProblemSort,
  hasProblemFilters,
  filterProblems,
  problemPageSize,
} from '../../domains/problem/domain/problem';
import {
  problemCatalogueOptions,
  problemPageOptions,
} from '../../domains/problem/infrastructure/problemApi';
import { ProblemAsset } from '../../domains/problem/presentation/ProblemAsset';
import { ProblemDiscovery } from '../../domains/problem/presentation/ProblemDiscovery';
import { ProblemFilters } from '../../domains/problem/presentation/ProblemFilters';
import { ProblemTable } from '../../domains/problem/presentation/ProblemTable';
import { problemDetailPath } from '../../domains/problem/presentation/problemDetailPath';
import {
  recommendedProblems,
  friendProblems,
} from '../../domains/problem/infrastructure/problemFixture';

interface SortOption {
  id: ProblemSort;
  label: string;
  disabled?: boolean;
}

const sortOptions: SortOption[] = [
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
    disabled: true,
  },
  {
    id: 'attempts',
    label: '평균 시도',
    disabled: true,
  },
  {
    id: 'random',
    label: '랜덤',
  },
];

function getPageButtons(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 4) return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [1, 'left-gap', currentPage - 1, currentPage, currentPage + 1, 'right-gap', totalPages];
}

export function ProblemsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ProblemFilterValues>(defaultProblemFilters);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const needsCatalogue =
    hasProblemFilters(filters) || filters.sort !== 'id' || filters.direction !== 'asc';
  const pageQuery = useQuery({ ...problemPageOptions(page - 1), enabled: !needsCatalogue });
  const catalogueQuery = useQuery({ ...problemCatalogueOptions(), enabled: needsCatalogue });
  const activeQuery = needsCatalogue ? catalogueQuery : pageQuery;
  const filteredProblems = needsCatalogue ? filterProblems(catalogueQuery.data ?? [], filters) : [];
  const pageStart = (page - 1) * problemPageSize;
  const pageProblems = needsCatalogue
    ? filteredProblems.slice(pageStart, pageStart + problemPageSize)
    : (pageQuery.data?.items ?? []);
  const totalProblems = needsCatalogue
    ? filteredProblems.length
    : (pageQuery.data?.totalElements ?? 0);
  const totalPages = needsCatalogue
    ? Math.ceil(totalProblems / problemPageSize)
    : (pageQuery.data?.totalPages ?? 0);
  const visibleProblems = activeQuery.isSuccess ? pageProblems : [];
  const emptyContent = activeQuery.isSuccess ? (
    '문제가 없습니다.'
  ) : (
    <ApiFeedback pending={activeQuery.isPending} error={activeQuery.error} />
  );

  function updateFilters(patch: Partial<ProblemFilterValues>) {
    setFilters((current) => ({
      ...current,
      ...patch,
    }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(defaultProblemFilters);
    setSearchInput('');
    setPage(1);
  }

  function selectSort(sort: ProblemSort) {
    const isRandom = sort === 'random';
    const reverseSort = !isRandom && filters.sort === sort && filters.direction === 'asc';
    updateFilters({
      sort,
      direction: reverseSort ? 'desc' : 'asc',
      randomSeed: isRandom ? Date.now() : filters.randomSeed,
    });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateFilters({ query: searchInput });
  }

  function openProblem(problem: Problem) {
    navigate(problemDetailPath(problem.id));
  }

  return (
    <SiteLayout>
      <S.Page id="main">
        <UI.HiddenHeading>문제 목록</UI.HiddenHeading>
        <ProblemDiscovery
          recommended={recommendedProblems}
          friends={friendProblems}
          onSelect={openProblem}
        />
        <S.Browse>
          <ProblemFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />
          <S.Results aria-label="문제 검색 결과">
            <S.Search role="search" onSubmit={handleSearchSubmit}>
              <S.SearchInput
                type="search"
                enterKeyHint="search"
                aria-label="문제 번호나 제목 검색"
                placeholder="문제 번호나 제목으로 검색하세요"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </S.Search>
            <S.Count aria-live="polite">
              <strong>{formatNumber(totalProblems)}</strong> 문제
            </S.Count>
            <S.Sort role="group" aria-label="문제 정렬">
              <strong>정렬</strong>
              {sortOptions.map((sort) => (
                <S.SortButton
                  key={sort.id}
                  disabled={sort.disabled}
                  aria-pressed={filters.sort === sort.id}
                  onClick={() => selectSort(sort.id)}
                >
                  {sort.label}
                  {filters.sort === sort.id && sort.id !== 'random' && (
                    <S.SortArrow name="sort-up" $descending={filters.direction === 'desc'} />
                  )}
                </S.SortButton>
              ))}
            </S.Sort>
            <ProblemTable
              problems={visibleProblems}
              emptyContent={emptyContent}
              onSelect={openProblem}
            />
            <S.Pagination aria-label="문제 목록 페이지">
              <S.PageButton
                aria-label="이전 페이지"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ProblemAsset name="left" />
              </S.PageButton>
              {getPageButtons(page, totalPages).map((item) =>
                typeof item === 'number' ? (
                  <S.PageButton
                    key={item}
                    aria-label={`${item} 페이지`}
                    aria-current={page === item ? 'page' : undefined}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </S.PageButton>
                ) : (
                  <span key={item}>···</span>
                ),
              )}
              <S.PageButton
                aria-label="다음 페이지"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ProblemAsset name="right" />
              </S.PageButton>
            </S.Pagination>
          </S.Results>
        </S.Browse>
      </S.Page>
    </SiteLayout>
  );
}
