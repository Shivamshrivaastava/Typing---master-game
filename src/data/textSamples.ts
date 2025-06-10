export interface TextSample {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export const textSamples: TextSample[] = [
  {
    id: 'easy-1',
    text: 'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.',
    difficulty: 'easy',
    category: 'Classic'
  },
  {
    id: 'easy-2',
    text: 'Programming is the art of solving problems with code. It requires patience, logic, and creativity to build amazing applications.',
    difficulty: 'easy',
    category: 'Technology'
  },
  {
    id: 'medium-1',
    text: 'The advancement of artificial intelligence has revolutionized numerous industries, from healthcare and finance to transportation and entertainment, creating unprecedented opportunities for innovation.',
    difficulty: 'medium',
    category: 'Technology'
  },
  {
    id: 'medium-2',
    text: 'Climate change represents one of the most significant challenges of our time, requiring coordinated global action to reduce greenhouse gas emissions and transition to sustainable energy sources.',
    difficulty: 'medium',
    category: 'Environment'
  },
  {
    id: 'hard-1',
    text: 'Quantum computing leverages the peculiar properties of quantum mechanics, including superposition and entanglement, to perform calculations exponentially faster than classical computers for specific algorithmic problems.',
    difficulty: 'hard',
    category: 'Science'
  },
  {
    id: 'hard-2',
    text: 'The philosophical implications of consciousness, free will, and determinism have perplexed scholars for millennia, raising fundamental questions about the nature of human experience and moral responsibility.',
    difficulty: 'hard',
    category: 'Philosophy'
  }
];

export const getTextByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): TextSample[] => {
  return textSamples.filter(sample => sample.difficulty === difficulty);
};

export const getRandomText = (difficulty: 'easy' | 'medium' | 'hard'): TextSample => {
  const samples = getTextByDifficulty(difficulty);
  return samples[Math.floor(Math.random() * samples.length)];
};