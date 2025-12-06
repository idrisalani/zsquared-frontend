import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { ServiceOption, ServiceOptionValue } from '../../types/index';

interface ServiceOptionsProps {
  options: ServiceOption[];
  selectedOptions: Record<string, string | number>;
  onSelectOption: (optionName: string, value: string | number) => void;
}

export function ServiceOptions({
  options,
  selectedOptions,
  onSelectOption,
}: ServiceOptionsProps) {
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(new Set());

  const toggleExpanded = (optionName: string) => {
    const newExpanded = new Set(expandedOptions);
    if (newExpanded.has(optionName)) {
      newExpanded.delete(optionName);
    } else {
      newExpanded.add(optionName);
    }
    setExpandedOptions(newExpanded);
  };

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const isExpanded = expandedOptions.has(option.name);
        const values = option.values || [];
        const selectedValue = selectedOptions[option.name];

        return (
          <div key={option.name} className="rounded-xl border-2 border-gray-200 bg-white">
            <button
              onClick={() => toggleExpanded(option.name)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="text-left">
                <p className="font-semibold text-gray-900">{option.name}</p>
                {selectedValue && (
                  <p className="text-sm text-gray-600">
                    Selected: {String(selectedValue)}
                  </p>
                )}
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            {isExpanded && (
              <div className="border-t-2 border-gray-200 p-4 space-y-2">
                {values.map((value: ServiceOptionValue) => {
                  const additionalPrice = value.additionalPrice || 0;
                  const label = String(value.label);
                  
                  return (
                    <button
                      key={label}
                      onClick={() => onSelectOption(option.name, value.label)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedValue === value.label
                          ? 'bg-blue-100 border-2 border-blue-500 text-blue-900 font-semibold'
                          : 'bg-gray-50 border-2 border-gray-200 text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{label}</span>
                        {additionalPrice > 0 && (
                          <span className="text-sm text-gray-600">
                            +${additionalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}