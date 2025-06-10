import React, { useState, useCallback } from 'react';
import { Keyboard, Trophy, Settings, User } from 'lucide-react';
import { TypingArea } from './components/TypingArea';
import { StatsDisplay } from './components/StatsDisplay';
import { DifficultySelector } from './components/DifficultySelector';
import { Leaderboard } from './components/Leaderboard';
import { useAuth } from './hooks/useAuth';
import { getRandomText } from './data/textSamples';
import { saveScore } from './services/leaderboardService';

interface GameStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
  completed: boolean;
}

function App() {
  const { user, username, loading } = useAuth();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentText, setCurrentText] = useState(() => getRandomText('easy'));
  const [gameStats, setGameStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    totalChars: 0,
    timeElapsed: 0,
    completed: false
  });
  const [isGameActive, setIsGameActive] = useState(false);
  const [leaderboardRefresh, setLeaderboardRefresh] = useState(0);

  const handleDifficultyChange = useCallback((newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setCurrentText(getRandomText(newDifficulty));
    setIsGameActive(false);
    setGameStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      totalChars: 0,
      timeElapsed: 0,
      completed: false
    });
  }, []);

  const handleGameStart = useCallback(() => {
    setIsGameActive(true);
  }, []);

  const handleGameReset = useCallback(() => {
    setIsGameActive(false);
    setCurrentText(getRandomText(difficulty));
    setGameStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      totalChars: 0,
      timeElapsed: 0,
      completed: false
    });
  }, [difficulty]);

  const handleProgress = useCallback(async (stats: GameStats) => {
    setGameStats(stats);
    
    // Save score when game is completed
    if (stats.completed && !gameStats.completed && user && stats.timeElapsed > 0) {
      try {
        await saveScore({
          userId: user.uid,
          username: username,
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          difficulty: difficulty
        });
        // Refresh leaderboard
        setLeaderboardRefresh(prev => prev + 1);
        setIsGameActive(false);
      } catch (error) {
        console.error('Failed to save score:', error);
      }
    }
  }, [gameStats.completed, user, username, difficulty]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Typing Master...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Keyboard className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Typing Master</h1>
                <p className="text-sm text-gray-600">Improve your typing speed and accuracy</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <User className="text-gray-600" size={18} />
              <span className="text-sm font-medium text-gray-700">{username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Difficulty Selector */}
        <DifficultySelector
          selectedDifficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          disabled={isGameActive}
        />

        {/* Stats Display */}
        <StatsDisplay
          wpm={gameStats.wpm}
          accuracy={gameStats.accuracy}
          timeElapsed={gameStats.timeElapsed}
          correctChars={gameStats.correctChars}
          totalChars={gameStats.totalChars}
          isActive={isGameActive}
        />

        {/* Typing Area */}
        <TypingArea
          text={currentText.text}
          onProgress={handleProgress}
          isActive={isGameActive}
          onStart={handleGameStart}
          onReset={handleGameReset}
        />

        {/* Leaderboard */}
        <Leaderboard
          difficulty={difficulty}
          refreshTrigger={leaderboardRefresh}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <Trophy className="text-yellow-500" size={20} />
              Master your typing skills and climb the leaderboard!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;