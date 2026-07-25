import React from 'react';

interface BreadcrumbsProps {
  path: { id: string; label: string }[];
  onNavigate: (id: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => {
  if (!path || path.length === 0) return null;

  return (
    <nav className="flex items-center space-x-1 text-xs md:text-sm text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap py-2 px-4 mb-2">
      {path.map((item, idx) => {
        const isLast = idx === path.length - 1;
        return (
          <React.Fragment key={item.id}>
            <button
              onClick={() => !isLast && onNavigate(item.id)}
              className={`${
                isLast
                  ? 'font-semibold text-gray-900 dark:text-gray-200 cursor-default'
                  : 'hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
              }`}
            >
              {item.label}
            </button>
            {!isLast && (
              <span className="text-gray-400 dark:text-gray-600 px-1">
                <svg className="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
