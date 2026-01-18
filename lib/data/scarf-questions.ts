export interface Answer {
  id: string;
  text: string;
  score: number;
}

export interface Question {
  id: number;
  domain: 'status' | 'certainty' | 'autonomy' | 'relatedness' | 'fairness';
  text: string;
  context: string;
  answers: Answer[];
}

export const scarfQuestions: Question[] = [
  // Status Questions (2-3)
  {
    id: 1,
    domain: 'status',
    text: '갈등 당사자가 자신의 전문성이나 경험이 무시당한다고 느끼나요?',
    context: '위상(Status) 위협 평가',
    answers: [
      { id: '1a', text: '전혀 그렇지 않다 - 상대방의 전문성이 충분히 인정받고 있다', score: 1 },
      { id: '1b', text: '약간 그렇다 - 가끔 인정받지 못한다고 느낄 수 있다', score: 2 },
      { id: '1c', text: '보통이다 - 때때로 무시당한다고 느끼는 것 같다', score: 3 },
      { id: '1d', text: '많이 그렇다 - 자주 자신의 가치가 폄하된다고 느낀다', score: 4 },
      { id: '1e', text: '매우 그렇다 - 심각하게 무시당하고 있다고 느낀다', score: 5 }
    ]
  },
  {
    id: 2,
    domain: 'status',
    text: '당사자 간에 지위나 권한의 불균형이 갈등에 영향을 주고 있나요?',
    context: '위상(Status) 위협 평가',
    answers: [
      { id: '2a', text: '전혀 그렇지 않다 - 동등한 입장에서 대화하고 있다', score: 1 },
      { id: '2b', text: '약간 그렇다 - 미미한 권한 차이가 있다', score: 2 },
      { id: '2c', text: '보통이다 - 어느 정도 지위 차이가 느껴진다', score: 3 },
      { id: '2d', text: '많이 그렇다 - 명확한 권한 불균형이 있다', score: 4 },
      { id: '2e', text: '매우 그렇다 - 심각한 지위 격차가 갈등의 핵심이다', score: 5 }
    ]
  },
  // Certainty Questions (2-3)
  {
    id: 3,
    domain: 'certainty',
    text: '상황의 불확실성이 당사자들의 불안을 높이고 있나요?',
    context: '확실성(Certainty) 위협 평가',
    answers: [
      { id: '3a', text: '전혀 그렇지 않다 - 상황이 명확하고 예측 가능하다', score: 1 },
      { id: '3b', text: '약간 그렇다 - 약간의 불확실성이 있다', score: 2 },
      { id: '3c', text: '보통이다 - 불확실한 요소들이 있다', score: 3 },
      { id: '3d', text: '많이 그렇다 - 상당한 불확실성으로 불안해하고 있다', score: 4 },
      { id: '3e', text: '매우 그렇다 - 극심한 불확실성이 주요 스트레스 원인이다', score: 5 }
    ]
  },
  {
    id: 4,
    domain: 'certainty',
    text: '앞으로의 진행 방향이나 결과에 대한 정보가 부족한가요?',
    context: '확실성(Certainty) 위협 평가',
    answers: [
      { id: '4a', text: '전혀 그렇지 않다 - 충분한 정보가 공유되고 있다', score: 1 },
      { id: '4b', text: '약간 그렇다 - 일부 정보가 부족하다', score: 2 },
      { id: '4c', text: '보통이다 - 필요한 정보의 절반 정도만 있다', score: 3 },
      { id: '4d', text: '많이 그렇다 - 중요한 정보가 많이 부족하다', score: 4 },
      { id: '4e', text: '매우 그렇다 - 거의 아무 정보도 없는 상태이다', score: 5 }
    ]
  },
  {
    id: 5,
    domain: 'certainty',
    text: '변화의 속도나 범위가 당사자들을 압도하고 있나요?',
    context: '확실성(Certainty) 위협 평가',
    answers: [
      { id: '5a', text: '전혀 그렇지 않다 - 변화가 관리 가능한 수준이다', score: 1 },
      { id: '5b', text: '약간 그렇다 - 변화가 조금 빠르게 느껴진다', score: 2 },
      { id: '5c', text: '보통이다 - 변화에 적응하기 위해 노력이 필요하다', score: 3 },
      { id: '5d', text: '많이 그렇다 - 변화가 너무 빠르고 광범위하다', score: 4 },
      { id: '5e', text: '매우 그렇다 - 변화에 완전히 압도당하고 있다', score: 5 }
    ]
  },
  // Autonomy Questions (2-3)
  {
    id: 6,
    domain: 'autonomy',
    text: '당사자가 자신의 선택권이나 통제력이 제한되었다고 느끼나요?',
    context: '자율성(Autonomy) 위협 평가',
    answers: [
      { id: '6a', text: '전혀 그렇지 않다 - 충분한 선택권과 통제력이 있다', score: 1 },
      { id: '6b', text: '약간 그렇다 - 일부 제한이 있다고 느낀다', score: 2 },
      { id: '6c', text: '보통이다 - 어느 정도 제약을 받고 있다', score: 3 },
      { id: '6d', text: '많이 그렇다 - 선택권이 많이 제한되어 있다', score: 4 },
      { id: '6e', text: '매우 그렇다 - 거의 아무런 통제력이 없다고 느낀다', score: 5 }
    ]
  },
  {
    id: 7,
    domain: 'autonomy',
    text: '의사결정 과정에서 당사자의 의견이 반영되고 있나요?',
    context: '자율성(Autonomy) 위협 평가',
    answers: [
      { id: '7a', text: '매우 그렇다 - 의견이 적극적으로 반영되고 있다', score: 1 },
      { id: '7b', text: '많이 그렇다 - 대부분의 의견이 반영된다', score: 2 },
      { id: '7c', text: '보통이다 - 일부 의견만 반영된다', score: 3 },
      { id: '7d', text: '약간 그렇다 - 의견이 거의 반영되지 않는다', score: 4 },
      { id: '7e', text: '전혀 그렇지 않다 - 의견이 완전히 무시된다', score: 5 }
    ]
  },
  // Relatedness Questions (2-3)
  {
    id: 8,
    domain: 'relatedness',
    text: '당사자가 소외감이나 배제당하는 느낌을 받고 있나요?',
    context: '관계성(Relatedness) 위협 평가',
    answers: [
      { id: '8a', text: '전혀 그렇지 않다 - 소속감과 연결감을 느끼고 있다', score: 1 },
      { id: '8b', text: '약간 그렇다 - 가끔 소외감을 느낄 수 있다', score: 2 },
      { id: '8c', text: '보통이다 - 때때로 배제당하는 느낌이 있다', score: 3 },
      { id: '8d', text: '많이 그렇다 - 자주 소외감을 느끼고 있다', score: 4 },
      { id: '8e', text: '매우 그렇다 - 심각하게 배제당하고 있다고 느낀다', score: 5 }
    ]
  },
  {
    id: 9,
    domain: 'relatedness',
    text: '당사자들 간의 신뢰가 손상되었나요?',
    context: '관계성(Relatedness) 위협 평가',
    answers: [
      { id: '9a', text: '전혀 그렇지 않다 - 신뢰 관계가 튼튼하다', score: 1 },
      { id: '9b', text: '약간 그렇다 - 약간의 신뢰 문제가 있다', score: 2 },
      { id: '9c', text: '보통이다 - 신뢰에 균열이 있다', score: 3 },
      { id: '9d', text: '많이 그렇다 - 신뢰가 상당히 손상되었다', score: 4 },
      { id: '9e', text: '매우 그렇다 - 신뢰가 완전히 무너졌다', score: 5 }
    ]
  },
  {
    id: 10,
    domain: 'relatedness',
    text: '갈등으로 인해 팀이나 그룹의 결속력이 약해졌나요?',
    context: '관계성(Relatedness) 위협 평가',
    answers: [
      { id: '10a', text: '전혀 그렇지 않다 - 결속력이 유지되고 있다', score: 1 },
      { id: '10b', text: '약간 그렇다 - 약간의 분열이 있다', score: 2 },
      { id: '10c', text: '보통이다 - 결속력이 흔들리고 있다', score: 3 },
      { id: '10d', text: '많이 그렇다 - 심각한 분열이 발생했다', score: 4 },
      { id: '10e', text: '매우 그렇다 - 팀이 완전히 분열되었다', score: 5 }
    ]
  },
  // Fairness Questions (2-3)
  {
    id: 11,
    domain: 'fairness',
    text: '당사자가 불공정한 대우를 받고 있다고 느끼나요?',
    context: '공정성(Fairness) 위협 평가',
    answers: [
      { id: '11a', text: '전혀 그렇지 않다 - 공정하게 대우받고 있다', score: 1 },
      { id: '11b', text: '약간 그렇다 - 약간의 불공정함이 있다', score: 2 },
      { id: '11c', text: '보통이다 - 어느 정도 불공정하다고 느낀다', score: 3 },
      { id: '11d', text: '많이 그렇다 - 상당히 불공정하다고 느낀다', score: 4 },
      { id: '11e', text: '매우 그렇다 - 심각하게 불공정한 대우를 받고 있다', score: 5 }
    ]
  },
  {
    id: 12,
    domain: 'fairness',
    text: '의사결정 과정이 투명하고 공개적으로 진행되고 있나요?',
    context: '공정성(Fairness) 위협 평가',
    answers: [
      { id: '12a', text: '매우 그렇다 - 모든 과정이 투명하게 공개된다', score: 1 },
      { id: '12b', text: '많이 그렇다 - 대부분 투명하게 진행된다', score: 2 },
      { id: '12c', text: '보통이다 - 일부만 공개된다', score: 3 },
      { id: '12d', text: '약간 그렇다 - 대부분 비공개로 진행된다', score: 4 },
      { id: '12e', text: '전혀 그렇지 않다 - 완전히 불투명하다', score: 5 }
    ]
  }
];

export const getQuestionsByDomain = (domain: string): Question[] => {
  return scarfQuestions.filter(q => q.domain === domain);
};

export const getTotalQuestions = (): number => {
  return scarfQuestions.length;
};
