export function getValidatedPageAndPageCount(
  recordsCount: number,
  page: number,
  page_size: number
) {
  const pagesCount = Math.ceil(recordsCount / page_size);
  const validatedPage = page <= pagesCount && page > 0 ? page : 1;
  return { validatedPage, pagesCount };
}
