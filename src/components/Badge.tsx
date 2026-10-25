import React from 'react';
import { Achievement } from '../types';
import { Icon } from './Icon';

export const Badge: React.FC<{a:Achievement}> = ({a}) => (
  <div className={`flex flex-col items-center gap-2 p-2 sm:p-3 rounded-xl border-2 transition-all ${a.earned?'bg-gold/10 border-gold':'bg-indigo-100 dark:bg-indigo-800/50 border-indigo-900/10 dark:border-cream-200/10 opacity-40'}`}>
    <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${a.earned?'bg-gold text-indigo-950':'bg-indigo-200 dark:bg-indigo-700 text-indigo-500'}`}><Icon n={a.icon} s={22}/></div>
    <span className="text-xs font-medium text-center text-indigo-950 dark:text-cream-100 leading-tight break-words">{a.name}</span>
  </div>
);
