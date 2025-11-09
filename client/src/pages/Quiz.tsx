import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import QuizQuestion from "@/components/QuizQuestion";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const questionPool = [
  {
    id: 1,
    question: "When facing a difficult decision, you primarily rely on...",
    options: [
      { id: 'q1a', text: 'Gut instinct and how it feels', icon: '💫' },
      { id: 'q1b', text: 'Careful analysis of pros and cons', icon: '🎯' },
      { id: 'q1c', text: 'Advice and perspectives from others', icon: '🤝' },
      { id: 'q1d', text: 'What aligns with your core values', icon: '⚖️' },
    ]
  },
  {
    id: 2,
    question: "In moments of conflict, your first instinct is to...",
    options: [
      { id: 'q2a', text: 'Address it directly and find resolution', icon: '🗣️' },
      { id: 'q2b', text: 'Step back and process before responding', icon: '🧘' },
      { id: 'q2c', text: 'Seek to understand all perspectives', icon: '🤔' },
      { id: 'q2d', text: 'Protect yourself and set boundaries', icon: '🛡️' },
    ]
  },
  {
    id: 3,
    question: "What drives you most in life?",
    options: [
      { id: 'q3a', text: 'Personal growth and self-discovery', icon: '🌱' },
      { id: 'q3b', text: 'Making a meaningful impact on others', icon: '💡' },
      { id: 'q3c', text: 'Freedom and new experiences', icon: '🦋' },
      { id: 'q3d', text: 'Achieving mastery and excellence', icon: '🏆' },
    ]
  },
  {
    id: 4,
    question: "When someone shares their struggles with you, you...",
    options: [
      { id: 'q4a', text: 'Listen deeply and offer emotional support', icon: '❤️' },
      { id: 'q4b', text: 'Help them brainstorm solutions', icon: '💭' },
      { id: 'q4c', text: 'Share your own similar experiences', icon: '🤲' },
      { id: 'q4d', text: 'Give them space while being present', icon: '🌙' },
    ]
  },
  {
    id: 5,
    question: "Your relationship with change is best described as...",
    options: [
      { id: 'q5a', text: 'Energized by new possibilities', icon: '⚡' },
      { id: 'q5b', text: 'Cautious but adaptable when necessary', icon: '🦎' },
      { id: 'q5c', text: 'Resistant and prefer stability', icon: '🏛️' },
      { id: 'q5d', text: 'Actively creating it rather than reacting', icon: '🎨' },
    ]
  },
  {
    id: 6,
    question: "When you accomplish something significant, you...",
    options: [
      { id: 'q6a', text: 'Celebrate briefly then move to the next goal', icon: '🎯' },
      { id: 'q6b', text: 'Reflect on the journey and lessons learned', icon: '📖' },
      { id: 'q6c', text: 'Share the success with those who helped', icon: '🎉' },
      { id: 'q6d', text: 'Feel proud but downplay it to others', icon: '😌' },
    ]
  },
  {
    id: 7,
    question: "What would you consider your greatest strength?",
    options: [
      { id: 'q7a', text: 'Resilience in the face of adversity', icon: '💪' },
      { id: 'q7b', text: 'Ability to see possibilities others miss', icon: '🔮' },
      { id: 'q7c', text: 'Genuine care for people and relationships', icon: '💝' },
      { id: 'q7d', text: 'Clear thinking under pressure', icon: '🧠' },
    ]
  },
  {
    id: 8,
    question: "When learning something new, you prefer to...",
    options: [
      { id: 'q8a', text: 'Jump in and learn through experience', icon: '🚀' },
      { id: 'q8b', text: 'Understand the theory first', icon: '📚' },
      { id: 'q8c', text: 'Learn alongside others collaboratively', icon: '👥' },
      { id: 'q8d', text: 'Study real-world examples and applications', icon: '🔬' },
    ]
  },
  {
    id: 9,
    question: "In your ideal work environment, you would have...",
    options: [
      { id: 'q9a', text: 'Autonomy and creative freedom', icon: '🎨' },
      { id: 'q9b', text: 'Clear structure and expectations', icon: '📋' },
      { id: 'q9c', text: 'Strong team collaboration', icon: '🤝' },
      { id: 'q9d', text: 'Intellectually challenging problems', icon: '🧩' },
    ]
  },
  {
    id: 10,
    question: "When feeling overwhelmed, you typically...",
    options: [
      { id: 'q10a', text: 'Take time alone to recharge', icon: '🌿' },
      { id: 'q10b', text: 'Talk it through with someone you trust', icon: '💬' },
      { id: 'q10c', text: 'Organize and prioritize to regain control', icon: '✅' },
      { id: 'q10d', text: 'Distract yourself with activities', icon: '🎮' },
    ]
  },
  {
    id: 11,
    question: "Your approach to risk-taking is...",
    options: [
      { id: 'q11a', text: 'Calculated - weigh potential vs. consequences', icon: '⚖️' },
      { id: 'q11b', text: 'Bold - fortune favors the brave', icon: '🦁' },
      { id: 'q11c', text: 'Cautious - prefer safety and certainty', icon: '🛡️' },
      { id: 'q11d', text: 'Selective - risk in some areas, not others', icon: '🎲' },
    ]
  },
  {
    id: 12,
    question: "What matters most to you in relationships?",
    options: [
      { id: 'q12a', text: 'Deep emotional connection and intimacy', icon: '❤️' },
      { id: 'q12b', text: 'Trust and reliability', icon: '🤝' },
      { id: 'q12c', text: 'Mutual growth and inspiration', icon: '🌟' },
      { id: 'q12d', text: 'Authenticity and being truly yourself', icon: '✨' },
    ]
  },
  {
    id: 13,
    question: "When you make a mistake, you tend to...",
    options: [
      { id: 'q13a', text: 'Take responsibility and make it right', icon: '🛠️' },
      { id: 'q13b', text: 'Analyze what went wrong to prevent repeating it', icon: '🔍' },
      { id: 'q13c', text: 'Be hard on yourself initially', icon: '😔' },
      { id: 'q13d', text: 'Learn from it and move forward quickly', icon: '➡️' },
    ]
  },
  {
    id: 14,
    question: "Your energy is most renewed by...",
    options: [
      { id: 'q14a', text: 'Meaningful conversations and connections', icon: '💭' },
      { id: 'q14b', text: 'Solitude and quiet reflection', icon: '🌙' },
      { id: 'q14c', text: 'Physical activity and movement', icon: '🏃' },
      { id: 'q14d', text: 'Creative expression and making things', icon: '🎨' },
    ]
  },
  {
    id: 15,
    question: "When pursuing a goal, what's most challenging for you?",
    options: [
      { id: 'q15a', text: 'Maintaining motivation over time', icon: '🔥' },
      { id: 'q15b', text: 'Overcoming self-doubt and fear', icon: '😰' },
      { id: 'q15c', text: 'Managing competing priorities', icon: '⚖️' },
      { id: 'q15d', text: 'Knowing when to adjust the approach', icon: '🧭' },
    ]
  },
  {
    id: 16,
    question: "In a team setting, you naturally tend to...",
    options: [
      { id: 'q16a', text: 'Generate ideas and envision possibilities', icon: '💡' },
      { id: 'q16b', text: 'Ensure everyone is heard and valued', icon: '🤲' },
      { id: 'q16c', text: 'Execute and get things done', icon: '✅' },
      { id: 'q16d', text: 'Analyze and improve the process', icon: '🔧' },
    ]
  },
  {
    id: 17,
    question: "What brings you the deepest sense of fulfillment?",
    options: [
      { id: 'q17a', text: 'Creating something meaningful', icon: '🎨' },
      { id: 'q17b', text: 'Helping others thrive', icon: '🌟' },
      { id: 'q17c', text: 'Mastering challenging skills', icon: '🏆' },
      { id: 'q17d', text: 'Living authentically and freely', icon: '🦋' },
    ]
  },
  {
    id: 18,
    question: "When someone disagrees with your perspective...",
    options: [
      { id: 'q18a', text: 'Stay curious and explore their viewpoint', icon: '🤔' },
      { id: 'q18b', text: 'Present evidence to support your position', icon: '📊' },
      { id: 'q18c', text: 'Find common ground and compromise', icon: '🤝' },
      { id: 'q18d', text: 'Stand firm if it aligns with your values', icon: '🗿' },
    ]
  },
  {
    id: 19,
    question: "Your relationship with time is best described as...",
    options: [
      { id: 'q19a', text: 'Present-focused - live in the moment', icon: '🌅' },
      { id: 'q19b', text: 'Future-oriented - planning and preparing', icon: '🔮' },
      { id: 'q19c', text: 'Reflective - learning from the past', icon: '📖' },
      { id: 'q19d', text: 'Flexible - adapting as needed', icon: '🌊' },
    ]
  },
  {
    id: 20,
    question: "What do you value most in yourself?",
    options: [
      { id: 'q20a', text: 'Your integrity and principles', icon: '💎' },
      { id: 'q20b', text: 'Your compassion and empathy', icon: '❤️' },
      { id: 'q20c', text: 'Your creativity and originality', icon: '🎨' },
      { id: 'q20d', text: 'Your courage and resilience', icon: '🦁' },
    ]
  },
  {
    id: 21,
    question: "In social situations, you typically...",
    options: [
      { id: 'q21a', text: 'Connect deeply with a few people', icon: '💬' },
      { id: 'q21b', text: 'Engage with many people energetically', icon: '⚡' },
      { id: 'q21c', text: 'Observe and contribute selectively', icon: '👁️' },
      { id: 'q21d', text: 'Facilitate and bring people together', icon: '🌉' },
    ]
  },
  {
    id: 22,
    question: "When facing uncertainty, you...",
    options: [
      { id: 'q22a', text: 'Trust that things will work out', icon: '🌟' },
      { id: 'q22b', text: 'Prepare for multiple scenarios', icon: '🎯' },
      { id: 'q22c', text: 'Seek more information before deciding', icon: '🔍' },
      { id: 'q22d', text: 'Feel anxious but push through anyway', icon: '💪' },
    ]
  },
  {
    id: 23,
    question: "What type of feedback resonates most with you?",
    options: [
      { id: 'q23a', text: 'Specific recognition of your efforts', icon: '🏆' },
      { id: 'q23b', text: 'Insights on how to improve', icon: '📈' },
      { id: 'q23c', text: 'Acknowledgment of your unique qualities', icon: '✨' },
      { id: 'q23d', text: 'Understanding your impact on others', icon: '💝' },
    ]
  },
  {
    id: 24,
    question: "Your greatest fear in life is...",
    options: [
      { id: 'q24a', text: 'Not living up to your potential', icon: '⏳' },
      { id: 'q24b', text: 'Being alone or disconnected', icon: '🌑' },
      { id: 'q24c', text: 'Losing your independence', icon: '🔒' },
      { id: 'q24d', text: 'Life lacking meaning or purpose', icon: '🎭' },
    ]
  },
  {
    id: 25,
    question: "When inspired by an idea, you...",
    options: [
      { id: 'q25a', text: 'Immediately start acting on it', icon: '🚀' },
      { id: 'q25b', text: 'Develop a detailed plan first', icon: '📋' },
      { id: 'q25c', text: 'Discuss it with others to refine it', icon: '💬' },
      { id: 'q25d', text: 'Let it simmer and evolve naturally', icon: '🌱' },
    ]
  },
  {
    id: 26,
    question: "What draws you to people most?",
    options: [
      { id: 'q26a', text: 'Their depth and emotional intelligence', icon: '💭' },
      { id: 'q26b', text: 'Their passion and enthusiasm', icon: '🔥' },
      { id: 'q26c', text: 'Their authenticity and genuineness', icon: '💎' },
      { id: 'q26d', text: 'Their intellect and insights', icon: '🧠' },
    ]
  },
  {
    id: 27,
    question: "Your approach to personal growth is...",
    options: [
      { id: 'q27a', text: 'Actively seeking new challenges', icon: '⛰️' },
      { id: 'q27b', text: 'Reflective self-examination', icon: '🪞' },
      { id: 'q27c', text: 'Learning from relationships', icon: '🤝' },
      { id: 'q27d', text: 'Following your curiosity', icon: '🧭' },
    ]
  },
  {
    id: 28,
    question: "When you need to recharge, you prefer...",
    options: [
      { id: 'q28a', text: 'Nature and outdoor experiences', icon: '🌲' },
      { id: 'q28b', text: 'Creative or intellectual pursuits', icon: '🎨' },
      { id: 'q28c', text: 'Physical movement and exercise', icon: '🏃' },
      { id: 'q28d', text: 'Complete rest and doing nothing', icon: '😌' },
    ]
  },
  {
    id: 29,
    question: "In leadership, you believe in...",
    options: [
      { id: 'q29a', text: 'Empowering others to lead themselves', icon: '🌟' },
      { id: 'q29b', text: 'Leading by example and action', icon: '🚶' },
      { id: 'q29c', text: 'Creating clear vision and direction', icon: '🎯' },
      { id: 'q29d', text: 'Building consensus and collaboration', icon: '🤝' },
    ]
  },
  {
    id: 30,
    question: "What legacy do you hope to leave?",
    options: [
      { id: 'q30a', text: 'Having made a positive difference', icon: '💫' },
      { id: 'q30b', text: 'Creating something that endures', icon: '🏛️' },
      { id: 'q30c', text: 'Inspiring others to be their best', icon: '🌟' },
      { id: 'q30d', text: 'Living fully and authentically', icon: '🦋' },
    ]
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const questions = useMemo(() => {
    const shuffledPool = shuffleArray(questionPool);
    const selectedQuestions = shuffledPool.slice(0, 20);
    
    return selectedQuestions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, []);
  
  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const answersString = Object.values(answers).join(',');
      setLocation(`/results?answers=${answersString}`);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const canProceed = answers[currentQuestion] !== undefined;
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            data-testid="button-exit-quiz"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit
          </Button>
        </div>
        
        <div className="space-y-8">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          
          <QuizQuestion
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onSelect={handleSelect}
            selectedId={answers[currentQuestion]}
          />
          
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              data-testid="button-previous"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              data-testid="button-next"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
