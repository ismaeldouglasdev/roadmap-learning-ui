import { readJson, writeJson } from '../../lib/storage';

/**
 * Armazenamento de anotações por tópico.
 *
 * Schema canônico: um mapa plano `{ [topicId]: texto }` gravado diretamente
 * sob a chave `roadmap-notes`. Este módulo é a ÚNICA porta de entrada para
 * essa chave — evita que dois formatos incompatíveis sejam gravados na mesma
 * chave e corrompam as notas.
 */
const STORAGE_KEY = 'roadmap-notes';

export type NotesMap = Record<string, string>;

const isNotesMap = (value: unknown): value is NotesMap =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.values(value as Record<string, unknown>).every(item => typeof item === 'string');

/** Carrega as notas. Valores corrompidos ou de formato antigo viram mapa vazio. */
export function loadNotes(): NotesMap {
  const parsed = readJson<unknown>(STORAGE_KEY, null);
  if (!parsed || typeof parsed !== 'object') return {};

  // Migração: versões antigas guardavam `{ notes: { ... } }` aninhado.
  if ('notes' in parsed) {
    const nested = (parsed as { notes: unknown }).notes;
    if (isNotesMap(nested)) return nested;
  }

  return isNotesMap(parsed) ? parsed : {};
}

/** Grava as notas. Falhas de cota são silenciosas (a sessão segue em memória). */
export function saveNotes(notes: NotesMap): void {
  writeJson(STORAGE_KEY, notes);
}

/**
 * Combina notas do servidor com as locais sem perder nenhuma das duas.
 * Em conflito, o local vence: ele representa a edição mais recente.
 */
export function mergeNotes(local: NotesMap, incoming: NotesMap): NotesMap {
  return { ...incoming, ...local };
}

export function getNote(topicId: string, notes: NotesMap): string {
  return notes[topicId] ?? '';
}

export function setNote(topicId: string, text: string, notes: NotesMap): NotesMap {
  return { ...notes, [topicId]: text };
}

export function hasNote(topicId: string, notes: NotesMap): boolean {
  return getNote(topicId, notes).trim().length > 0;
}
