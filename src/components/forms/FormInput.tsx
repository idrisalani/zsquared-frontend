/**
 * Reusable Form Input Component
 * - Email, text, tel, number inputs
 * - Validation styling
 * - Error messages
 * - Icons
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, Lock } from 'lucide-react';

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required,
  className = ''
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'email':
        return <Mail size={16} />;
      case 'tel':
        return <Phone size={16} />;
      case 'password':
        return <Lock size={16} />;
      default:
        return <User size={16} />;
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-white mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {getIcon()}
        </div>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-4 py-3 rounded-lg text-sm
            bg-slate-700/30 text-white placeholder-slate-500
            border transition-all focus:outline-none
            ${
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                : 'border-slate-600/50 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30'
            }
          `}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}