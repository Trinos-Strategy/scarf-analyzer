'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Question, Answer } from '@/lib/data/scarf-questions';
import { getDomainById } from '@/lib/data/scarf-elements';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string, score: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  const domain = getDomainById(question.domain);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          {/* Question Header */}
          <div
            className="px-6 py-4"
            style={{
              background: `linear-gradient(135deg, ${domain?.color}20 0%, ${domain?.color}10 100%)`
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-medium px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${domain?.color}20`,
                  color: domain?.color
                }}
              >
                {domain?.icon} {question.context}
              </span>
              <span className="text-sm text-gray-500">
                {questionNumber} / {totalQuestions}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
              {question.text}
            </h2>
          </div>

          {/* Answers */}
          <div className="p-6 space-y-3">
            {question.answers.map((answer, index) => (
              <motion.button
                key={answer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => onSelectAnswer(answer.id, answer.score)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedAnswer === answer.id
                    ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-100'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                      selectedAnswer === answer.id
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <span className="text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <span
                    className={`text-base leading-relaxed ${
                      selectedAnswer === answer.id
                        ? 'text-purple-900 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {answer.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Threat Level Indicator */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>위협 수준:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-8 h-2 rounded-full transition-all duration-300 ${
                      selectedAnswer
                        ? question.answers.find(a => a.id === selectedAnswer)?.score || 0 >= level
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-gray-200'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 font-medium text-purple-600">
                {selectedAnswer
                  ? `${question.answers.find(a => a.id === selectedAnswer)?.score || 0}/5`
                  : '-'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
