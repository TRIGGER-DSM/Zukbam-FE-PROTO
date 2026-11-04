import {
  filterProblems,
  hasProblemFilters,
  type ProblemFilters,
  type ProblemRepository,
} from '../domain/problem';

export function getProblems(repository: ProblemRepository, filters: ProblemFilters, page: number) {
  const catalogue = repository.getCatalogue();
  const items = filterProblems(catalogue.items, filters);
  const filtered = hasProblemFilters(filters);
  return {
    items: items.slice((page - 1) * 10, page * 10),
    total: filtered ? items.length : catalogue.total,
    totalPages: filtered ? Math.max(1, Math.ceil(items.length / 10)) : catalogue.totalPages,
  };
}
