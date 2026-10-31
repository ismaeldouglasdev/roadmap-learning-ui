import React from 'react';

export const typeIcon: Record<string,string> = { doc:'book', video:'video', course:'play', exercise:'code', article:'book' };
export const typeColor: Record<string,string> = { doc:'#3B82F6', video:'#EF4444', course:'#10B981', exercise:'#F59E0B', article:'#8B5CF6' };
export const typeLabel: Record<string,string> = { doc:'Documentação', video:'Video', course:'Curso', exercise:'Exercicio', article:'Artigo' };

export const Icon: React.FC<{n:string;s?:number;c?:string;filled?:boolean}> = ({n,s=24,c='',filled=false}) => {
  const d: Record<string,React.ReactNode> = {
    code:<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    server:<><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    database:<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    brain:<><circle cx="12" cy="10" r="6"/><path d="M12 16v4"/><path d="M8 20h8"/></>,
    gear:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    users:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    star:<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    trophy:<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
    fire:<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    lightning:<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    crown:<><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></>,
    check:<polyline points="20 6 9 17 4 12"/>,
    lock:<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    down:<polyline points="6 9 12 15 18 9"/>,
    right:<polyline points="9 18 15 12 9 6"/>,
    link:<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    book:<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>,
    video:<><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
    play:<polygon points="5 3 19 12 5 21 5 3"/>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrowLeft:<polyline points="15 18 9 12 15 6"/>,
    pencil:<><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></>,
    shield:<><path d="M12 2l4.86 5.49C17.7 10.75 19 14.02 19 18a8 8 0 0 1-16 0c0-3.98 1.3-7.25 4.14-10.51L12 2Z"/><path d="M12 14.5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5Z"/></>,
    globe:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></>,
    utensils:<><path d="M17 2v2a7 7 0 0 1-1.943 5.347L13 7l-.51-.51a7 7 0 0 1-5.347-1.943L7 2v2a7 7 0 0 1 5.347 1.943L17 5l.51.51A7 7 0 0 1 17 2Z"/><path d="M12 7v13"/><path d="M5 12l6 6 6-6"/></>,
    camera:<><path d="M14.5 4H9.5C7.3 4 5.5 5.8 5.5 8v8c0 2.2 1.8 4 4 4h5c2.2 0 4-1.8 4-4V8c0-2.2-1.8-4-4-4Z"/><circle cx="12" cy="9" r="3"/></>,
    scissors:<><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="7.32" y1="8.17" x2="9.17" y2="6.32"/><line x1="10.83" y1="10.83" x2="12" y2="12"/><line x1="7.32" y1="17.83" x2="9.17" y2="19.68"/><line x1="10.83" y1="15.17" x2="12" y2="12"/><line x1="14.83" y1="8.17" x2="12.66" y2="6.32"/><line x1="15.17" y1="15.17" x2="12" y2="12"/><line x1="14.83" y1="17.83" x2="12.66" y2="19.68"/><line x1="15.17" y1="10.83" x2="12" y2="12"/><path d="M7 11v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16"/><path d="M12 11h4a1 1 0 0 1 0 2h-4"/></>,
    heart:<><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></>,
    chat:<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 8.5c-9 1.1-14-3-16-9.3 0-4.88-1-6.8-1-9 0-3 1.5-4 3-4.5 0-.1-.05-.2-.1-.2L7 6l.1-.2c0-.1 0-.2-.1-.2-2.3-.1-3 1-3 1.5 0 2.2 1 4.12 1 9 0 6 2 10.3 16 9.3 3.7-.6 6.9-1.5 8-3 1.5-1.3 2.5-3.2 2.3-4.8-.2-1.2-1-2-2.5-2Z"/></>,
    music:<><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} aria-hidden="true" focusable="false">{d[n]}</svg>;
};
