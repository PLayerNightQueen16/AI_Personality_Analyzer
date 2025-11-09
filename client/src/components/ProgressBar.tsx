import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full space-y-3" data-testid="progress-container">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground/70">
          Question <span className="text-red-600 font-semibold">{current}</span> of {total}
        </span>
        <span className="font-mono text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
          {Math.round(percentage)}%
        </span>
      </div>
      <Progress value={percentage} className="h-2.5" data-testid="progress-bar" />
    </div>
  );
}
