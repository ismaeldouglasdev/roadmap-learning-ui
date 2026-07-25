import React from 'react';
import { Icon } from './Icon';

export const Stats: React.FC<{xp:number;streak:number}> = ({xp,streak}) => {
  const lv = Math.floor(xp/200)+1;
  const next = (lv*200)-xp;
  const pct = (xp%200)/200*100;
  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90"><circle cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" className="dark:stroke-gray-700"/><circle cx="28" cy="28" r="24" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeDasharray={`${pct*1.508} 150.8`} strokeLinecap="round"/></svg>
          <div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold text-purple-600 dark:text-purple-400">{lv}</span></div>
        </div>
        <div><div className="text-xs text-gray-500">Nivel</div><div className="text-sm font-medium text-gray-900 dark:text-white">{next} XP p/ proximo</div></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"><Icon n="star" s={24} c="text-yellow-500"/></div>
        <div><div className="text-xs text-gray-500">XP Total</div><div className="text-lg font-bold text-gray-900 dark:text-white">{xp.toLocaleString()}</div></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"><Icon n="fire" s={24} c="text-red-500"/></div>
        <div><div className="text-xs text-gray-500">Sequencia</div><div className="text-lg font-bold text-gray-900 dark:text-white">{streak} dias</div></div>
      </div>
    </div>
  );
};
