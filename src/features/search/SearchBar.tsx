import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '../../store';

const typeOptions = [
  { value: 'doc', label: 'Docs' },
  { value: 'video', label: 'Vídeo' },
  { value: 'course', label: 'Curso' },
  { value: 'exercise', label: 'Exercício' },
  { value: 'article', label: 'Artigo' },
];

const completionOptions = [
  { value: 'done', label: 'Concluído' },
  { value: 'not_done', label: 'Pendente' },
];

const difficultyOptions = [
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Médio' },
  { value: 'hard', label: 'Difícil' },
];

export const SearchBar: React.FC = () => {
  const { searchQuery, searchFilters, setSearchQuery, toggleFilter } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  useState(0);

  // keyboard shortcut: / to focus
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSearchQuery('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setSearchQuery]);

  return (
    <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Pesquisar tópicos, habilidades..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-400"
          />
          <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {/* Filter toggles */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 self-center mr-1">Filtros:</span>
          {typeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleFilter('type', opt.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                searchFilters.type.includes(opt.value)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
          {completionOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleFilter('completion', opt.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                searchFilters.completion.includes(opt.value as any)
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
          {difficultyOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleFilter('difficulty', opt.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                searchFilters.difficulty.includes(opt.value as any)
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {searchQuery && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Pressione <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">/</kbd> para focar, <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Esc</kbd> para limpar
          </div>
        )}
      </div>
    </div>
  );
};
