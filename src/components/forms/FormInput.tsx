import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: 'mail' | 'phone';
}

export function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  icon,
}: FormInputProps) {
  const [touched, setTouched] = useState(false);

  const renderIcon = () => {
    switch (icon) {
      case 'mail':
        return <Mail size={18} className="text-gray-400" />;
      case 'phone':
        return <Phone size={18} className="text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{renderIcon()}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className={`w-full rounded-lg border-2 px-3 py-2 ${icon ? 'pl-10' : 'pl-3'} text-gray-900 placeholder-gray-400 outline-none transition ${
            touched && error
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          }`}
        />
      </div>
      {touched && error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}