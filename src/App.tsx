import React, { useState, useEffect } from 'react';
import { Phase, Skill, Achievement } from './types';
import { initialPhases } from './data/roadmap-dev';
import { initialAchievements } from './data/achievements';
import { Stats } from './components/Stats';
import { PhaseCard } from './components/PhaseCard';
import { Badge } from './components/Badge';
import { SkillModal } from './components/SkillModal';
import { QuizModal } from './components/QuizModal';

const loadProgress = () => { try { const s = localStorage.getItem('roadmap-progress'); return s ? JSON.parse(s) : null; } catch { return null; } };
const saveProgress = (ph: Phase[], ach: Achievement[], xp: number, st: number) => { localStorage.setItem('roadmap-progress', JSON.stringify({phases:ph, achievements:ach, xp, streak:st})); };

const App: React.FC = () => {
  const [phases,setPhases] = useState<Phase[]>(initialPhases);
  const [achievements,setAchievements] = useState<Achievement[]>(initialAchievements);
  const [xp,setXp] = useState(0);
  const [streak] = useState(1);
  const [expandedPhase,setExpandedPhase] = useState<string|null>('phase-1');
  const [selectedSkill,setSelectedSkill] = useState<{skill:Skill;color:string}|null>(null);
  const [quizOpen,setQuizOpen] = useState(false);

  useEffect(()=>{ const s=loadProgress(); if(s){setPhases(s.phases);setAchievements(s.achievements);setXp(s.xp);} },[]);
  useEffect(()=>{ saveProgress(phases,achievements,xp,streak); },[phases,achievements,xp,streak]);

  useEffect(()=>{
    const tc = phases.reduce((a,p)=>a+p.skills.filter(s=>s.completed).length,0);
    const cp = phases.filter(p=>p.skills.every(s=>s.completed)).length;
    setAchievements(p=>p.map(a=>{
      if(a.id==='first-skill'&&tc>=1) return{...a,earned:true};
      if(a.id==='phase-complete'&&cp>=1) return{...a,earned:true};
      if(a.id==='xp-500'&&xp>=500) return{...a,earned:true};
      if(a.id==='xp-1000'&&xp>=1000) return{...a,earned:true};
      if(a.id==='streak-7'&&streak>=7) return{...a,earned:true};
      if(a.id==='all-phases'&&cp===phases.length) return{...a,earned:true};
      return a;
    }));
  },[phases,xp,streak]);

  useEffect(()=>{
    setPhases(p=>p.map((ph,i)=>{
      if(i===0) return{...ph,unlocked:true};
      return{...ph,unlocked:p[i-1].skills.every(s=>s.completed)};
    }));
  },[phases]);

  const handleTopicToggle = (phaseId:string, skillId:string, subModId:string, topicId:string) => {
    setPhases(prev=>prev.map(ph=>{
      if(ph.id!==phaseId) return ph;
      return{...ph,skills:ph.skills.map(sk=>{
        if(sk.id!==skillId) return sk;
        return{...sk,subModules:sk.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,topics:sm.topics.map(t=>t.id===topicId?{...t,completed:!t.completed}:t)};
        })};
      })};
    }));
    if(selectedSkill&&selectedSkill.skill.id===skillId){
      setSelectedSkill(prev=>{
        if(!prev) return null;
        return{...prev,skill:{...prev.skill,subModules:prev.skill.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,topics:sm.topics.map(t=>t.id===topicId?{...t,completed:!t.completed}:t)};
        })}};
      });
    }
  };

  const handleExerciseToggle = (phaseId:string, skillId:string, subModId:string, exerciseId:string) => {
    setPhases(prev=>prev.map(ph=>{
      if(ph.id!==phaseId) return ph;
      return{...ph,skills:ph.skills.map(sk=>{
        if(sk.id!==skillId) return sk;
        return{...sk,subModules:sk.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,exercises:sm.exercises?.map(e=>e.id===exerciseId?{...e,completed:!e.completed}:e)||[]};
        })};
      })};
    }));
    if(selectedSkill&&selectedSkill.skill.id===skillId){
      setSelectedSkill(prev=>{
        if(!prev) return null;
        return{...prev,skill:{...prev.skill,subModules:prev.skill.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,exercises:sm.exercises?.map(e=>e.id===exerciseId?{...e,completed:!e.completed}:e)||[]};
        })}};
      });
    }
  };

  useEffect(()=>{
    phases.forEach(ph=>{
      ph.skills.forEach(sk=>{
        const allDone = sk.subModules.every(sm=>sm.topics.every(t=>t.completed));
        if(allDone&&!sk.completed){
          setPhases(p=>p.map(x=>x.id!==ph.id?x:{...x,skills:x.skills.map(s=>{
            if(s.id!==sk.id) return s;
            if(!s.completed) setXp(prev=>prev+s.xp);
            return{...s,completed:true};
          })}));
        }
      });
    });
  },[phases]);

  const openSkill = (sk:Skill) => {
    const ph = phases.find(p=>p.skills.some(s=>s.id===sk.id));
    setSelectedSkill({skill:sk, color:ph?.color||'#10B981'});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Roadmap de Desenvolvimento</h1>
          <p className="text-gray-600 dark:text-gray-400">Clique numa skill para ver assuntos e links de estudo. Marque topicos concluidos para ganhar XP!</p>
        </div>
        <div className="mb-8"><Stats xp={xp} streak={streak}/></div>
        <div className="mb-8 relative">
          <div className="absolute left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full"/>
          <div className="space-y-4">
            {phases.map(ph=>(
              <div key={ph.id} className="relative pl-16">
                <div className={`absolute left-4 w-7 h-7 rounded-full border-4 border-white dark:border-gray-900 ${ph.unlocked?'bg-green-500':'bg-gray-300 dark:bg-gray-600'}`} style={{top:20}}/>
                <PhaseCard phase={ph} expanded={expandedPhase===ph.id} onToggle={()=>setExpandedPhase(expandedPhase===ph.id?null:ph.id)} onSkillClick={openSkill}/>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Conquistas</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">{achievements.map(a=><Badge key={a.id} a={a}/>)}</div>
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Desenvolvido por Ismael Douglas
        </div>
      </div>
      {selectedSkill && (
        <SkillModal skill={selectedSkill.skill} color={selectedSkill.color} onClose={()=>setSelectedSkill(null)}
          onTopic={(smId,tId)=>{
            const ph = phases.find(p=>p.skills.some(s=>s.id===selectedSkill.skill.id));
            if(ph) handleTopicToggle(ph.id,selectedSkill.skill.id,smId,tId);
          }}
          onExercise={(smId,exId)=>{
            const ph = phases.find(p=>p.skills.some(s=>s.id===selectedSkill.skill.id));
            if(ph) handleExerciseToggle(ph.id,selectedSkill.skill.id,smId,exId);
          }}
          onQuiz={()=>setQuizOpen(true)}
        />
      )}
      {quizOpen && selectedSkill && (
        <QuizModal skillId={selectedSkill.skill.id} skillName={selectedSkill.skill.name} color={selectedSkill.color} onClose={()=>setQuizOpen(false)} onPass={(xp)=>{setXp(prev=>prev+xp);}}/>
      )}
    </div>
  );
};

export default App;
