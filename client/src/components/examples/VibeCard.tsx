import VibeCard from '../VibeCard';

export default function VibeCardExample() {
  return (
    <div className="p-6">
      <VibeCard
        results={[
          { percentage: 70, label: 'Chaotic Genius', emoji: '⚡' },
          { percentage: 20, label: 'Soft-Core Philosopher', emoji: '🧘' },
          { percentage: 10, label: 'Menace to Society', emoji: '😎' },
        ]}
        binaryTags={[
          { code: '101', meaning: 'confident' },
          { code: '011', meaning: 'mysterious' },
          { code: '110', meaning: 'creative' },
          { code: '100', meaning: 'analytical' },
        ]}
        description="You're a beautiful contradiction - equal parts strategic thinker and spontaneous risk-taker. You thrive in chaos but can philosophize your way out of any situation. People either love your energy or fear it (usually both). Your binary code suggests high confidence with a mysterious edge that keeps everyone guessing."
        onRetake={() => console.log('Retake quiz')}
      />
    </div>
  );
}
