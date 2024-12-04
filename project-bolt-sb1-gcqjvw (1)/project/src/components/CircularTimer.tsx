import React from 'react';

interface CircularTimerProps {
  timeLeft: number;
  totalTime: number;
}

export function CircularTimer({ timeLeft, totalTime }: CircularTimerProps) {
  const progress = (timeLeft / totalTime) * 100;
  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const minutes = Math.floor(timeLeft);
  const seconds = Math.round((timeLeft - minutes) * 60);

  return (
    <div className="relative w-12 h-12">
      <svg className="transform -rotate-90 w-12 h-12">
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="#e2e8f0"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}