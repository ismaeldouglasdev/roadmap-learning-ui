import React, { useId } from 'react';
import { SubModule } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';
import { TopicRow } from './TopicRow';

export const SubModCard: React.FC<{sm:SubModule;exp:boolean;onToggle:()=>void;onTopic:(id:string)=>void;onExercise:(id:string)=>void;onStudy:(id:string)=>void;color:string}> = ({sm,exp,onToggle,onTopic,onExercise,onStudy,color}) => {
  const panelId = useId();
  const done = sm.topics.filter(t=>t.completed).length;
  const pct = (done/sm.topics.length)*100;
  const exDone = sm.exercises?.filter(e=>e.completed).length||0;
  const exTotal = sm.exercises?.length||0;
  const diffColor: Record<string,string> = { easy:'bg-emerald-100 text-emerald-700', medium:'bg-amber-100 text-amber-700', hard:'bg-rose-100 text-rose-700' };
  const diffLabel: Record<string,string> = { easy:'Facil', medium:'Medio', hard:'Dificil' };
  return (
    <div className="rounded-xl border border-indigo-900/10 dark:border-cream-200/10 overflow-hidden">
      <button onClick={onToggle} aria-expanded={exp} aria-controls={panelId} className="w-full p-4 flex items-center gap-3 text-left hover:bg-indigo-50 dark:hover:bg-indigo-800/50 transition-colors motion-reduce:transition-none">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-indigo-950 dark:text-cream-100 text-sm">{sm.name}</h4>
            <span className="text-xs text-indigo-400">{done}/{sm.topics.length}</span>
            {exTotal>0 && <span className="text-xs text-indigo-400">| {exDone}/{exTotal} exercicios</span>}
          </div>
          <div className="mt-2"><Bar p={pct} c={color} h={4} label={`Progresso de ${sm.name}: ${done} de ${sm.topics.length} tópicos`}/></div>
        </div>
        <Icon n="down" s={16} c={`text-indigo-400 transition-transform duration-200 flex-shrink-0 motion-reduce:transition-none ${exp?'rotate-180':''}`}/>
      </button>
      {exp && (
        <div id={panelId} className="px-4 pb-4 space-y-2">
          {sm.topics.map(t=><TopicRow key={t.id} t={t} onToggle={()=>onTopic(t.id)} onStudy={()=>onStudy(t.id)}/>)}
          {sm.exercises&&sm.exercises.length>0&&(
            <div className="mt-3 pt-3 border-t border-indigo-900/10 dark:border-cream-200/10">
              <h5 className="text-xs font-semibold text-indigo-500 dark:text-cream-400 mb-2 uppercase tracking-wider">Exercicios</h5>
              {sm.exercises.map(ex=>(
                <div key={ex.id} className={`flex items-center gap-3 p-2 rounded-lg mb-1 ${ex.completed?'bg-emerald-50 dark:bg-emerald-500/10':'bg-cream-50 dark:bg-indigo-800/40'}`}>
                  <button onClick={()=>onExercise(ex.id)} role="checkbox" aria-checked={ex.completed} aria-label={ex.title}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors motion-reduce:transition-none ${ex.completed?'bg-emerald-500 border-emerald-500 text-white':'border-indigo-300 dark:border-cream-200/40'}`}>
                    {ex.completed&&<Icon n="check" s={12}/>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-indigo-950 dark:text-cream-100 break-words">{ex.title}</div>
                    <div className="text-xs text-indigo-500 dark:text-cream-400 truncate">{ex.description}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${diffColor[ex.difficulty]}`}>{diffLabel[ex.difficulty]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
