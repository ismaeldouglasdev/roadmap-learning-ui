import React from 'react';
import { Skill } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';

export const SkillCard: React.FC<{skill:Skill;color:string;onClick:()=>void}> = ({skill,color,onClick}) => {
  const total = skill.subModules.reduce((a,sm)=>a+sm.topics.length,0);
  const done = skill.subModules.reduce((a,sm)=>a+sm.topics.filter(t=>t.completed).length,0);
  const pct = total>0?(done/total)*100:0;
  return (
    <button onClick={onClick} className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-lg ${skill.completed?'bg-emerald-50 border-emerald-500':'bg-white border-indigo-900/10 hover:border-indigo-300'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {skill.completed && <Icon n="check" s={15} c="text-emerald-500"/>}
            <h4 className="font-semibold text-indigo-950 text-sm">{skill.name}</h4>
          </div>
          <p className="text-xs text-indigo-600 mb-2 line-clamp-2">{skill.description}</p>
          <div className="flex items-center gap-3 text-xs text-indigo-500 mb-2">
            <span className="font-medium" style={{color}}>{skill.xp} XP</span>
            <span>{done}/{total} topicos</span>
            <span>{skill.subModules.length} modulos</span>
          </div>
          <Bar p={pct} c={color} h={4}/>
        </div>
        <Icon n="right" s={18} c="text-indigo-400 mt-1 flex-shrink-0"/>
      </div>
    </button>
  );
};
