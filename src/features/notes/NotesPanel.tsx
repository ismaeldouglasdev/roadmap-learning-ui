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
    <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2">Anotações</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3 min-h-0">
        <div className="text-sm font-semibold text-gray-900 dark:text-white break-words">
          {topicName}
        </div>
        {topicUrl && (
          <a
            href={topicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
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
          className="flex-1 w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm text-gray-900 dark:text-white resize-none"
        />
      </div>
    </div>
  );
};
