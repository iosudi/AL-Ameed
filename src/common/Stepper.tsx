import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn(
          "flex sm:items-center items-start w-full md:gap-5 gap-1",
          "flex-row"
        )}
      >
        {steps.map((label, index) => (
          <div key={index} className="flex items-start md:gap-5 gap-0 grow">
            {/* Step circle and label */}
            <div className="flex flex-col items-center md:min-w-16 ">
              {/* Circle */}
              <div
                className={cn(
                  "md:w-14 md:h-14 w-8 h-8 rounded-full flex items-center justify-center border-2 md:text-2xl ",
                  currentStep === index
                    ? "border-primary text-primary"
                    : currentStep > index
                    ? "border-[#D40000] bg-[#D40000] text-white"
                    : "border-gray-300 text-gray-400"
                )}
              >
                {index + 1}
              </div>

              {/* Label */}
              <div className="mt-2 text-center sm:text-xs text-[10px] md:text-sm">
                {label}
              </div>
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div className="flex flex-1 items-center mt-6">
                <div
                  className={cn(
                    "h-0.5 w-full",
                    currentStep > index ? "bg-[#D40000]" : "bg-gray-300"
                  )}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
