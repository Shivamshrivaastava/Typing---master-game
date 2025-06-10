import React from 'react';
import { BookOpen, Zap, Flame } from 'lucide-react';

interface DifficultySelectorProps {
  selectedDifficulty: 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
  disabled?: boolean;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onDifficultyChange,
  disabled = false
}) => {
  const difficulties = [
    {
      level: 'easy' as const,
      icon: BookOpen,
      label: 'Easy',
      description: 'Simple words and sentences',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      selectedBg: 'bg-green-100',
      selectedBorder: 'border-green-500'
    },
    {
      level: 'medium' as const,
      icon: Zap,
      label: 'Medium',
      description: 'Complex sentences and vocabulary',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      selectedBg: 'bg-yellow-100',
      selectedBorder: 'border-yellow-500'
    },
    {
      level: 'hard' as const,
      icon: Flame,
      label: 'Hard',
      description: 'Technical terms and complex structures',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      selectedBg: 'bg-red-100',
      selectedBorder: 'border-red-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Difficulty</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulties.map((diff) => {
          const Icon = diff.icon;
          const isSelected = selectedDifficulty === diff.level;
          
          return (
            <button
              key={diff.level}
              onClick={() => onDifficultyChange(diff.level)}
              disabled={disabled}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                isSelected
                  ? `${diff.selectedBg} ${diff.selectedBorder} ring-2 ring-offset-2 ring-${diff.level === 'easy' ? 'green' : diff.level === 'medium' ? 'yellow' : 'red'}-300`
                  : `${diff.bgColor} ${diff.borderColor} hover:${diff.selectedBg}`
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full bg-white shadow-sm mb-3`}>
                  <Icon className={diff.color} size={24} />
                </div>
                <h4 className={`font-bold text-lg ${diff.color} mb-1`}>
                  {diff.label}
                </h4>
                <p className="text-sm text-gray-600">
                  {diff.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};