import React, { useState } from 'react';
import { Skill } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';
import { SubModCard } from './SubModCard';

export const SkillModal: React.FC<{skill:Skill;color:string;onClose:()=>void;onTopic:(smId:string,tId:string)=>void;onExercise:(smId:string,exId:string)=>void;onQuiz:()=>void}> = ({skill,color,onClose,onTopic,onExercise,onQuiz}) => {
  const [expSM,setExpSM] = useState<string|null>(skill.subModules[0]?.id||null);
  const total = skill.subModules.reduce((a,sm)=>a+sm.topics.length,0);
  const done = skill.subModules.reduce((a,sm)=>a+sm.topics.filter(t=>t.completed).length,0);
  const pct = total>0?(done/total)*100:0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="p-6 border-b border-indigo-900/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{backgroundColor:color}}>
                  <Icon n="book" s={20}/>
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-indigo-950">{skill.name}</h2>
                  <p className="text-sm text-indigo-600">{skill.description}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-indigo-600">{done}/{total} topicos</span>
                  <span className="font-medium" style={{color}}>{Math.round(pct)}%</span>
                </div>
                <Bar p={pct} c={color} h={6}/>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-indigo-900/10 transition-colors flex-shrink-0">
              <Icon n="x" s={20} c="text-indigo-600"/>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {skill.subModules.map(sm=>(
            <SubModCard key={sm.id} sm={sm} exp={expSM===sm.id} onToggle={()=>setExpSM(expSM===sm.id?null:sm.id)} onTopic={(tid)=>onTopic(sm.id,tid)} onExercise={(eid)=>onExercise(sm.id,eid)} color={color}/>
          ))}
        </div>
        <div className="p-4 border-t border-indigo-900/10 bg-cream-50 flex items-center justify-between">
          <span className="text-sm text-indigo-600">+{skill.xp} XP ao completar todos os topicos</span>
          <div className="flex gap-2">
            <button onClick={onQuiz} className="px-4 py-2 rounded-lg font-medium text-cream-200 text-sm bg-indigo-950 hover:bg-indigo-900 transition-colors">
              Quiz
            </button>
            <button onClick={onClose} className="px-5 py-2 rounded-lg font-medium text-indigo-950 text-sm font-medium" style={{backgroundColor:color}}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
