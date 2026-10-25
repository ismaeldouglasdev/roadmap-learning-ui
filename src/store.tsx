import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface StoreState {
  searchQuery: string;
  searchFilters: {
    type: string[];
    completion: ('done' | 'not_done')[];
    difficulty: ('easy' | 'medium' | 'hard')[];
  };
  notes: Record<string, string>;
  favorites: Set<string>;
  // actions
  setSearchQuery: (q: string) => void;
  toggleFilter: (category: 'type' | 'completion' | 'difficulty', value: string) => void;
  setNote: (topicId: string, text: string) => void;
  toggleFavorite: (topicId: string) => void;
  hydrate: (notes: Record<string, string>, favorites: string[]) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
};

const writeStored = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Não foi possível salvar "${key}" no navegador:`, error);
  }
};

export const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    type: [] as string[],
    completion: [] as ('done' | 'not_done')[],
    difficulty: [] as ('easy' | 'medium' | 'hard')[],
  });
  const [notes, setNotes] = useState<Record<string, string>>(() => readStored('roadmap-notes', {}));
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(readStored<string[]>('roadmap-favorites', [])));

  useEffect(() => { writeStored('roadmap-notes', notes); }, [notes]);
  useEffect(() => { writeStored('roadmap-favorites', Array.from(favorites)); }, [favorites]);

  const toggleFilter = (category: 'type' | 'completion' | 'difficulty', value: string) => {
    setSearchFilters(prev => {
      const arr = prev[category] as string[];
      const exists = arr.includes(value);
      const newArr = exists ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [category]: newArr };
    });
  };

  const setNote = (topicId: string, text: string) => {
    setNotes(prev => ({ ...prev, [topicId]: text }));
  };

  const toggleFavorite = (topicId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) newSet.delete(topicId); else newSet.add(topicId);
      return newSet;
    });
  };

  const hydrate = (notesData: Record<string, string>, favoritesData: string[]) => {
    setNotes(notesData);
    setFavorites(new Set(favoritesData));
  };

  return (
    <StoreContext.Provider value={{
      searchQuery,
      searchFilters,
      notes,
      favorites,
      setSearchQuery,
      toggleFilter,
      setNote,
      toggleFavorite,
      hydrate,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};