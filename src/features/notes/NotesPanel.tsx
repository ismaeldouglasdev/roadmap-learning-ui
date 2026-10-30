import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store';

interface NotesPanelProps {
  topicId: string;
  topicName: string;
  topicUrl: string;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const getFocusable = (root: HTMLElement | null): HTMLElement[] => {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getAttribute('aria-hidden') !== 'true' && el.tabIndex !== -1
  );
};

const hasFocusInside = (root: HTMLElement | null): boolean => {
  const active = document.activeElement as HTMLElement | null;
  return Boolean(root && active && root.contains(active));
};

export const NotesPanel: React.FC<NotesPanelProps> = ({ topicId, topicName, topicUrl, onClose }) => {
  const { notes, setNote } = useStore();
  const [text, setText] = useState(notes[topicId] || '');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setText(notes[topicId] || '');
  }, [topicId, notes]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      if (hasFocusInside(panelRef.current)) return;
      const first = getFocusable(panelRef.current)[0];
      (first ?? panelRef.current)?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = getFocusable(panelRef.current);
      if (focusables.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !panelRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setNote(topicId, text);
    };
  }, [topicId, text, setNote]);

  const handleChange = (newVal: string) => {
    setText(newVal);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setNote(topicId, newVal);
    }, 500);
  };

  const handleBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNote(topicId, text);
  };

  return (
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-50 bg-indigo-950/50 backdrop-blur-sm sm:hidden"
        onClick={event => {
          if (event.target === backdropRef.current) onCloseRef.current();
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white dark:bg-indigo-900 border-l border-indigo-900/10 dark:border-cream-200/10 shadow-2xl z-50 flex flex-col outline-none"
      >
        <div className="flex-none p-4 border-b border-indigo-900/10 dark:border-cream-200/10 flex items-center justify-between gap-3">
          <h2 id={titleId} className="font-heading font-bold text-indigo-950 dark:text-cream-100 truncate pr-2">Anotações</h2>
          <button onClick={onCloseRef.current} aria-label="Fechar anotações" className="p-2 -m-1 rounded-lg hover:bg-indigo-900/10 dark:hover:bg-cream-200/10 transition-colors motion-reduce:transition-none flex-shrink-0">
            <svg aria-hidden="true" className="w-5 h-5 text-indigo-600 dark:text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-3 min-h-0 pb-[env(safe-area-inset-bottom)]">
          <div className="text-sm font-semibold text-indigo-950 dark:text-cream-100 break-words">
            {topicName}
          </div>
          {topicUrl && (
            <a
              href={topicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gold-dark dark:text-gold hover:underline flex items-center gap-1"
            >
              <span>Acessar link</span>
              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <textarea
            value={text}
            onChange={e => handleChange(e.target.value)}
            onBlur={handleBlur}
            aria-label={`Anotações sobre ${topicName}`}
            placeholder="Escreva suas anotações pessoais aqui... (Salva automaticamente)"
            className="flex-1 w-full min-h-[30vh] p-3 bg-cream-50 dark:bg-indigo-950/50 border border-indigo-900/10 dark:border-cream-200/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-sm text-indigo-950 dark:text-cream-100 resize-none"
          />
        </div>
      </div>
    </>
  );
};
