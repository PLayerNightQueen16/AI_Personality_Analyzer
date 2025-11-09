import Hero from "@/components/Hero";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen">
      <Hero onStartQuiz={() => setLocation('/quiz')} />
    </div>
  );
}
