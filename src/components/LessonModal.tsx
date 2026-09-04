import React, { useState, useCallback, useRef } from 'react';
import { Lesson } from '../types';
import { Icon } from './Icon';
import { Bar } from './Bar';

const norm = (s: string) => s.toLowerCase().trim().replace(/[.,;:!?]+$/g, '');

const isAccepted = (input: string, accepted: string[]): boolean => {
  const ni = norm(input);
  if (!ni) return false;
  return accepted.some(a => {
    const na = norm(a);
    return ni === na || (na.length >= 3 && ni.endsWith(na));
  });
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

type StepState = {
  answered: boolean;
  correct: boolean;
  userInput: string;
  showHint: boolean;
};

const MAX_REPEATS = 2;

export const LessonModal: React.FC<{
  lesson: Lesson;
  topicName: string;
  color: string;
  onClose: () => void;
  onComplete: (xp: number) => void;
}> = ({ lesson, topicName, color, onClose, onComplete }) => {
  const [stepStates, setStepStates] = useState<Record<string, StepState>>({});
  const [cursor, setCursor] = useState(0);
  const [inReview, setInReview] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewDone, setReviewDone] = useState(0);
  const optionsCache = useRef<Record<string, number[]>>({});

  const totalSteps = lesson.steps.length;
  const answeredCount = Object.values(stepStates).filter(s => s.answered).length;
  const pct = totalSteps > 0 ? Math.min(100, ((answeredCount + reviewDone) / (totalSteps + reviewTotal)) * 100) : 0;

  const currentStep = inReview
    ? lesson.steps.find(s => s.id === queue[0])
    : lesson.steps[cursor];
  const stepState = currentStep ? stepStates[currentStep.id] : undefined;

  // Shuffle options for mcq steps (cached per step)
  const getShuffledOptions = useCallback((step: any) => {
    if (step.type !== 'mcq') return null;
    if (!optionsCache.current[step.id]) {
      const indices = shuffle([...Array(step.options.length).keys()]);
      optionsCache.current[step.id] = indices;
    }
    return optionsCache.current[step.id];
  }, []);

  // Duolingo-style: wrong answers go to the end of the review queue (max MAX_REPEATS repeats)
  const enqueueIfWrong = useCallback((stepId: string, correct: boolean) => {
    if (correct) return;
    const count = attempts[stepId] ?? 0;
    if (count >= MAX_REPEATS) return;
    setAttempts(prev => ({ ...prev, [stepId]: count + 1 }));
    setQueue(q => [...q, stepId]);
  }, [attempts]);

  const clearStepState = useCallback((stepId: string) => {
    setStepStates(prev => {
      if (!(stepId in prev)) return prev;
      const { [stepId]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (inReview) {
      const next = queue[1];
      if (next) clearStepState(next);
      const rest = queue.slice(1);
      setQueue(rest);
      setReviewDone(d => d + 1);
      if (rest.length === 0) setTimeout(() => onComplete(lesson.xp), 300);
      return;
    }
    if (cursor < totalSteps - 1) {
      setCursor(c => c + 1);
    } else if (queue.length > 0) {
      clearStepState(queue[0]);
      setReviewTotal(queue.length);
      setInReview(true);
    } else {
      onComplete(lesson.xp);
    }
  }, [inReview, queue, cursor, totalSteps, clearStepState, onComplete, lesson.xp]);

  const handleMcq = useCallback((origIdx: number) => {
    if (!currentStep || stepState?.answered) return;
    const correct = origIdx === (currentStep as any).correctIndex;
    setStepStates(prev => ({
      ...prev,
      [currentStep.id]: { answered: true, correct, userInput: String(origIdx), showHint: false },
    }));
    enqueueIfWrong(currentStep.id, correct);
  }, [currentStep, stepState, enqueueIfWrong]);

  const handleTf = useCallback((answer: boolean) => {
    if (!currentStep || stepState?.answered) return;
    const correct = answer === (currentStep as any).answer;
    setStepStates(prev => ({
      ...prev,
      [currentStep.id]: { answered: true, correct, userInput: '', showHint: false },
    }));
    enqueueIfWrong(currentStep.id, correct);
  }, [currentStep, stepState, enqueueIfWrong]);

  const handleFillCheck = useCallback(() => {
    if (!currentStep || stepState?.answered) return;
    const inp = stepState?.userInput || '';
    const correct = isAccepted(inp, (currentStep as any).accepted);
    setStepStates(prev => ({
      ...prev,
      [currentStep.id]: { ...prev[currentStep.id]!, answered: true, correct, showHint: !correct && !prev[currentStep.id]!.showHint },
    }));
    enqueueIfWrong(currentStep.id, correct);
  }, [currentStep, stepState, enqueueIfWrong]);

  const handleCodeCheck = useCallback(() => {
    if (!currentStep || stepState?.answered) return;
    const inp = stepState?.userInput || '';
    const correct = isAccepted(inp, (currentStep as any).accepted);
    setStepStates(prev => ({
      ...prev,
      [currentStep.id]: { ...prev[currentStep.id]!, answered: true, correct, showHint: !correct && !prev[currentStep.id]!.showHint },
    }));
    enqueueIfWrong(currentStep.id, correct);
  }, [currentStep, stepState, enqueueIfWrong]);

  const handleInputChange = useCallback((val: string) => {
    if (!currentStep) return;
    setStepStates(prev => ({
      ...prev,
      [currentStep.id]: { ...prev[currentStep.id]!, userInput: val, showHint: false },
    }));
  }, [currentStep]);

  if (!currentStep || totalSteps === 0) return null;

  const nextLabel = inReview
    ? (queue.length <= 1 ? 'Concluir lição' : 'Próxima revisão')
    : cursor >= totalSteps - 1
      ? (queue.length > 0 ? 'Revisar erros' : 'Concluir lição')
      : 'Próximo';

  const renderStep = () => {
    const s = currentStep;

    if (s.type === 'content') {
      return (
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-bold text-indigo-950">{s.title}</h3>
          <div className="text-sm text-indigo-950 leading-relaxed whitespace-pre-line">{s.body}</div>
          {s.code && (
            <pre className="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-sm overflow-x-auto whitespace-pre">{s.code}</pre>
          )}
          {s.tip && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              💡 {s.tip}
            </div>
          )}
          <button onClick={handleNext} className="w-full py-3 rounded-xl font-semibold text-cream-200 bg-indigo-950 hover:bg-indigo-900 transition-colors">
            {nextLabel}
          </button>
        </div>
      );
    }

    if (s.type === 'mcq') {
      const answered = stepState?.answered;
      const correct = stepState?.correct;
      const shuffled = getShuffledOptions(s);
      const options = shuffled ? shuffled.map(i => s.options[i]) : s.options;
      const origIndices = shuffled ?? s.options.map((_: string, i: number) => i);

      return (
        <div className="space-y-3">
          <p className="text-lg font-medium text-indigo-950">{s.question}</p>
          {s.code && (
            <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-sm overflow-x-auto whitespace-pre">{s.code}</pre>
          )}
          <div className="space-y-2">
            {options.map((opt: string, displayIdx: number) => {
              const origIdx = origIndices[displayIdx];
              let cls = 'border-indigo-900/10 hover:border-indigo-300';
              if (answered) {
                cls = origIdx === (currentStep as any).correctIndex
                  ? 'border-emerald-500 bg-emerald-50'
                  : origIdx === Number(stepStates[currentStep.id]?.userInput)
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-indigo-900/10 opacity-50';
              }
              return (
                <button key={displayIdx} onClick={() => handleMcq(origIdx)} disabled={answered}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-colors ${cls}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-medium flex-shrink-0">{String.fromCharCode(65 + displayIdx)}</span>
                    <span className="text-sm text-indigo-950">{opt}</span>
                    {answered && origIdx === (currentStep as any).correctIndex && <Icon n="check" s={16} c="text-emerald-500 ml-auto"/>}
                    {answered && origIdx === Number(stepStates[currentStep.id]?.userInput) && origIdx !== (currentStep as any).correctIndex && <Icon n="x" s={16} c="text-rose-500 ml-auto"/>}
                  </div>
                </button>
              );
            })}
          </div>
          {answered && (
            <div className={`p-3 rounded-xl text-sm ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
              <p className="font-medium mb-1">{correct ? 'Correto!' : 'Incorreto!'}</p>
              <p className="text-indigo-600">{s.explanation}</p>
            </div>
          )}
          {answered && (
            <button onClick={handleNext} className="w-full py-3 rounded-xl font-semibold text-cream-200 bg-indigo-950 hover:bg-indigo-900 transition-colors">
              {nextLabel}
            </button>
          )}
        </div>
      );
    }

    if (s.type === 'tf') {
      const answered = stepState?.answered;
      const correct = stepState?.correct;
      return (
        <div className="space-y-3">
          <p className="text-lg font-medium text-indigo-950">{s.statement}</p>
          <div className="flex gap-3">
            <button onClick={() => handleTf(true)} disabled={answered}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-colors ${answered && correct ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : answered && !correct ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-indigo-900/10 hover:border-emerald-300 bg-white text-indigo-950'}`}>
              Verdadeiro
            </button>
            <button onClick={() => handleTf(false)} disabled={answered}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-colors ${answered && correct ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : answered && !correct ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-indigo-900/10 hover:border-rose-300 bg-white text-indigo-950'}`}>
              Falso
            </button>
          </div>
          {answered && (
            <div className={`p-3 rounded-xl text-sm ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
              <p className="font-medium mb-1">{correct ? 'Correto!' : 'Incorreto!'}</p>
              <p className="text-indigo-600">{s.explanation}</p>
            </div>
          )}
          {answered && (
            <button onClick={handleNext} className="w-full py-3 rounded-xl font-semibold text-cream-200 bg-indigo-950 hover:bg-indigo-900 transition-colors">
              {nextLabel}
            </button>
          )}
        </div>
      );
    }

    if (s.type === 'fill') {
      const answered = stepState?.answered;
      const correct = stepState?.correct;
      const hint = stepState?.showHint;
      return (
        <div className="space-y-3">
          <p className="text-sm text-indigo-950 whitespace-pre-line">{s.prompt}</p>
          {s.code && (
            <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-sm overflow-x-auto whitespace-pre">{s.code}</pre>
          )}
          <div className="flex gap-2">
            <input type="text" value={stepState?.userInput || ''} onChange={e => handleInputChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !answered && handleFillCheck()}
              placeholder={s.placeholder || 'Digite sua resposta...'}
              className="flex-1 px-4 py-2.5 rounded-xl border border-indigo-900/20 bg-cream-50 text-indigo-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold" autoFocus />
            <button onClick={handleFillCheck} disabled={answered || !(stepState?.userInput || '').trim()}
              className="px-5 py-2.5 rounded-xl font-semibold text-cream-200 bg-indigo-950 hover:bg-indigo-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
              Verificar
            </button>
          </div>
          {hint && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              💡 Dica: {s.hint}
            </div>
          )}
          {answered && (
            <div className={`p-3 rounded-xl text-sm ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
              <p className="font-medium mb-1">{correct ? 'Correto!' : 'Incorreto!'}</p>
              <p className="text-indigo-600">{s.explanation}</p>
            </div>
          )}
          {answered && (
            <button onClick={handleNext} className="w-full py-3 rounded-xl font-semibold text-cream-200 bg-indigo-950 hover:bg-indigo-900 transition-colors">
              {nextLabel}
            </button>
          )}
        </div>
      );
    }

    if (s.type === 'code') {
      const answered = stepState?.answered;
      const correct = stepState?.correct;
      const hint = stepState?.showHint;
      return (
        <div className="space-y-3">
          <p className="text-sm text-indigo-950">{s.instruction}</p>
          {s.code && (
            <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-sm overflow-x-auto whitespace-pre">{s.code}</pre>
          )}
          <p className="text-sm font-medium text-indigo-950">{s.question}</p>
          <div className="flex gap-2">
            <input type="text" value={stepState?.userInput || ''} onChange={e => handleInputChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !answered && handleCodeCheck()}
              placeholder={s.placeholder || 'Digite sua resposta...'}
              className="flex-1 px-4 py-2.5 rounded-xl border border-indigo-900/20 bg-cream-50 font-mono text-indigo-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold" autoFocus />
            <button onClick={handleCodeCheck} disabled={answered || !(stepState?.userInput || '').trim()}
              className="px-5 py-2.5 rounded-xl font-semibold text-cream-200 bg-indigo-950 hover:bg-indigo-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
              Verificar
            </button>
          </div>
          {hint && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              💡 Dica: {s.hint}
            </div>
          )}
          {answered && (
            <div className={`p-3 rounded-xl text-sm ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
              <p className="font-medium mb-1">{correct ? 'Correto!' : 'Incorreto!'}</p>
              <p className="text-indigo-600">{s.explanation}</p>
            </div>
          )}
          {answered && (
            <button onClick={handleNext} className="w-full py-3 rounded-xl font-semibold text-cream-200 bg-indigo-950 hover:bg-indigo-900 transition-colors">
              {nextLabel}
            </button>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-indigo-900/10 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-indigo-950">{topicName}</h3>
            <p className="text-sm text-indigo-600">
              {inReview ? `Revisão (${queue.length} restante${queue.length > 1 ? 's' : ''})` : `Passo ${cursor + 1} de ${totalSteps}`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-indigo-900/10 transition-colors">
            <Icon n="x" s={18} c="text-indigo-600"/>
          </button>
        </div>
        <div className="p-1"><Bar p={pct} c={color} h={3}/></div>
        <div className="flex-1 overflow-y-auto p-6">
          {inReview && (
            <div className="mb-4 p-3 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 text-sm">
              🔄 Revisão: você errou esta questão antes — tente acertar agora!
            </div>
          )}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
