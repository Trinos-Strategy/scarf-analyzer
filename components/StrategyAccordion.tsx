'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScarfDomain, Strategy } from '@/lib/data/scarf-elements';

interface StrategyAccordionProps {
  domain: ScarfDomain;
  score: number;
  isHighPriority: boolean;
}

export default function StrategyAccordion({ domain, score, isHighPriority }: StrategyAccordionProps) {
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(
    isHighPriority ? domain.strategies[0]?.id : null
  );

  const getThreatLevel = (score: number): { label: string; color: string } => {
    if (score <= 1.5) return { label: '낮음', color: 'text-green-600' };
    if (score <= 2.5) return { label: '경미', color: 'text-blue-600' };
    if (score <= 3.5) return { label: '보통', color: 'text-yellow-600' };
    if (score <= 4.5) return { label: '높음', color: 'text-orange-600' };
    return { label: '매우 높음', color: 'text-red-600' };
  };

  const threatLevel = getThreatLevel(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl overflow-hidden ${
        isHighPriority
          ? 'ring-2 ring-purple-400 shadow-lg shadow-purple-100'
          : 'border border-gray-200'
      }`}
    >
      {/* Domain Header */}
      <div
        className="p-5"
        style={{
          background: `linear-gradient(135deg, ${domain.color}15 0%, ${domain.color}05 100%)`
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${domain.color}20` }}
            >
              {domain.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {domain.name}
                </h3>
                <span className="text-sm text-gray-500">({domain.englishName})</span>
                {isHighPriority && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    우선 대응
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{domain.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-2xl font-bold"
              style={{ color: domain.color }}
            >
              {score.toFixed(1)}
            </div>
            <div className={`text-sm font-medium ${threatLevel.color}`}>
              {threatLevel.label}
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div className="mt-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / 5) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: domain.color }}
            />
          </div>
        </div>
      </div>

      {/* Strategies */}
      <div className="bg-white p-4 space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          대응 전략
        </h4>
        {domain.strategies.map((strategy) => (
          <div
            key={strategy.id}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedStrategy(
                expandedStrategy === strategy.id ? null : strategy.id
              )}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{strategy.title}</span>
              <motion.span
                animate={{ rotate: expandedStrategy === strategy.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence>
              {expandedStrategy === strategy.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-3">
                      {strategy.description}
                    </p>
                    <ul className="space-y-2">
                      {strategy.actions.map((action, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium text-white"
                            style={{ backgroundColor: domain.color }}
                          >
                            {idx + 1}
                          </span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
