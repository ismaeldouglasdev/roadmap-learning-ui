import React, { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { loadNotes, mergeNotes, NotesMap, saveNotes } from './features/notes/notes-storage';
import { readStringArray, writeJson } from './lib/storage';

const FAVORITES_KEY = 'roadmap-favorites';

interface StoreState {
  searchQuery: string;
  searchFilters: {
    type: string[];
    completion: ('done' | 'not_done')[];
    difficulty: ('easy' | 'medium' | 'hard')[];
  };
  notes: NotesMap;
  favorites: Set<string>;
  // actions
  setSearchQuery: (q: string) => void;
  toggleFilter: (category: 'type' | 'completion' | 'difficulty', value: string) => void;
  setNote: (topicId: string, text: string) => void;
  toggleFavorite: (topicId: string) => void;
  hydrate: (notes: NotesMap, favorites: string[]) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    type: [] as string[],
    completion: [] as ('done' | 'not_done')[],
    difficulty: [] as ('easy' | 'medium' | 'hard')[],
  });

  // Estado inicializado direto do storage: sem efeito de carga, sem a janela
  // em que uma gravação disparada na montagem sobrescreveria o que acabou
  // de ser lido do disco.
  const [notes, setNotes] = useState<NotesMap>(() => loadNotes());
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(readStringArray(FAVORITES_KEY)));

  const toggleFilter = useCallback((category: 'type' | 'completion' | 'difficulty', value: string) => {
    setSearchFilters(prev => {
      const arr = prev[category] as string[];
      const exists = arr.includes(value);
      const newArr = exists ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [category]: newArr };
    });
  }, []);

  // Atualizadores funcionais puros: nada de ler o estado do closure para
  // decidir o próximo valor (isso perderia escritas em sequência rápida).
  const setNote = useCallback((topicId: string, text: string) => {
    setNotes(prev => ({ ...prev, [topicId]: text }));
  }, []);

  const toggleFavorite = useCallback((topicId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId); else next.add(topicId);
      return next;
    });
  }, []);

  // Aplica o estado vindo do servidor sem descartar o que existe localmente:
  // o local representa a edição mais recente (ex.: usuário offline).
  const hydrate = useCallback((serverNotes: NotesMap, serverFavorites: string[]) => {
    setNotes(prev => mergeNotes(prev, serverNotes));
    setFavorites(prev => {
      const next = new Set(prev);
      serverFavorites.forEach(id => next.add(id));
      return next;
    });
  }, []);

  // Persistência em efeitos puros: sem closure obsoleto e sem escrita dentro
  // de um atualizador de estado.
  React.useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  React.useEffect(() => {
    writeJson(FAVORITES_KEY, Array.from(favorites));
  }, [favorites]);

  const value = useMemo<StoreState>(() => ({
    searchQuery,
    searchFilters,
    notes,
    favorites,
    setSearchQuery,
    toggleFilter,
    setNote,
    toggleFavorite,
    hydrate,
  }), [searchQuery, searchFilters, notes, favorites, toggleFilter, setNote, toggleFavorite, hydrate]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
