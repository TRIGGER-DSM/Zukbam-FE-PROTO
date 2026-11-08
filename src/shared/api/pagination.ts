export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export async function collectPages<T>(
  fetchPage: (page: number, signal?: AbortSignal) => Promise<PageInfo & { items: T[] }>,
  signal?: AbortSignal,
) {
  const firstPage = await fetchPage(0, signal);
  const items = [...firstPage.items];
  for (let pageIndex = 1; pageIndex < firstPage.totalPages; pageIndex += 1) {
    const nextPage = await fetchPage(pageIndex, signal);
    items.push(...nextPage.items);
  }
  return items;
}
