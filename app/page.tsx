'use client';

import { useState } from 'react';

export default function Home() {
  const [situation, setSituation] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const scarfFactors = [
    { key: 'status', label: '위상 (Status)', desc: '상대적 중요도, 서열, 지위' },
    { key: 'certainty', label: '확실성 (Certainty)', desc: '예측 가능성, 명확성' },
    { key: 'autonomy', label: '자율성 (Autonomy)', desc: '선택권, 통제감' },
    { key: 'relatedness', label: '관계성 (Relatedness)', desc: '소속감, 연대감' },
    { key: 'fairness', label: '공정성 (Fairness)', desc: '공평한 대우, 절차적 정의' }
  ];

  const analyzeSituation = () => {
    setLoading(true);
    // 실제로는 API 호출이나 AI 분석을 수행
    setTimeout(() => {
      setAnalysis({
        threats: scarfFactors.map(factor => ({
          ...factor,
          level: Math.floor(Math.random() * 5) + 1,
          indicators: [`${factor.label} 관련 위협 요소 1`, `${factor.label} 관련 위협 요소 2`]
        }))
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">SCARF 위협 분석기</h1>
        <p className="text-gray-600 mb-8">갈등 상황에서 SCARF 모델을 활용한 신경과학적 위협 요소 분석</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            갈등 상황 설명
          </label>
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="분석하고자 하는 갈등 상황을 자세히 설명해주세요..."
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
          />
          <button
            onClick={analyzeSituation}
            disabled={!situation || loading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? '분석 중...' : 'SCARF 분석 시작'}
          </button>
        </div>

        {analysis && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">분석 결과</h2>
            {analysis.threats.map((threat: any) => (
              <div key={threat.key} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{threat.label}</h3>
                    <p className="text-sm text-gray-600">{threat.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{threat.level}/5</div>
                    <div className="text-xs text-gray-500">위협 수준</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(threat.level / 5) * 100}%` }}
                    />
                  </div>
                  <ul className="space-y-2">
                    {threat.indicators.map((indicator: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">SCARF 모델이란?</h3>
          <p className="text-gray-700 mb-4">
            SCARF는 David Rock이 개발한 신경과학 기반 모델로, 인간의 사회적 위협과 보상을 5가지 영역으로 설명합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {scarfFactors.map(factor => (
              <div key={factor.key} className="text-center">
                <div className="font-semibold text-blue-600 mb-1">{factor.label.split(' ')[0]}</div>
                <div className="text-xs text-gray-600">{factor.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
