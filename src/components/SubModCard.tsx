import React from 'react';
import { SubModule } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';
import { TopicRow } from './TopicRow';

export const SubModCard: React.FC<{sm:SubModule;exp:boolean;onToggle:()=>void;onTopic:(id:string)=>void;onExercise:(id:string)=>void;color:string}> = ({sm,exp,onToggle,onTopic,onExercise,color}) => {
  const done = sm.topics.filter(t=>t.completed).length;
  const pct = (done/sm.topics.length)*100;
  const exDone = sm.exercises?.filter(e=>e.completed).length||0;
  const exTotal = sm.exercises?.length||0;
  const diffColor: Record<string,string> = { easy:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', medium:'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', hard:'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  const diffLabel: Record<string,string> = { easy:'Facil', medium:'Medio', hard:'Dificil' };
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button onClick={onToggle} className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{sm.name}</h4>
            <span className="text-xs text-gray-400">{done}/{sm.topics.length}</span>
            {exTotal>0 && <span className="text-xs text-gray-400">| {exDone}/{exTotal} exercicios</span>}
          </div>
          <div className="mt-2"><Bar p={pct} c={color} h={4}/></div>
        </div>
        <Icon n="down" s={16} c={`text-gray-400 transition-transform duration-200 ${exp?'rotate-180':''}`}/>
      </button>
      {exp && (
        <div className="px-4 pb-4 space-y-2">
          {sm.topics.map(t=><TopicRow key={t.id} t={t} onToggle={()=>onTopic(t.id)}/>)}
          {sm.exercises&&sm.exercises.length>0&&(
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Exercicios</h5>
              {sm.exercises.map(ex=>(
                <div key={ex.id} className={`flex items-center gap-3 p-2 rounded-lg mb-1 ${ex.completed?'bg-green-50 dark:bg-green-900/20':'bg-gray-50 dark:bg-gray-800/50'}`}>
                  <button onClick={()=>onExercise(ex.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${ex.completed?'bg-green-500 border-green-500 text-white':'border-gray-300 dark:border-gray-600'}`}>
                    {ex.completed&&<Icon n="check" s={12}/>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 dark:text-white">{ex.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{ex.description}</div>
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
