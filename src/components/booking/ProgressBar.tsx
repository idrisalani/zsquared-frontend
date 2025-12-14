interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-amber-950">
          Step {currentStep} of {totalSteps}
        </h3>
        <span className="text-sm text-amber-800">{Math.round(progressPercentage)}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-amber-700 to-yellow-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mt-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
              index + 1 <= currentStep
                ? 'bg-linear-to-r from-amber-700 to-yellow-600 text-white'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
