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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

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
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {/* ==================== INTRO SCREEN ==================== */}
        {appState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="hero-gradient min-h-screen relative flex items-center justify-center px-4 py-20">
              {/* Floating Orbs */}
              <div className="floating-orb floating-orb-1" />
              <div className="floating-orb floating-orb-2" />
              <div className="floating-orb floating-orb-3" />

              {/* Hero Content */}
              <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white/90">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    신경과학 기반 갈등 분석 도구
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight"
                >
                  SCARF
                  <span className="block gradient-text-light">위협 분석기</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed text-balance"
                >
                  조정인이 갈등 상황에서 SCARF 영역의 위협을 신속하게 식별하고
                  <br className="hidden sm:block" />
                  대응 전략을 선택하도록 돕는 도구입니다.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStart}
                    className="btn-primary text-lg sm:text-xl px-10 py-5"
                  >
                    <span className="flex items-center gap-3">
                      분석 시작하기
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </motion.button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
                >
                  {[
                    { value: '12', label: '질문' },
                    { value: '5', label: 'SCARF 영역' },
                    { value: '5분', label: '소요 시간' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white/40"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* SCARF Domains Section */}
            <section className="page-gradient py-20 sm:py-28 px-4">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                  className="text-center mb-16"
                >
                  <motion.span
                    variants={itemVariants}
                    className="feature-badge mb-4"
                  >
                    5가지 핵심 영역
                  </motion.span>
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4"
                  >
                    SCARF 모델
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-600 text-lg max-w-2xl mx-auto"
                  >
                    David Rock이 개발한 신경과학 기반 모델로, 인간의 사회적 위협과 보상 반응을 설명합니다.
                  </motion.p>
                </motion.div>

                {/* SCARF Cards Grid */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
                >
                  {scarfDomains.map((domain, index) => (
                    <motion.div
                      key={domain.id}
                      variants={scaleVariants}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer group"
                    >
                      {/* Icon */}
                      <div
                        className="domain-icon mx-auto mb-4"
                        style={{
                          background: `linear-gradient(135deg, ${domain.color}15 0%, ${domain.color}05 100%)`,
                          boxShadow: `0 4px 15px ${domain.color}20`
                        }}
                      >
                        {domain.icon}
                      </div>

                      {/* Short name badge */}
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                        style={{
                          backgroundColor: `${domain.color}15`,
                          color: domain.color
                        }}
                      >
                        {domain.shortName}
                      </div>

                      {/* Name */}
                      <h3
                        className="text-lg font-bold mb-2 transition-colors"
                        style={{ color: domain.color }}
                      >
                        {domain.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {domain.description}
                      </p>

                      {/* Hover indicator */}
                      <div
                        className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: domain.color }}
                      >
                        자세히 보기
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-20 sm:py-28 px-4">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                  className="text-center mb-16"
                >
                  <motion.span
                    variants={itemVariants}
                    className="feature-badge mb-4"
                  >
                    간단한 3단계
                  </motion.span>
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4"
                  >
                    어떻게 작동하나요?
                  </motion.h2>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={containerVariants}
                  className="grid md:grid-cols-3 gap-8"
                >
                  {[
                    {
                      step: '01',
                      title: '질문에 답하기',
                      description: '갈등 상황을 떠올리며 12개의 질문에 솔직하게 답변해주세요.',
                      icon: '📝'
                    },
                    {
                      step: '02',
                      title: '위협 분석',
                      description: 'SCARF 5개 영역별로 위협 수준을 자동으로 분석합니다.',
                      icon: '🔍'
                    },
                    {
                      step: '03',
                      title: '전략 확인',
                      description: '분석 결과에 따른 맞춤형 대응 전략을 제공받습니다.',
                      icon: '🎯'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
                    >
                      {/* Step number */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-bold">
                        Step {item.step}
                      </div>

                      {/* Icon */}
                      <div className="text-5xl mb-4 mt-2">{item.icon}</div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>

                      {/* Description */}
                      <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center mt-16"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStart}
                    className="btn-primary text-lg px-10 py-5"
                  >
                    <span className="flex items-center gap-3">
                      지금 시작하기
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-8 px-4 border-t border-gray-200">
              <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <p>&copy; 2026 Trinos Research Lab. All rights reserved.</p>
                <a
                  href="https://mediator.trinos.group/?locale=en#contact"
                  className="text-purple-600 hover:text-purple-800 transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </div>
            </footer>
          </motion.div>
        )}

        {/* ==================== QUIZ SCREEN ==================== */}
        {appState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="page-gradient min-h-screen py-8 px-4 md:px-8"
          >
            <div className="max-w-4xl mx-auto">
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
            </div>
          </motion.div>
        )}

        {/* ==================== RESULTS SCREEN ==================== */}
        {appState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="page-gradient min-h-screen py-8 px-4 md:px-8"
          >
            <div className="max-w-4xl mx-auto">
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
                className="glass-card rounded-2xl p-6 mb-8"
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
                className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8 border border-purple-100"
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
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  다시 분석하기
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    결과 인쇄하기
                  </span>
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

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                  <p>&copy; 2026 Trinos Research Lab. All rights reserved.</p>
                  <a
                    href="https://mediator.trinos.group/?locale=en#contact"
                    className="text-purple-600 hover:text-purple-800 transition-colors font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact
                  </a>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
