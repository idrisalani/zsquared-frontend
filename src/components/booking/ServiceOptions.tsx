/**
 * Service Options Component
 * - Display service-specific customization options
 * - Radio buttons or checkboxes
 * - Price display
 * - Professional layout
 */

import React from 'react';
import { ServiceOption, Service } from '../../types';

interface ServiceOptionsProps {
  service: Service;
  options: ServiceOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionId: string, valueId: string) => void;
}

export function ServiceOptions({
  service,
  options,
  selectedOptions,
  onOptionChange
}: ServiceOptionsProps) {
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-white text-md">Customization Options</h4>

      {options.map((option) => (
        <div key={option.id} className="space-y-3">
          <div>
            <h5 className="font-medium text-white mb-2">{option.name}</h5>
            {option.description && (
              <p className="text-slate-400 text-sm mb-3">{option.description}</p>
            )}
          </div>

          <div className="space-y-2">
            {option.values.map((value) => (
              <label
                key={value.id}
                className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg cursor-pointer transition"
              >
                <input
                  type={option.allowMultiple ? 'checkbox' : 'radio'}
                  name={option.id}
                  value={value.id}
                  checked={
                    option.allowMultiple
                      ? selectedOptions[option.id]?.includes(value.id) || false
                      : selectedOptions[option.id] === value.id
                  }
                  onChange={() => onOptionChange(option.id, value.id)}
                  className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
                />

                <div className="flex-1">
                  <p className="font-medium text-white text-sm">{value.value}</p>
                  {value.description && (
                    <p className="text-slate-400 text-xs mt-1">{value.description}</p>
                  )}
                </div>

                {value.additionalPrice > 0 && (
                  <span className="font-semibold text-cyan-400 whitespace-nowrap">
                    +${value.additionalPrice.toFixed(2)}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}