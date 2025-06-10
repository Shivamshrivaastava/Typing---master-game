export const calculateWPM = (correctChars: number, timeElapsed: number): number => {
  if (timeElapsed === 0) return 0;
  const minutes = timeElapsed / 60;
  const words = correctChars / 5; // Standard: 5 characters = 1 word
  return Math.round(words / minutes);
};

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const generateUsername = (): string => {
  const adjectives = ['Swift', 'Lightning', 'Rapid', 'Quick', 'Fast', 'Speedy', 'Turbo', 'Blazing'];
  const nouns = ['Typer', 'Fingers', 'Keys', 'Words', 'Writer', 'Coder', 'Master', 'Pro'];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  
  return `${adj}${noun}${num}`;
};