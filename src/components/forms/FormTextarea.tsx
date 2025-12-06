import { useState } from 'react';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextarea({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows = 4,
}: FormTextareaProps) {
  const [touched, setTouched] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-lg border-2 px-3 py-2 text-gray-900 placeholder-gray-400 outline-none transition resize-none ${
          touched && error
            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        }`}
      />
      {touched && error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}