// Search filter utilities
export interface SearchFilters {
  type: string[]; // doc,video,course,exercise,article
  completion: ('done' | 'not_done')[]; // completed status
  difficulty: ('easy' | 'medium' | 'hard')[]; // for exercises
}

export function applySearchFilter<T extends { name?: string; type?: string; completed?: boolean; difficulty?: string }>(
  items: T[],
  query: string,
  filters: SearchFilters
): T[] {
  const q = query.trim().toLowerCase();
  return items.filter(item => {
    // match query on name
    const nameMatch = q === '' || (item.name && item.name.toLowerCase().includes(q));
    // type filter
    const typeMatch = filters.type.length === 0 || (item.type && filters.type.includes(item.type));
    // completion filter
    const compMatch =
      filters.completion.length === 0 ||
      (filters.completion.includes('done') && item.completed) ||
      (filters.completion.includes('not_done') && !item.completed);
    // difficulty filter (only relevant for exercises)
    const diffMatch =
      filters.difficulty.length === 0 ||
      (item.difficulty && filters.difficulty.includes(item.difficulty as any));
    return nameMatch && typeMatch && compMatch && diffMatch;
  });
}
