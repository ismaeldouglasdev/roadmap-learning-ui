import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Nome acessível do diálogo (anunciado por leitores de tela). */
  title: React.ReactNode;
  children: React.ReactNode;
  /** Classes extras do painel (largidade máxima, etc.). */
  panelClassName?: string;
  /** Classes extras do corpo rolável. */
  bodyClassName?: string;
  /** Cabeçalho customizado; `undefined` usa o padrão, `null` remove. */
  header?: React.ReactNode;
  /** Rodapé fixo fora da área rolável. */
  footer?: React.ReactNode;
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

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  panelClassName,
  bodyClassName,
  header,
  footer,
}) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const useDefaultHeader = header === undefined;

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-indigo-950/80 backdrop-blur-sm"
      onClick={event => {
        if (event.target === backdropRef.current) onCloseRef.current();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`w-full bg-white dark:bg-indigo-900 rounded-2xl shadow-2xl outline-none max-h-[92dvh] flex flex-col overflow-hidden ${
          panelClassName ?? 'max-w-lg'
        }`}
        onClick={event => event.stopPropagation()}
      >
        {useDefaultHeader ? (
          <div className="flex-none p-4 border-b border-indigo-900/10 dark:border-cream-200/10 flex items-center justify-between gap-3">
            <h2 id={titleId} className="font-heading font-bold text-indigo-950 dark:text-cream-100 truncate">
              {title}
            </h2>
            <button
              type="button"
              onClick={onCloseRef.current}
              aria-label="Fechar"
              className="p-2 -m-1 rounded-lg hover:bg-indigo-900/10 dark:hover:bg-cream-200/10 transition-colors motion-reduce:transition-none flex-shrink-0"
            >
              <Icon n="x" s={18} c="text-indigo-600 dark:text-cream-300" />
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId} className="sr-only">
              {title}
            </h2>
            {header}
          </>
        )}

        <div className={`flex-1 min-h-0 overflow-y-auto overscroll-contain ${bodyClassName ?? ''}`}>{children}</div>

        {footer ? <div className="flex-none">{footer}</div> : null}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
