import React from 'react';
import { Timer, Target, Zap, TrendingUp } from 'lucide-react';
import { formatTime } from '../utils/typingCalculations';

interface StatsDisplayProps {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  correctChars: number;
  totalChars: number;
  isActive: boolean;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  wpm,
  accuracy,
  timeElapsed,
  correctChars,
  totalChars,
  isActive
}) => {
  const stats = [
    {
      icon: Zap,
      label: 'WPM',
      value: wpm.toString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${accuracy}%`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Timer,
      label: 'Time',
      value: formatTime(timeElapsed),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: `${correctChars}/${totalChars}`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <TrendingUp className="text-blue-600" size={24} />
        Live Statistics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${stat.bgColor} ${stat.borderColor} transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-white shadow-sm`}>
                  <Icon className={stat.color} size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isActive && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm font-medium text-center">
            🚀 Keep typing! Your stats are updating in real-time.
          </p>
        </div>
      )}
    </div>
  );
};