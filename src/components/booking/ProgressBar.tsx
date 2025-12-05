/**
 * Progress Bar Component
 * - Animated step indicator
 * - Shows current step
 * - Professional styling
 */

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const stepLabels = ['Date', 'Service', 'Details', 'Contact'];

  return (
    <div className="space-y-4">
      {/* Progress line */}
      <div className="flex gap-2">
        {steps.map((step) => (
          <div
            key={step}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              step <= currentStep
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                : 'bg-slate-700/50'
            }`}
          />
        ))}
      </div>

      {/* Step labels */}
      <div className="flex justify-between items-center text-xs">
        {steps.map((step) => (
          <div
            key={step}
            className={`transition ${
              step === currentStep
                ? 'text-cyan-400 font-semibold'
                : step < currentStep
                ? 'text-cyan-400/70'
                : 'text-slate-500'
            }`}
          >
            <div className="font-semibold">Step {step}</div>
            <div className="text-slate-400">{stepLabels[step - 1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}