import React from 'react';
import { Topic } from '../types';
import { Icon, typeIcon, typeColor, typeLabel } from './Icon';

export const TopicRow: React.FC<{t:Topic;onToggle:()=>void}> = ({t,onToggle}) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${t.completed?'bg-emerald-50 border-emerald-200':'bg-white border-indigo-900/10 hover:border-indigo-300'}`}>
    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{backgroundColor:typeColor[t.type]}}>
      <Icon n={typeIcon[t.type]} s={16}/>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        {t.completed && <Icon n="check" s={13} c="text-emerald-500 flex-shrink-0"/>}
        <span className={`text-sm font-medium truncate ${t.completed?'text-emerald-700':'text-indigo-950'}`}>{t.name}</span>
      </div>
      <span className="text-xs text-indigo-500">{typeLabel[t.type]}</span>
    </div>
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <a href={t.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
        className="p-1.5 rounded-lg bg-gold/10 text-gold-dark hover:bg-gold/20 transition-colors" title="Abrir link">
        <Icon n="link" s={14}/>
      </a>
      <button onClick={onToggle} className={`p-1.5 rounded-lg transition-colors ${t.completed?'bg-emerald-100 text-emerald-600':'bg-indigo-100 text-indigo-400 hover:bg-indigo-200'}`} title={t.completed?'Desmarcar':'Marcar como concluido'}>
        <Icon n={t.completed?'check':'right'} s={14}/>
      </button>
    </div>
  </div>
);
