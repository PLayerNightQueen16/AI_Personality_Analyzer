import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import VibeCard from "@/components/VibeCard";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { VibeAnalysis } from "@shared/schema";

export default function Results() {
  const [, setLocation] = useLocation();
  const [answers, setAnswers] = useState<string[]>([]);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const answersParam = params.get('answers');
    if (answersParam) {
      setAnswers(answersParam.split(','));
    } else {
      setLocation('/');
    }
  }, [setLocation]);
  
  const mutation = useMutation({
    mutationFn: async (answers: string[]) => {
      const res = await apiRequest('POST', '/api/analyze', { answers });
      return await res.json() as { id: string; analysis: VibeAnalysis };
    },
    retry: 1,
  });
  
  useEffect(() => {
    if (answers.length > 0 && !mutation.data && !mutation.isPending) {
      mutation.mutate(answers);
    }
  }, [answers]);
  
  const { data, isPending: isLoading, error } = mutation;
  
  if (isLoading || answers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-2">
            <p className="text-base sm:text-lg font-display font-medium">
              Analyzing Your Vibe...
            </p>
            <p className="text-xs sm:text-sm font-mono text-muted-foreground">
              DECODING BINARY PATTERNS
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-4xl">😕</div>
          <h2 className="text-xl sm:text-2xl font-display font-bold">Analysis Failed</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            We encountered an error analyzing your vibe. Please try again.
          </p>
          <Button onClick={() => setLocation('/quiz')} data-testid="button-retry">
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }
  
  if (!data) {
    return null;
  }
  
  const { analysis } = data;
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            data-testid="button-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <p className="text-xs sm:text-sm font-mono text-primary">ANALYSIS COMPLETE</p>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Your Binary Vibe
            </h1>
          </div>
          
          <VibeCard
            results={analysis.results}
            binaryTags={analysis.binaryTags}
            description={analysis.description}
            onRetake={() => setLocation('/quiz')}
            resultId={data.id}
          />
          
          <div className="text-center pt-6 sm:pt-8">
            <Button 
              size="lg"
              onClick={() => setLocation('/')}
              className="text-sm sm:text-base"
              data-testid="button-new-analysis"
            >
              Analyze Another Vibe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
