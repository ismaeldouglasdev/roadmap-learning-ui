import React, { useState } from 'react';
import { Skill } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';
import { SubModCard } from './SubModCard';
import { Modal } from './Modal';

export const SkillModal: React.FC<{skill:Skill;color:string;onClose:()=>void;onTopic:(smId:string,tId:string)=>void;onExercise:(smId:string,exId:string)=>void;onStudy:(smId:string,tId:string)=>void;onQuiz:()=>void}> = ({skill,color,onClose,onTopic,onExercise,onStudy,onQuiz}) => {
  const [expSM,setExpSM] = useState<string|null>(skill.subModules[0]?.id||null);
  const total = skill.subModules.reduce((a,sm)=>a+sm.topics.length,0);
  const done = skill.subModules.reduce((a,sm)=>a+sm.topics.filter(t=>t.completed).length,0);
  const pct = total>0?(done/total)*100:0;

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={skill.name}
      panelClassName="max-w-2xl"
      bodyClassName="p-4 sm:p-6 space-y-3"
      header={
        <div className="flex-none p-4 sm:p-6 border-b border-indigo-900/10 dark:border-cream-200/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{backgroundColor:color}}>
                  <Icon n="book" s={20}/>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-xl font-bold text-indigo-950 dark:text-cream-100 truncate">{skill.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-cream-400 line-clamp-2">{skill.description}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 gap-3">
                  <span className="text-indigo-600 dark:text-cream-400">{done}/{total} tópicos</span>
                  <span className="font-medium flex-shrink-0" style={{color}}>{Math.round(pct)}%</span>
                </div>
                <Bar p={pct} c={color} h={6} label={`Progresso de ${skill.name}`}/>
              </div>
            </div>
            <button onClick={onClose} aria-label="Fechar" className="p-2 -m-1 rounded-lg hover:bg-indigo-900/10 dark:hover:bg-cream-200/10 transition-colors motion-reduce:transition-none flex-shrink-0">
              <Icon n="x" s={20} c="text-indigo-600 dark:text-cream-300"/>
            </button>
          </div>
        </div>
      }
      footer={
        <div className="p-4 border-t border-indigo-900/10 dark:border-cream-200/10 bg-cream-50 dark:bg-indigo-950/40 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <span className="text-sm text-indigo-600 dark:text-cream-400 text-center sm:text-left">+{skill.xp} XP ao completar todos os tópicos</span>
          <div className="flex gap-2">
            <button onClick={onQuiz} className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium text-cream-200 text-sm bg-indigo-950 hover:bg-indigo-900 transition-colors motion-reduce:transition-none">
              Quiz
            </button>
            <button onClick={onClose} className="flex-1 sm:flex-none px-5 py-2 rounded-lg font-medium text-indigo-950 text-sm font-medium" style={{backgroundColor:color}}>Fechar</button>
          </div>
        </div>
      }
    >
      {skill.subModules.map(sm=>(
        <SubModCard key={sm.id} sm={sm} exp={expSM===sm.id} onToggle={()=>setExpSM(expSM===sm.id?null:sm.id)} onTopic={(tid)=>onTopic(sm.id,tid)} onExercise={(eid)=>onExercise(sm.id,eid)} onStudy={(tid)=>onStudy(sm.id,tid)} color={color}/>
      ))}
    </Modal>
  );
};
