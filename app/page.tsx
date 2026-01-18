'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scarfQuestions } from '@/lib/data/scarf-questions';
import { scarfDomains } from '@/lib/data/scarf-elements';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import RadarChart from '@/components/RadarChart';
import StrategyAccordion from '@/components/StrategyAccordion';

type AppState = 'intro' | 'quiz' | 'results';

interface AnswerRecord {
  questionId: number;
  answerId: string;
  score: number;
  domain: string;
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = scarfQuestions[currentQuestionIndex];
  const totalQuestions = scarfQuestions.length;
  const answeredQuestions = new Set(answers.map(a => a.questionId));

  // Calculate domain scores
  const domainScores = useMemo(() => {
    const scores: Record<string, number[]> = {
      status: [],
      certainty: [],
      autonomy: [],
      relatedness: [],
      fairness: []
    };

    answers.forEach(answer => {
      if (scores[answer.domain]) {
        scores[answer.domain].push(answer.score);
      }
    });

    const averageScores: Record<string, number> = {};
    Object.keys(scores).forEach(domain => {
      const domainAnswers = scores[domain];
      averageScores[domain] = domainAnswers.length > 0
        ? domainAnswers.reduce((sum, s) => sum + s, 0) / domainAnswers.length
        : 0;
    });

    return averageScores;
  }, [answers]);

  // Sort domains by score for priority display
  const sortedDomains = useMemo(() => {
    return [...scarfDomains].sort((a, b) =>
      (domainScores[b.id] || 0) - (domainScores[a.id] || 0)
    );
  }, [domainScores]);

  const handleStart = () => {
    setAppState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const handleSelectAnswer = (answerId: string, score: number) => {
    setSelectedAnswer(answerId);

    // Update or add answer
    const existingIndex = answers.findIndex(
      a => a.questionId === currentQuestion.id
    );

    const newAnswer: AnswerRecord = {
      questionId: currentQuestion.id,
      answerId,
      score,
      domain: currentQuestion.domain
    };

    if (existingIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextAnswer = answers.find(
        a => a.questionId === scarfQuestions[currentQuestionIndex + 1].id
      );
      setSelectedAnswer(nextAnswer?.answerId || null);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevAnswer = answers.find(
        a => a.questionId === scarfQuestions[currentQuestionIndex - 1].id
      );
      setSelectedAnswer(prevAnswer?.answerId || null);
    }
  };

  const handleFinish = () => {
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('intro');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const canProceed = selectedAnswer !== null;
  const allAnswered = answers.length === totalQuestions;

  return (
    <main className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Intro Screen */}
          {appState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                  SCARF 위협 분석기
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  조정인이 갈등 상황에서 SCARF 영역의 위협을 신속하게 식별하고 대응 전략을 선택하도록 돕는 도구입니다.
                </p>
              </motion.div>

              {/* SCARF Domains */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
              >
                {scarfDomains.map((domain, index) => (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-100"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                      style={{ backgroundColor: `${domain.color}20` }}
                    >
                      {domain.icon}
                    </div>
                    <h3
                      className="font-bold mb-1"
                      style={{ color: domain.color }}
                    >
                      {domain.shortName} - {domain.name}
                    </h3>
                    <p className="text-xs text-gray-600">{domain.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8 text-left"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🧠</span> SCARF 모델이란?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  SCARF는 David Rock이 개발한 신경과학 기반 모델로, 인간의 사회적 위협과 보상 반응을 5가지 핵심 영역으로 설명합니다.
                  갈등 상황에서 이 영역들의 위협을 파악하면 효과적인 중재 전략을 수립할 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                    12개 질문
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    약 5분 소요
                  </span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                    맞춤형 전략 제공
                  </span>
                </div>
              </motion.div>

              {/* Start Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="gradient-bg text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                분석 시작하기
              </motion.button>
            </motion.div>
          )}

          {/* Quiz Screen */}
          {appState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  SCARF 위협 분석기
                </h1>
                <p className="text-gray-600">
                  갈등 상황을 떠올리며 각 질문에 답해주세요
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <ProgressBar
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={totalQuestions}
                  answeredQuestions={answeredQuestions}
                />
              </div>

              {/* Question Card */}
              <div className="mb-8">
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onSelectAnswer={handleSelectAnswer}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={totalQuestions}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  이전
                </button>

                <div className="flex gap-2">
                  {/* Question indicators */}
                  {scarfQuestions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        const answer = answers.find(a => a.questionId === scarfQuestions[idx].id);
                        setSelectedAnswer(answer?.answerId || null);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentQuestionIndex
                          ? 'bg-purple-500 scale-125'
                          : answeredQuestions.has(scarfQuestions[idx].id)
                          ? 'bg-purple-300'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {isLastQuestion ? (
                  <button
                    onClick={handleFinish}
                    disabled={!allAnswered}
                    className="flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    결과 보기
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    다음
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Results Screen */}
          {appState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                >
                  SCARF 위협 분석 결과
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-600"
                >
                  분석된 위협 영역과 맞춤형 대응 전략을 확인하세요
                </motion.p>
              </div>

              {/* Radar Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  SCARF 위협 프로필
                </h2>
                <div className="flex justify-center">
                  <RadarChart scores={domainScores} size={320} />
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📊</span> 분석 요약
                </h3>
                <p className="text-gray-700 mb-4">
                  분석 결과, <strong className="text-purple-600">{sortedDomains[0]?.name}</strong>과(와)
                  <strong className="text-blue-600"> {sortedDomains[1]?.name}</strong> 영역에서
                  가장 높은 위협이 감지되었습니다.
                  아래의 맞춤형 전략을 활용하여 갈등 상황에 효과적으로 대응하세요.
                </p>
                <div className="flex flex-wrap gap-2">
                  {sortedDomains.slice(0, 3).map((domain, idx) => (
                    <span
                      key={domain.id}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${domain.color}20`,
                        color: domain.color
                      }}
                    >
                      {idx + 1}위: {domain.name} ({domainScores[domain.id].toFixed(1)})
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Strategy Accordions */}
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  영역별 대응 전략
                </h2>
                {sortedDomains.map((domain, index) => (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <StrategyAccordion
                      domain={domain}
                      score={domainScores[domain.id]}
                      isHighPriority={index < 2}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  다시 분석하기
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-6 py-3 gradient-bg text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  결과 인쇄하기
                </button>
              </motion.div>

              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-12 text-center text-sm text-gray-500"
              >
                <p>
                  이 도구는 David Rock의 SCARF 모델을 기반으로 개발되었습니다.
                </p>
                <p className="mt-1">
                  조정활동에 사용하세요.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Site Footer */}
      <footer className="mt-16 py-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; 2026 Trinos Research Lab. All rights reserved.</p>
          <a
            href="https://mediator.trinos.group/?locale=en#contact"
            className="text-purple-600 hover:text-purple-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}
