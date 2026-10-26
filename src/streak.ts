// Funções utilitárias para calcular streak.
//
// O "dia" é sempre o dia local do navegador, nunca UTC — igual ao Duolingo.
// Com `toISOString()` (UTC), no Brasil (UTC-3) a virada do dia acontecia às
// 21h, quebrando ou incrementando a sequência no meio da noite.
//
// Regra: uma lição por dia mantém a sequência. Se um dia inteiro passar sem
// nenhuma atividade, a sequência zera (0) na virada da meia-noite.

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayISO(): string {
  return toLocalISODate(new Date());
}

/** Soma/subtrai dias de uma data ISO local (AAAA-MM-DD) sem sofrer com DST. */
export function shiftISODate(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return toLocalISODate(date);
}

export function getYesterdayISO(): string {
  return shiftISODate(getTodayISO(), -1);
}

/**
 * Corrige a sequência de acordo com o dia atual, sem alterar a data da última
 * atividade (ela é necessária para saber se a próxima lição continua ou
 * reinicia a sequência).
 *
 * - Sem data registrada: 0 (nunca estudou / dado antigo sem data).
 * - Última atividade hoje ou ontem: sequência continua.
 * - Última atividade antes de ontem: 0 (passou um dia inteiro sem lição).
 */
export function normalizeStreak(
  currentStreak: number,
  lastDate: string | null,
  today: string = getTodayISO(),
): number {
  if (!lastDate || !ISO_DATE_RE.test(lastDate)) return 0;

  // Hoje, ou uma data futura por relógio adiantado: não quebra a sequência.
  if (lastDate >= today) return Math.max(1, currentStreak);
  if (lastDate === shiftISODate(today, -1)) return Math.max(1, currentStreak);

  return 0;
}

/**
 * Registra uma atividade de estudo no dia de hoje.
 *
 * - Primeira atividade: começa em 1.
 * - Mesma data: mantém (não soma duas lições no mesmo dia).
 * - Ontem: soma 1.
 * - Antes de ontem: reinicia em 1 (a sequência antiga já foi perdida).
 */
export function updateStreak(
  currentStreak: number,
  lastDate: string | null,
  today: string = getTodayISO(),
): { streak: number; lastDate: string } {
  if (!lastDate || currentStreak <= 0) {
    return { streak: 1, lastDate: today };
  }

  if (lastDate >= today) {
    return { streak: currentStreak, lastDate: today };
  }

  if (lastDate === shiftISODate(today, -1)) {
    return { streak: currentStreak + 1, lastDate: today };
  }

  return { streak: 1, lastDate: today };
}
