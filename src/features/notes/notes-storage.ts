// Notes storage with localStorage persistence
const STORAGE_KEY = 'roadmap-notes';

export interface NotesStorage {
  notes: Record<string, string>;
}

export function loadNotes(): NotesStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { notes: {} };
    return JSON.parse(raw);
  } catch {
    return { notes: {} };
  }
}

export function saveNotes(storage: NotesStorage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch {
    // localStorage unavailable or quota exceeded — silently fail
  }
}

export function getNote(topicId: string, storage: NotesStorage): string {
  return storage.notes[topicId] ?? '';
}

export function setNote(topicId: string, text: string, storage: NotesStorage): NotesStorage {
  const next: NotesStorage = { notes: { ...storage.notes, [topicId]: text } };
  saveNotes(next);
  return next;
}

export function hasNote(topicId: string, storage: NotesStorage): boolean {
  const note = storage.notes[topicId];
  return typeof note === 'string' && note.trim().length > 0;
}
