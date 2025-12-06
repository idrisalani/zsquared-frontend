interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-semibold text-gray-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-semibold text-gray-600">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-linear-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}