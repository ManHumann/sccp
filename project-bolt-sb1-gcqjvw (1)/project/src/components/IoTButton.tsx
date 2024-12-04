import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CircularTimer } from './CircularTimer';

interface IoTButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  hasTimer?: boolean;
  timeLeft?: number;
  totalTime?: number;
  onClick: () => void;
  onTimerSet?: (minutes: number) => void;
}

export function IoTButton({
  icon: Icon,
  label,
  isActive,
  hasTimer,
  timeLeft,
  totalTime,
  onClick,
  onTimerSet
}: IoTButtonProps) {
  const handleTimerSet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTimerSet?.(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className={`p-6 rounded-xl transition-all duration-300 relative ${
          isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
        } hover:scale-105`}
      >
        <Icon size={32} className={isActive ? 'text-white' : 'text-gray-600'} />
        {hasTimer && isActive && timeLeft && totalTime && (
          <div className="absolute -top-2 -right-2">
            <CircularTimer timeLeft={timeLeft} totalTime={totalTime} />
          </div>
        )}
      </button>
      <span className="text-sm font-medium">{label}</span>
      {hasTimer && isActive && (
        <select
          onChange={handleTimerSet}
          className="mt-2 p-1 rounded border border-gray-300 text-sm"
          defaultValue=""
        >
          <option value="" disabled>Set Timer</option>
          <option value="1">1 min</option>
          <option value="5">5 mins</option>
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
          <option value="60">1 hour</option>
        </select>
      )}
    </div>
  );
}