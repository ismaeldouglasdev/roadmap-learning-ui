import React from 'react';
import { Icon } from './Icon';

export const Stats: React.FC<{xp:number;streak:number}> = ({xp,streak}) => {
  const lv = Math.floor(xp/200)+1;
  const next = (lv*200)-xp;
  const pct = (xp%200)/200*100;
  const circumference = 2 * Math.PI * 24;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3 p-4 bg-white dark:bg-indigo-900/60 border border-indigo-900/10 dark:border-cream-200/10 rounded-2xl">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0" role="progressbar" aria-valuenow={xp%200} aria-valuemin={0} aria-valuemax={200} aria-label={`Progresso para o nível ${lv+1}`}>
          <svg className="w-12 h-12 sm:w-14 sm:h-14 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-indigo-100 dark:text-cream-200/30" />
            <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-indigo-950 dark:text-gold" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold text-indigo-950 dark:text-cream-100">{lv}</span></div>
        </div>
        <div className="min-w-0"><div className="text-xs text-indigo-600 dark:text-cream-400">Nivel</div><div className="text-xs sm:text-sm font-medium text-indigo-950 dark:text-cream-100">{next} XP p/ proximo</div></div>
      </div>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0"><Icon n="star" s={24} c="text-gold-dark"/></div>
        <div className="min-w-0"><div className="text-xs text-indigo-600 dark:text-cream-400">XP Total</div><div className="text-lg font-bold text-indigo-950 dark:text-cream-100">{xp.toLocaleString()}</div></div>
      </div>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/15 flex items-center justify-center flex-shrink-0"><Icon n="fire" s={24} c="text-rose-500"/></div>
        <div className="min-w-0"><div className="text-xs text-indigo-600 dark:text-cream-400">Sequencia</div><div className="text-lg font-bold text-indigo-950 dark:text-cream-100">{streak} {streak === 1 ? 'dia' : 'dias'}</div></div>
      </div>
    </div>
  );
};
