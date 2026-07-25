import React from 'react';
import { Achievement } from '../types';
import { Icon } from './Icon';

export const Badge: React.FC<{a:Achievement}> = ({a}) => (
  <div className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${a.earned?'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400':'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-40'}`}>
    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${a.earned?'bg-yellow-400 text-white':'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}><Icon n={a.icon} s={22}/></div>
    <span className="text-xs font-medium text-center text-gray-900 dark:text-white leading-tight">{a.name}</span>
  </div>
);
