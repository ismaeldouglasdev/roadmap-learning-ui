// Funções utilitárias para calcular streak
export function getTodayISO(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function getYesterdayISO(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return now.toISOString().split('T')[0];
}

export function updateStreak(currentStreak: number, lastDate: string | null): { streak: number; lastDate: string } {
  const today = getTodayISO();
  const yesterday = getYesterdayISO();
  
  if (!lastDate) {
    // Primeira vez
    return { streak: 1, lastDate: today };
  }
  
  if (lastDate === today) {
    // Já estudou hoje, não incrementa
    return { streak: currentStreak, lastDate: today };
  }
  
  if (lastDate === yesterday) {
    // Estudou ontem, incrementa sequência
    return { streak: currentStreak + 1, lastDate: today };
  }
  
  // Mais de um dia sem estudar, reinicia a sequência
  return { streak: 1, lastDate: today };
}
