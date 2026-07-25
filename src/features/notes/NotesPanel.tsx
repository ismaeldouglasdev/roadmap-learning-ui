import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store';

interface NotesPanelProps {
  topicId: string;
  topicName: string;
  topicUrl: string;
  onClose: () => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ topicId, topicName, topicUrl, onClose }) => {
  const { notes, setNote } = useStore();
  const [text, setText] = useState(notes[topicId] || '');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync state if topicId changes
  useEffect(() => {
    setText(notes[topicId] || '');
  }, [topicId, notes]);

  // Debounced save
  const handleChange = (newVal: string) => {
    setText(newVal);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setNote(topicId, newVal);
    }, 500);
  };

  // Blur saves immediately
  const handleBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNote(topicId, text);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-indigo-900/10 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
      <div className="p-4 border-b border-indigo-900/10 flex items-center justify-between">
        <h3 className="font-heading font-bold text-indigo-950 truncate pr-2">Anotações</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-indigo-900/10 transition-colors">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3 min-h-0">
        <div className="text-sm font-semibold text-indigo-950 break-words">
          {topicName}
        </div>
        {topicUrl && (
          <a
            href={topicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gold-dark hover:underline flex items-center gap-1"
          >
            <span>Acessar link</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        <textarea
          value={text}
          onChange={e => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder="Escreva suas anotações pessoais aqui... (Salva automaticamente)"
          className="flex-1 w-full p-3 bg-cream-50 border border-indigo-900/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-sm text-indigo-950 resize-none"
        />
      </div>
    </div>
  );
};
