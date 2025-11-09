import { Card } from "@/components/ui/card";

interface QuizOption {
  id: string;
  text: string;
  icon?: string;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onSelect: (optionId: string) => void;
  selectedId?: string;
}

export default function QuizQuestion({ question, options, onSelect, selectedId }: QuizQuestionProps) {
  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" data-testid="quiz-question">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-center leading-tight">
        {question}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Card
            key={option.id}
            className={`group p-6 cursor-pointer transition-all duration-300 hover-elevate active-elevate-2 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-2 ${
              selectedId === option.id 
                ? 'border-red-600 border-2 bg-red-50/50 shadow-lg shadow-red-500/10' 
                : 'border-2 border-border hover:border-red-500/50'
            }`}
            onClick={() => onSelect(option.id)}
            data-testid={`option-${option.id}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              {option.icon && (
                <span 
                  className={`text-3xl transition-transform group-hover:scale-110 ${
                    selectedId === option.id ? 'scale-110' : ''
                  }`}
                  aria-hidden="true"
                >
                  {option.icon}
                </span>
              )}
              <p className={`text-base text-left flex-1 leading-relaxed transition-colors ${
                selectedId === option.id ? 'text-foreground font-medium' : 'text-foreground/80'
              }`}>
                {option.text}
              </p>
            </div>
            {selectedId === option.id && (
              <div className="mt-3 pt-3 border-t border-red-500/20 flex items-center justify-center gap-2 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                Selected
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
