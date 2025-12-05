/**
 * Reusable Textarea Component
 * - Multi-line input
 * - Auto-expand
 * - Validation styling
 */

import React, { useState } from 'react';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function FormTextarea({
  label,
  value,
  onChange,
  error,
  placeholder,
  rows = 3,
  className = ''
}: FormTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-white mb-2">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-lg text-sm
          bg-slate-700/30 text-white placeholder-slate-500
          border resize-none transition-all focus:outline-none
          ${
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
              : 'border-slate-600/50 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30'
          }
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}