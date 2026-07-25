import React from 'react';
import { Topic } from '../types';
import { Icon, typeIcon, typeColor, typeLabel } from './Icon';

export const TopicRow: React.FC<{t:Topic;onToggle:()=>void}> = ({t,onToggle}) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${t.completed?'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800':'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{backgroundColor:typeColor[t.type]}}>
      <Icon n={typeIcon[t.type]} s={16}/>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        {t.completed && <Icon n="check" s={13} c="text-green-500 flex-shrink-0"/>}
        <span className={`text-sm font-medium truncate ${t.completed?'text-green-700 dark:text-green-400':'text-gray-900 dark:text-white'}`}>{t.name}</span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{typeLabel[t.type]}</span>
    </div>
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <a href={t.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
        className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors" title="Abrir link">
        <Icon n="link" s={14}/>
      </a>
      <button onClick={onToggle} className={`p-1.5 rounded-lg transition-colors ${t.completed?'bg-green-100 dark:bg-green-900/30 text-green-600':'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200'}`} title={t.completed?'Desmarcar':'Marcar como concluido'}>
        <Icon n={t.completed?'check':'right'} s={14}/>
      </button>
    </div>
  </div>
);
