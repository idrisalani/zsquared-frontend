/**
 * Event Hours Input Component
 * - Increment/decrement event hours
 * - Min validation
 * - Display current hours
 */

import { ChevronDown, ChevronUp } from 'lucide-react';

interface EventHoursInputProps {
  minHours: number;
  onChange: (hours: number) => void;
  value?: number;
}

export function EventHoursInput({
  minHours,
  onChange,
  value = minHours
}: EventHoursInputProps) {
  const handleDecrement = (): void => {
    if (value > minHours) {
      onChange(value - 1);
    }
  };

  const handleIncrement = (): void => {
    onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue) && inputValue >= minHours) {
      onChange(inputValue);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Decrement Button */}
      <button
        onClick={handleDecrement}
        disabled={value <= minHours}
        className={`
          flex h-10 w-10 items-center justify-center rounded-lg transition
          ${value <= minHours
            ? 'cursor-not-allowed bg-slate-700/30 text-slate-500'
            : 'bg-slate-700/50 text-cyan-400 hover:bg-slate-600/50'
          }
        `}
      >
        <ChevronDown size={20} />
      </button>

      {/* Input Field */}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={minHours}
        className="w-20 rounded-lg border border-slate-600/50 bg-slate-700/30 px-3 py-2 text-center font-semibold text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
      />

      {/* Increment Button */}
      <button
        onClick={handleIncrement}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/50 text-cyan-400 transition hover:bg-slate-600/50"
      >
        <ChevronUp size={20} />
      </button>

      {/* Hour Label */}
      <span className="text-sm text-slate-400">
        hour{value !== 1 ? 's' : ''}
      </span>
    </div>
  );
}