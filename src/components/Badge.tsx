import React from 'react';
import { Achievement } from '../types';
import { Icon } from './Icon';

export const Badge: React.FC<{a:Achievement}> = ({a}) => (
  <div className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${a.earned?'bg-gold/10 border-gold':'bg-indigo-100 border-indigo-900/10 opacity-40'}`}>
    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${a.earned?'bg-gold text-indigo-950':'bg-indigo-200 text-indigo-500'}`}><Icon n={a.icon} s={22}/></div>
    <span className="text-xs font-medium text-center text-indigo-950 leading-tight">{a.name}</span>
  </div>
);
