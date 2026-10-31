import React from 'react';

export const Bar: React.FC<{p:number;c:string;h?:number;label?:string}> = ({p,c,h=8,label}) => {
  const value = Math.min(Math.max(p,0),100);
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(value)}%`}
      aria-label={label}
      className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      style={{height:h}}
    >
      <div className="h-full rounded-full transition-all duration-500 motion-reduce:transition-none" style={{width:`${value}%`,backgroundColor:c}}/>
    </div>
  );
};
