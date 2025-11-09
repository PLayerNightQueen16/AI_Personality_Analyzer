import { Button } from "@/components/ui/button";
import { Sparkles, Code2, Share2, Zap } from "lucide-react";

interface HeroProps {
  onStartQuiz: () => void;
}

export default function Hero({ onStartQuiz }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-white to-red-600/5" />
        
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border-2 border-red-500/30 rounded-full backdrop-blur-sm hover:border-red-500/50 transition-colors">
            <Zap className="w-4 h-4 text-red-600 animate-pulse" />
            <p className="text-sm font-mono font-medium text-red-600 tracking-wider">AI-POWERED PERSONALITY ANALYZER</p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tight">
            Decode Your
            <br />
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Binary Vibe
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Discover your unique personality breakdown through AI analysis. 
            Get your shareable vibe card with binary-coded traits and find out if you're a chaotic genius or a menace to society.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 rounded-full shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all hover:scale-105"
              onClick={onStartQuiz}
              data-testid="button-start-quiz"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Quiz Now
            </Button>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                2 min
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                AI-powered
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                100% you
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t bg-gradient-to-b from-white to-red-50/30">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="group text-center space-y-4 p-6 rounded-2xl hover-elevate transition-all">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-500/10">
                <Code2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-display font-semibold text-xl">Answer Questions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                20 dynamic questions about your vibe, preferences, and how you navigate life
              </p>
            </div>
            
            <div className="group text-center space-y-4 p-6 rounded-2xl hover-elevate transition-all">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-500/10">
                <Sparkles className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-display font-semibold text-xl">AI Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI decodes your personality and assigns binary tags to your unique traits
              </p>
            </div>
            
            <div className="group text-center space-y-4 p-6 rounded-2xl hover-elevate transition-all">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-500/10">
                <Share2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-display font-semibold text-xl">Share Your Vibe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get a beautiful vibe card perfect for sharing on social media
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
