import React from 'react';
import { Phase, Skill } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';
import { SkillCard } from './SkillCard';

export const PhaseCard: React.FC<{phase:Phase;expanded:boolean;onToggle:()=>void;onSkillClick:(s:Skill)=>void}> = ({phase,expanded,onToggle,onSkillClick}) => {
  const done = phase.skills.filter(s=>s.completed).length;
  const pct = (done/phase.skills.length)*100;
  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all ${phase.unlocked?'bg-white dark:bg-indigo-900/60 border-indigo-900/10 dark:border-cream-200/10':'bg-indigo-100 dark:bg-indigo-900/40 border-indigo-900/5 dark:border-cream-200/5 opacity-50'}`}>
      <button onClick={onToggle} aria-expanded={expanded} className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left" disabled={!phase.unlocked}>
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-xl flex-shrink-0" style={{backgroundColor:phase.color}}>
          {phase.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-base sm:text-lg font-bold text-indigo-950 dark:text-cream-100 truncate">{phase.title}</h3>
            {!phase.unlocked && <Icon n="lock" s={15} c="text-indigo-400 flex-shrink-0"/>}
          </div>
          <p className="text-sm text-indigo-600 dark:text-cream-400 truncate">{phase.subtitle}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-medium text-indigo-950 dark:text-cream-100">{done}/{phase.skills.length}</div>
          <div className="hidden sm:block w-24 mt-1"><Bar p={pct} c={phase.color} h={6} label={`Progresso da fase ${phase.number}: ${done} de ${phase.skills.length} habilidades`}/></div>
        </div>
        <Icon n="down" s={20} c={`text-indigo-400 transition-transform duration-200 flex-shrink-0 motion-reduce:transition-none ${expanded?'rotate-180':''}`}/>
      </button>
      {expanded && phase.unlocked && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-3">
          {phase.skills.map(s=><SkillCard key={s.id} skill={s} color={phase.color} onClick={()=>onSkillClick(s)}/>)}
        </div>
      )}
    </div>
  );
};
