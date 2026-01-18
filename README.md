# SCARF 위협 분석기 (SCARF Threat Analyzer)

갈등 상황에서 SCARF 모델을 활용한 신경과학적 위협 요소를 분석하는 조정 도구입니다.

## 🧠 SCARF 모델이란?

SCARF는 David Rock이 개발한 신경과학 기반 모델로, 인간의 사회적 위협과 보상을 5가지 영역으로 설명합니다:

- **S (Status)** - 위상: 상대적 중요도, 서열, 지위
- **C (Certainty)** - 확실성: 예측 가능성, 명확성
- **A (Autonomy)** - 자율성: 선택권, 통제감
- **R (Relatedness)** - 관계성: 소속감, 연대감
- **F (Fairness)** - 공정성: 공평한 대우, 절차적 정의

## 🎯 주요 기능

- 갈등 상황 입력 및 분석
- SCARF 5가지 영역별 위협 수준 평가
- 시각적 위협 레벨 표시
- 영역별 상세 지표 제공
- 한국어 완벽 지원

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 🛠️ 기술 스택

- **Framework**: Next.js 15.1.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## 📁 프로젝트 구조

```
scarf-analyzer/
├── app/
│   ├── page.tsx          # 메인 분석 페이지
│   ├── layout.tsx        # 루트 레이아웃
│   └── globals.css       # 글로벌 스타일
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 💡 사용 방법

1. 분석하고자 하는 갈등 상황을 텍스트로 입력합니다
2. "SCARF 분석 시작" 버튼을 클릭합니다
3. 5가지 SCARF 영역별 위협 수준을 확인합니다
4. 각 영역의 상세 지표를 검토합니다

## 🎓 조정(調停)에서의 활용

이 도구는 조정인(mediator)이 분쟁 당사자들의 심리적 위협 요소를 이해하고, 효과적인 개입 전략을 수립하는 데 도움을 줍니다.

## 📄 라이선스

MIT License

## 👥 기여

이 프로젝트는 Trinos Strategy의 조정 도구 시리즈 중 하나입니다.

---

**Note**: 현재 버전은 데모 모드로 작동하며, 실제 AI 분석 기능은 추후 업데이트될 예정입니다.
