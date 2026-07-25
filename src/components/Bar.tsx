import React from 'react';

export const Bar: React.FC<{p:number;c:string;h?:number}> = ({p,c,h=8}) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" style={{height:h}}>
    <div className="h-full rounded-full transition-all duration-500" style={{width:`${Math.min(p,100)}%`,backgroundColor:c}}/>
  </div>
);
