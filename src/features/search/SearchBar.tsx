import React, { useRef, useEffect } from 'react';
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
    <div className="sticky top-0 z-30 bg-cream-200/95 backdrop-blur-sm border-b border-indigo-900/10">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Pesquisar tópicos, habilidades..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-white border border-indigo-900/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-indigo-950 placeholder-indigo-400"
          />
          <svg className="absolute left-3 top-3 w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 p-0.5 text-indigo-400 hover:text-indigo-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-indigo-600 self-center mr-1">Filtros:</span>
          {typeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleFilter('type', opt.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                searchFilters.type.includes(opt.value)
                  ? 'bg-indigo-950 text-cream-200 border-indigo-950'
                  : 'bg-white text-indigo-700 border-indigo-900/10 hover:border-indigo-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-5 bg-indigo-900/20 mx-1 self-center" />
          {completionOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleFilter('completion', opt.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                searchFilters.completion.includes(opt.value as 'done' | 'not_done')
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-white text-indigo-700 border-indigo-900/10 hover:border-indigo-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-5 bg-indigo-900/20 mx-1 self-center" />
          {difficultyOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleFilter('difficulty', opt.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                searchFilters.difficulty.includes(opt.value as 'easy' | 'medium' | 'hard')
                  ? 'bg-gold text-indigo-950 border-gold'
                  : 'bg-white text-indigo-700 border-indigo-900/10 hover:border-indigo-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {searchQuery && (
          <div className="text-xs text-indigo-600 mt-2">
            Pressione <kbd className="px-1.5 py-0.5 bg-white rounded text-xs border border-indigo-900/10">/</kbd> para focar, <kbd className="px-1.5 py-0.5 bg-white rounded text-xs border border-indigo-900/10">Esc</kbd> para limpar
          </div>
        )}
      </div>
    </div>
  );
};
