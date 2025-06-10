import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { getLeaderboard, Score } from '../services/leaderboardService';

interface LeaderboardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  refreshTrigger?: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ 
  difficulty, 
  refreshTrigger 
}) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const leaderboardData = await getLeaderboard(difficulty, 10);
        setScores(leaderboardData);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [difficulty, refreshTrigger]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500\" size={20} />;
      case 2:
        return <Trophy className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-600" size={20} />;
      default:
        return <Award className="text-blue-500" size={16} />;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="text-yellow-500\" size={24} />
          Leaderboard - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Trophy className="text-yellow-500" size={24} />
        Leaderboard - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </h3>

      {scores.length === 0 ? (
        <div className="text-center py-8">
          <Trophy className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-500">No scores yet. Be the first to type!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scores.map((score, index) => {
            const rank = index + 1;
            return (
              <div
                key={score.id || index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-102 ${getRankBg(rank)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getRankIcon(rank)}
                      <span className="font-bold text-lg text-gray-700">
                        #{rank}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {score.username}
                      </p>
                      <p className="text-sm text-gray-600">
                        {score.accuracy}% accuracy
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {score.wpm}
                    </p>
                    <p className="text-sm text-gray-600">WPM</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};