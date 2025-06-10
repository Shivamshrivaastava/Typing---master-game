import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TypingAreaProps {
  text: string;
  onProgress: (stats: {
    wpm: number;
    accuracy: number;
    correctChars: number;
    totalChars: number;
    timeElapsed: number;
    completed: boolean;
  }) => void;
  isActive: boolean;
  onStart: () => void;
  onReset: () => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  text,
  onProgress,
  isActive,
  onStart,
  onReset
}) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && startTime) {
      interval = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        const correctChars = currentIndex - errors.size;
        const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / (timeElapsed / 60)) : 0;
        const accuracy = currentIndex > 0 ? Math.round((correctChars / currentIndex) * 100) : 100;
        const completed = currentIndex >= text.length;

        onProgress({
          wpm,
          accuracy,
          correctChars,
          totalChars: currentIndex,
          timeElapsed,
          completed
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, startTime, currentIndex, errors.size, text.length, onProgress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isActive) {
      onStart();
      setStartTime(Date.now());
    }

    if (value.length <= text.length) {
      setTypedText(value);
      setCurrentIndex(value.length);

      // Track errors
      const newErrors = new Set<number>();
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== text[i]) {
          newErrors.add(i);
        }
      }
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    setTypedText('');
    setCurrentIndex(0);
    setStartTime(null);
    setErrors(new Set());
    onReset();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'transition-colors duration-200 ';
      
      if (index < typedText.length) {
        className += errors.has(index) 
          ? 'bg-red-200 text-red-800' 
          : 'bg-green-200 text-green-800';
      } else if (index === currentIndex) {
        className += 'bg-blue-200 text-blue-800 animate-pulse';
      } else {
        className += 'text-gray-600';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Start Typing</h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 leading-relaxed text-lg font-mono">
        {renderText()}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleInputChange}
        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
        placeholder="Click here and start typing..."
        disabled={currentIndex >= text.length}
      />

      {currentIndex >= text.length && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold text-center">
            🎉 Congratulations! You've completed the text!
          </p>
        </div>
      )}
    </div>
  );
};