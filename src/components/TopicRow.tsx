import React from 'react';
import { Topic } from '../types';
import { Icon, typeIcon, typeColor, typeLabel } from './Icon';
import { hasLesson } from '../data/lessons';

interface TopicRowProps {
  t: Topic;
  favorite: boolean;
  hasNote: boolean;
  onToggle: () => void;
  onStudy: () => void;
  onFavorite: () => void;
  onNotes: () => void;
}

export const TopicRow: React.FC<TopicRowProps> = ({ t, favorite, hasNote, onToggle, onStudy, onFavorite, onNotes }) => (
  <div className={`flex flex-wrap items-center gap-3 p-3 rounded-lg border transition-all ${t.completed?'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-400/30':'bg-white dark:bg-indigo-800/40 border-indigo-900/10 dark:border-cream-200/10 hover:border-indigo-300'}`}>
    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{backgroundColor:typeColor[t.type]}}>
      <Icon n={typeIcon[t.type]} s={16}/>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        {t.completed && <Icon n="check" s={13} c="text-emerald-500 flex-shrink-0"/>}
        <span className={`text-sm font-medium truncate ${t.completed?'text-emerald-700 dark:text-emerald-300':'text-indigo-950 dark:text-cream-100'}`}>{t.name}</span>
      </div>
      <span className="text-xs text-indigo-500 dark:text-cream-400">{typeLabel[t.type]}</span>
    </div>
    <div className="flex items-center gap-1.5 flex-shrink-0 w-full sm:w-auto justify-end">
      <button onClick={onFavorite} aria-pressed={favorite} aria-label={favorite ? `Remover ${t.name} dos favoritos` : `Favoritar ${t.name}`}
        title={favorite ? 'Remover dos favoritos' : 'Favoritar'}
        className={`relative p-2 sm:p-1.5 rounded-lg transition-colors motion-reduce:transition-none ${favorite?'bg-gold/20 text-gold-dark':'bg-indigo-100 dark:bg-indigo-700/50 text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-700'}`}>
        <Icon n="star" s={14} filled={favorite}/>
      </button>
      <button onClick={onNotes} aria-label={`Abrir anotações de ${t.name}`} title={hasNote ? 'Ver anotações' : 'Adicionar anotação'}
        className={`relative p-2 sm:p-1.5 rounded-lg transition-colors motion-reduce:transition-none ${hasNote?'bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300':'bg-indigo-100 dark:bg-indigo-700/50 text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-700'}`}>
        <Icon n="pencil" s={14}/>
        {hasNote && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-300" aria-hidden="true"/>}
      </button>
      {hasLesson() && (
        <button onClick={onStudy} aria-label={`Estudar lição de ${t.name}`} className="p-2 sm:p-1.5 rounded-lg bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-500/30 transition-colors motion-reduce:transition-none">
          <Icon n="play" s={14}/>
        </button>
      )}
      <a href={t.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
        aria-label={`Abrir link de ${t.name}`} className="p-2 sm:p-1.5 rounded-lg bg-gold/10 text-gold-dark hover:bg-gold/20 transition-colors motion-reduce:transition-none">
        <Icon n="link" s={14}/>
      </a>
      <button onClick={onToggle} aria-pressed={t.completed} aria-label={t.completed ? `Desmarcar ${t.name}` : `Marcar ${t.name} como concluído`}
        className={`p-2 sm:p-1.5 rounded-lg transition-colors motion-reduce:transition-none ${t.completed?'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300':'bg-indigo-100 dark:bg-indigo-700/50 text-indigo-400 hover:bg-indigo-200'}`}
        title={t.completed?'Desmarcar':'Marcar como concluido'}>
        <Icon n={t.completed?'check':'right'} s={14}/>
      </button>
    </div>
  </div>
);
