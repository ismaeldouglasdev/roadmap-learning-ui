/**
 * Helpers de armazenamento local resilientes.
 *
 * O app roda 100% no navegador no modo convidado e usa o localStorage como
 * fonte de verdade do progresso. Um valor corrompido ou uma cota estourada
 * não pode derrubar a aplicação — por isso todo acesso é blindado com
 * try/catch e validação.
 */

/** Lê e desserializa uma chave. Devolve `fallback` em qualquer falha. */
export function readJson<T>(key: string, fallback: T, isValid?: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (isValid && !isValid(parsed)) return fallback;
    return parsed === null || parsed === undefined ? fallback : (parsed as T);
  } catch {
    // JSON corrompido ou localStorage inacessível (modo privado, quota, etc.)
    return fallback;
  }
}

/** Serializa e grava uma chave. Devolve `false` se a gravação falhou. */
export function writeJson(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Cota estourada ou storage desabilitado — a sessão segue em memória
    return false;
  }
}

/** Lê uma chave esperando um array de strings. Valores inválidos viram lista vazia. */
export function readStringArray(key: string): string[] {
  const value = readJson<unknown>(key, []);
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}
