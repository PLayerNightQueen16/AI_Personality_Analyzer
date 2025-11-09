import { Badge } from "@/components/ui/badge";

interface BinaryBadgeProps {
  code: string;
  meaning: string;
  variant?: "default" | "secondary" | "outline";
}

export default function BinaryBadge({ code, meaning, variant = "default" }: BinaryBadgeProps) {
  return (
    <Badge 
      variant={variant}
      className="font-mono text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 shadow-sm hover:shadow-md transition-all whitespace-nowrap"
      data-testid={`badge-binary-${code}`}
    >
      <span className="font-bold">{code}</span>
      <span className="mx-1 sm:mx-1.5">=</span>
      <span className="truncate">{meaning}</span>
    </Badge>
  );
}
