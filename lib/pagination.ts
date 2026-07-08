export function paginate<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    currentItems: items.slice(startIndex, endIndex),
    totalPages,
  };
}