'use client';

import { motion } from 'framer-motion';
import { scarfDomains } from '@/lib/data/scarf-elements';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: Set<number>;
}

export default function ProgressBar({
  currentQuestion,
  totalQuestions,
  answeredQuestions
}: ProgressBarProps) {
  const progress = (answeredQuestions.size / totalQuestions) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"
          />
        </div>

        {/* Progress Markers */}
        <div className="absolute top-0 left-0 w-full h-3 flex justify-between px-0.5">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-0.5 h-full transition-colors duration-300 ${
                i < answeredQuestions.size
                  ? 'bg-transparent'
                  : i === 0 ? 'bg-transparent' : 'bg-gray-300/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            진행률: <span className="font-bold text-purple-600">{Math.round(progress)}%</span>
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">
            답변: <span className="font-bold text-blue-600">{answeredQuestions.size}</span> / {totalQuestions}
          </span>
        </div>

        {/* Domain Indicators */}
        <div className="hidden md:flex items-center gap-2">
          {scarfDomains.map((domain) => (
            <div
              key={domain.id}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: `${domain.color}20` }}
              title={domain.name}
            >
              {domain.shortName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
