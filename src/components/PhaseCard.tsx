import React from 'react';
import { Phase, Skill } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';
import { SkillCard } from './SkillCard';

export const PhaseCard: React.FC<{phase:Phase;expanded:boolean;onToggle:()=>void;onSkillClick:(s:Skill)=>void}> = ({phase,expanded,onToggle,onSkillClick}) => {
  const done = phase.skills.filter(s=>s.completed).length;
  const pct = (done/phase.skills.length)*100;
  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all ${phase.unlocked?'bg-white border-indigo-900/10':'bg-indigo-100 border-indigo-900/5 opacity-50'}`}>
      <button onClick={onToggle} className="w-full p-5 flex items-center gap-4 text-left" disabled={!phase.unlocked}>
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0" style={{backgroundColor:phase.color}}>
          {phase.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-lg font-bold text-indigo-950">{phase.title}</h3>
            {!phase.unlocked && <Icon n="lock" s={15} c="text-indigo-400"/>}
          </div>
          <p className="text-sm text-indigo-600">{phase.subtitle}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-medium text-indigo-950">{done}/{phase.skills.length}</div>
          <div className="w-24 mt-1"><Bar p={pct} c={phase.color} h={6}/></div>
        </div>
        <Icon n="down" s={20} c={`text-indigo-400 transition-transform duration-200 ${expanded?'rotate-180':''}`}/>
      </button>
      {expanded && phase.unlocked && (
        <div className="px-5 pb-5 space-y-3">
          {phase.skills.map(s=><SkillCard key={s.id} skill={s} color={phase.color} onClick={()=>onSkillClick(s)}/>)}
        </div>
      )}
    </div>
  );
};
