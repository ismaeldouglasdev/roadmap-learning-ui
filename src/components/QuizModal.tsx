import React, { useState } from 'react';
import { quizData } from '../data/quizzes';
import { Icon } from './Icon';
import { Bar } from './Bar';

export const QuizModal: React.FC<{skillId:string;skillName:string;color:string;onClose:()=>void;onPass:(xp:number)=>void}> = ({skillId,skillName,color,onClose,onPass}) => {
  const quiz = quizData.find(q=>q.skillId===skillId);
  const [current,setCurrent] = useState(0);
  const [selected,setSelected] = useState<number|null>(null);
  const [showResult,setShowResult] = useState(false);
  const [score,setScore] = useState(0);
  const [answers,setAnswers] = useState<(number|null)[]>([]);

  if(!quiz) return null;
  const q = quiz.questions[current];
  const total = quiz.questions.length;
  const isLast = current===total-1;

  const handleSelect = (idx:number) => {
    if(selected!==null) return;
    setSelected(idx);
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if(idx===q.correctIndex) setScore(s=>s+1);
  };

  const handleNext = () => {
    if(isLast){
      setShowResult(true);
      const finalScore = selected===q.correctIndex ? score+1 : score;
      const passed = finalScore >= Math.ceil(total*0.6);
      if(passed) onPass(25);
    } else {
      setCurrent(c=>c+1);
      setSelected(null);
    }
  };

  const finalScore = score;
  const passed = finalScore >= Math.ceil(total*0.6);

  if(showResult){
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-sm" onClick={onClose}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center" onClick={e=>e.stopPropagation()}>
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed?'bg-emerald-100':'bg-rose-100'}`}>
            <Icon n={passed?'star':'x'} s={40} c={passed?'text-emerald-500':'text-rose-500'}/>
          </div>
          <h2 className="font-heading text-2xl font-bold text-indigo-950 mb-2">{passed?'Parabens!':'Continue estudando'}</h2>
          <p className="text-indigo-600 mb-4">{passed?'Voce passou no quiz!':'Nao atingiu a nota minima (60%)'}</p>
          <div className="text-5xl font-bold mb-4" style={{color:passed?color:'#EF4444'}}>{finalScore}/{total}</div>
          <p className="text-sm text-indigo-600 mb-6">{passed?'+25 XP ganhos!':'Tente novamente apos estudar mais'}</p>
          <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold text-cream-200" style={{backgroundColor:color}}>Fechar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="p-4 border-b border-indigo-900/10 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-indigo-950">{skillName} Quiz</h3>
            <p className="text-sm text-indigo-600">Pergunta {current+1} de {total}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-indigo-900/10"><Icon n="x" s={18} c="text-indigo-600"/></button>
        </div>
        <div className="p-1"><Bar p={((current+1)/total)*100} c={color} h={3}/></div>
        <div className="p-6">
          <p className="text-lg font-medium text-indigo-950 mb-4">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt,idx)=>{
              const isSelected = selected===idx;
              const isCorrect = idx===q.correctIndex;
              const showCorrect = selected!==null && isCorrect;
              let cls = 'border-indigo-900/10 hover:border-indigo-300';
              if(isSelected) cls = isCorrect?'border-emerald-500 bg-emerald-50':'border-rose-500 bg-rose-50';
              else if(showCorrect) cls = 'border-emerald-500 bg-emerald-50';
              return (
                <button key={idx} onClick={()=>handleSelect(idx)} disabled={selected!==null} className={`w-full p-3 rounded-xl border-2 text-left transition-all ${cls}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-medium flex-shrink-0">{String.fromCharCode(65+idx)}</span>
                    <span className="text-sm text-indigo-950">{opt}</span>
                    {showCorrect && <Icon n="check" s={16} c="text-emerald-500 ml-auto"/>}
                    {isSelected && !isCorrect && <Icon n="x" s={16} c="text-rose-500 ml-auto"/>}
                  </div>
                </button>
              );
            })}
          </div>
          {selected!==null && (
            <div className={`mt-4 p-3 rounded-xl ${selected===q.correctIndex?'bg-emerald-50 border border-emerald-200':'bg-rose-50 border border-rose-200'}`}>
              <p className="text-sm font-medium mb-1">{selected===q.correctIndex?'Correto!':'Incorreto!'}</p>
              <p className="text-sm text-indigo-600">{q.explanation}</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-indigo-900/10 flex justify-end">
          <button onClick={handleNext} disabled={selected===null} className="px-6 py-2 rounded-xl font-semibold text-cream-200 disabled:opacity-50 disabled:cursor-not-allowed" style={{backgroundColor:color}}>
            {isLast?'Ver Resultado':'Proxima'}
          </button>
        </div>
      </div>
    </div>
  );
};
