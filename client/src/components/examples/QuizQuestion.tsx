import QuizQuestion from '../QuizQuestion';
import { useState } from 'react';

export default function QuizQuestionExample() {
  const [selected, setSelected] = useState<string>();
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <QuizQuestion
        question="How do you handle unexpected challenges?"
        options={[
          { id: '1', text: 'Dive in headfirst and figure it out', icon: '🚀' },
          { id: '2', text: 'Analyze all possible outcomes first', icon: '🧠' },
          { id: '3', text: 'Ask for help and collaborate', icon: '🤝' },
          { id: '4', text: 'Procrastinate until the last minute', icon: '⏰' },
        ]}
        onSelect={(id) => {
          setSelected(id);
          console.log('Selected option:', id);
        }}
        selectedId={selected}
      />
    </div>
  );
}
