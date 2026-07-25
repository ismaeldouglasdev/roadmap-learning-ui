import React, { useMemo } from 'react';
import { applySearchFilter, SearchFilters } from './filter';

interface SearchResultsProps<T> {
  items: T[];
  query: string;
  filters: SearchFilters;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export function SearchResults<T extends { name?: string; type?: string; completed?: boolean; difficulty?: string }>({
  items,
  query,
  filters,
  renderItem,
  emptyMessage = 'Nenhum resultado encontrado',
  className = '',
}: SearchResultsProps<T>) {
  const filtered = useMemo(() => applySearchFilter(items, query, filters), [items, query, filters]);
  const showCount = query.trim() !== '' || filters.type.length > 0 || filters.completion.length > 0 || filters.difficulty.length > 0;

  if (filtered.length === 0 && showCount) {
    return (
      <div className={`text-center py-8 text-gray-400 text-sm ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {showCount && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {filtered.length} {filtered.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </div>
      )}
      <div className="space-y-2">{filtered.map(renderItem)}</div>
    </div>
  );
}
