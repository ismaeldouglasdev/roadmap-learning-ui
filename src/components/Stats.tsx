import React from 'react';
import { Icon } from './Icon';

export const Stats: React.FC<{xp:number;streak:number}> = ({xp,streak}) => {
  const lv = Math.floor(xp/200)+1;
  const next = (lv*200)-xp;
  const pct = (xp%200)/200*100;
  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-white rounded-2xl border border-indigo-900/10">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90"><circle cx="28" cy="28" r="24" stroke="#E0DCCA" strokeWidth="4" fill="none"/><circle cx="28" cy="28" r="24" stroke="#282B4A" strokeWidth="4" fill="none" strokeDasharray={`${pct*1.508} 150.8`} strokeLinecap="round"/></svg>
          <div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold text-indigo-950">{lv}</span></div>
        </div>
        <div><div className="text-xs text-indigo-600">Nivel</div><div className="text-sm font-medium text-indigo-950">{next} XP p/ proximo</div></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><Icon n="star" s={24} c="text-gold-dark"/></div>
        <div><div className="text-xs text-indigo-600">XP Total</div><div className="text-lg font-bold text-indigo-950">{xp.toLocaleString()}</div></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center"><Icon n="fire" s={24} c="text-rose-500"/></div>
        <div><div className="text-xs text-indigo-600">Sequencia</div><div className="text-lg font-bold text-indigo-950">{streak} dias</div></div>
      </div>
    </div>
  );
};
