import { SubjectInfo } from './types'

export const subjectsInfo: SubjectInfo[] = [
  {
    name: "독서",
    ratio: "지필평가 60% | 수행평가 40%",
    hasFirstExam: true,
    performanceAssessments: [
      "독서과정 (25점)",
      "독후활동(논술) (10점)",
      "독후활동(구술) (5점)",
    ],
    firstExamAnswers: "532441422315351441135223",
    firstExamScores: [4.1, 4.1, 3.9, 4.5, 3.9, 4.2, 4.3, 3.9, 4.1, 4.1, 4.5, 4.2, 4.3, 4.2, 4.2, 4.5, 3.9, 3.9, 4.1, 3.9, 4.1, 4.5, 4.3, 4.3],
    firstExamMaxScore: 100,
    performanceMaxScores: [25, 10, 5],
    secondExamAnswers: "315534312434152533143255",
    secondExamScores: [4.3, 3.9, 4.2, 4.1, 4.5, 4.1, 4.5, 3.9, 4.1, 3.9, 4.2, 4.3, 4.1, 4.3, 4.5, 3.9, 4.2, 4.5, 4.3, 3.9, 4.1, 3.9, 4.1, 4.2],
    secondExamMaxScore: 100,
  },
  {
    name: "수학Ⅱ",
    ratio: "지필평가 60% | 수행평가 40%",
    hasFirstExam: true,
    performanceAssessments: [
      "극한과 연속 암호 만들기 (13점)",
      "나의 인생 그래프 그리기 (15점)",
      "포트폴리오 (12점)",
    ],
    firstExamAnswers: "312551324454321341",
    firstExamScores: [4.2, 4.2, 4.4, 4.4, 4.6, 4.6, 4.8, 4.8, 5, 5, 5.2, 5.2, 5.4, 5.4, 5.6, 5.6, 5.8, 5.8],
    firstExamMaxScore: 90,
    performanceMaxScores: [13, 15, 12],
    secondExamAnswers: "431551123254523342",
    secondExamScores: [4.2, 4.2, 4.4, 4.4, 4.6, 4.6, 4.8, 4.8, 5, 5, 5.2, 5.2, 5.4, 5.4, 5.6, 5.6, 5.8, 5.8],
    secondExamMaxScore: 90,
  },
  {
    name: "영어Ⅱ",
    ratio: "지필평가 60% | 수행평가 40%",
    hasFirstExam: true,
    performanceAssessments: [
      "나의 행복 글쓰기 (25점)",
      "공동체의 행복 증진 방안 말하기 (15점)",
    ],
    firstExamAnswers: "5441432421135525235231",
    firstExamScores: [4.2, 4.4, 4.7, 4.1, 4.7, 4.1, 4.4, 5.1, 4.9, 4.9, 4.4, 4.4, 4.9, 4.4, 5.1, 4.1, 4.9, 4.4, 4.7, 4.1, 4.4, 4.7],
    firstExamMaxScore: 100,
    performanceMaxScores: [25, 15],
    secondExamAnswers: "2155443542234112233513",
    secondExamScores: [4.1, 4.7, 4.4, 4.2, 4.1, 4.1, 4.1, 5.1, 4.7, 4.7, 4.4, 4.4, 4.4, 4.9, 4.9, 4.4, 4.4, 5.1, 4.9, 4.9, 4.4, 4.7],
    secondExamMaxScore: 100,
  },
  {
    name: "정치와 법",
    ratio: "지필평가 60% | 수행평가 40%",
    hasFirstExam: true,
    performanceAssessments: [
      "정치 참여 방안 제시하기 (20점)",
      "국제 문제 해결할 수 있는 국제 기구 만들기 (20점)",
    ],
    firstExamAnswers: "1422532235343352314154",
    firstExamScores: [4.7, 5.6, 4.5, 3.8, 4.3, 5.5, 5, 3.5, 4.2, 5.2, 4.1, 5.4, 5.1, 3.7, 4.8, 4.6, 3.9, 3.5, 5.3, 4.9, 4.4, 4],
    firstExamMaxScore: 100,
    performanceMaxScores: [20, 20],
    secondExamAnswers: "41525231144251523331",
    secondExamScores: [5.1, 5.6, 5, 4.8, 4.7, 4.3, 5.4, 4.9, 4.1, 4.2, 4.5, 4.4, 5.2, 4.6, 5.3, 5.5, 5.7, 5.9, 5.8, 5],
    secondExamMaxScore: 100,
  },
  {
    name: "사회·문화",
    ratio: "지필평가 60% | 수행평가 40%",
    hasFirstExam: true,
    performanceAssessments: [
      "사회 변동 가상 신문 제작 (20점)",
      "사회 불평등 논술 (20점)",
    ],
    firstExamAnswers: "43134121532435542425",
    firstExamScores: [4.6, 4.5, 4.7, 5.6, 4.8, 4.9, 5.3, 4.4, 4.9, 5.1, 4.8, 5.5, 5.1, 5.2, 5.3, 4.9, 5.4, 4.7, 4.6, 5.7],
    firstExamMaxScore: 100,
    performanceMaxScores: [20, 20],
    secondExamAnswers: "12125334541433152152",
    secondExamScores: [4.6, 4.7, 4.9, 5.3, 4.6, 4.8, 5.3, 4.8, 4.9, 4.5, 5.4, 4.9, 5.1, 5.7, 5.2, 4.4, 5.5, 5.1, 5.6, 4.7],
    secondExamMaxScore: 100,
  },
  {
    name: "생활과 윤리",
    ratio: "지필평가 40% | 수행평가 60%",
    hasFirstExam: false,
    performanceAssessments: [
      "혐오 표현 규제 (20점)",
      "환경 윤리 논술^? (20점)",
      "카드 뉴스 제작 (20점)",
    ],
    firstExamAnswers: "",
    firstExamScores: [],
    firstExamMaxScore: 0,
    performanceMaxScores: [20, 20, 20],
    secondExamAnswers: "5443412123325343531521351",
    secondExamScores: [3.2, 3.6, 3.2, 4, 3.6, 4.4, 4.6, 4, 4.2, 4.4, 4, 4.2, 3.8, 4.4, 4, 4.2, 4.2, 4.2, 4, 4.2, 3.6, 4, 4, 4, 4],
    secondExamMaxScore: 100,
  },
  {
    name: "화학Ⅰ",
    ratio: "지필평가 40% | 수행평가 60%",
    hasFirstExam: true,
    performanceAssessments: [
      "자료를 통한 원소의 주기성 찾기 (20점)",
      "분자의 구조 (20점)",
      "산과 염기 및 산화 환원 (20점)",
    ],
    firstExamAnswers: "5444145344153224125533124",
    firstExamScores: [2.8, 4.5, 4.7, 4.4, 3.3, 3.4, 3.8, 3, 3.5, 3.9, 3.7, 4.6, 4, 4.9, 2.9, 3.1, 3.6, 4.1, 4.2, 4.3, 3.2, 4.8, 5, 5.1, 5.2],
    firstExamMaxScore: 100,
    performanceMaxScores: [20, 20, 20],
    secondExamAnswers: "312511145234221355524345",
    secondExamScores: [3.2, 3.1, 3.3, 3.4, 3, 3.5, 3.6, 3.8, 4.5, 3.6, 4.7, 4, 4.1, 4.2, 4.4, 3.7, 4.6, 3.9, 4.9, 5.1, 5.5, 5.2, 5.4, 5.3],
    secondExamMaxScore: 100,
  },
  {
    name: "생명과학Ⅰ",
    ratio: "지필평가 50% | 수행평가 50%",
    hasFirstExam: true,
    performanceAssessments: [
      "유전 해석하기 (20점)",
      "군집 분석 (20점)",
      "포트폴리오 (10점)",
    ],
    firstExamAnswers: "115423532442135354",
    firstExamScores: [3.7, 3.8, 4.1, 4.1, 4.6, 3.8, 3.9, 4.8, 5, 5.1, 5.2, 3.8, 4.4, 4.2, 3.8, 4.9, 5.3, 5.5],
    firstExamMaxScore: 80,
    performanceMaxScores: [20, 20, 10],
    secondExamAnswers: "21554431112235354432",
    secondExamScores: [4.3, 4.5, 4.4, 5.1, 5.3, 5.6, 5.6, 5.7, 4.5, 4.2, 4.6, 5, 5.3, 5.4, 4.3, 4.8, 5.5, 5.4, 5.2, 5.3],
    secondExamMaxScore: 100,
  },
  {
    name: "지구과학Ⅰ",
    ratio: "지필평가 50% | 수행평가 50%",
    hasFirstExam: true,
    performanceAssessments: [
      "태풍의 일생 논술^? (20점)",
      "지구과학 탐구 보고서 (20점)",
      "포트폴리오 (10점)",
    ],
    firstExamAnswers: "23332352451114411422534",
    firstExamScores: [3.7, 4.7, 4.3, 3.7, 3.7, 4.7, 4.3, 4.3, 4.7, 4.3, 4.3, 5, 3.7, 4.3, 4.7, 3.7, 4.3, 4.7, 4.3, 5, 4.3, 5, 4.3, 4.3, 5],
    firstExamMaxScore: 100,
    performanceMaxScores: [20, 20, 10],
    secondExamAnswers: "15412343142113553523422",
    secondExamScores: [4.7, 4.7, 4.3, 4.3, 4.7, 3.7, 3.7, 3.7, 4.3, 4.3, 4.3, 3.7, 4.3, 4.3, 4.7, 5, 4.7, 3.7, 4.3, 5, 4.3, 4.3, 5],
    secondExamMaxScore: 100,
  },
  {
    name: "일본어Ⅰ",
    ratio: "지필평가 40% | 수행평가 60%",
    hasFirstExam: false,
    performanceAssessments: [
      "일상생활표현 말하기 (20점)",
      "일본문화 주제탐구 발표 (25점)",
      "일본어 문장쓰기 (15점)",
    ],
    firstExamAnswers: "",
    firstExamScores: [],
    firstExamMaxScore: 0,
    performanceMaxScores: [20, 25, 15],
    secondExamAnswers: "4154434235145135324251523",
    secondExamScores: [4, 4, 3.8, 3.8, 3.5, 4, 3.9, 3.6, 4, 4.8, 3.6, 3.6, 3.8, 3.8, 4.4, 4.6, 3.4, 5, 5, 3.8, 4, 4.2, 3.8, 3.6, 4],
    secondExamMaxScore: 100,
  },
  {
    name: "중국어Ⅰ",
    ratio: "지필평가 40% | 수행평가 60%",
    hasFirstExam: false,
    performanceAssessments: [
      "음식 주문하기 (20점)",
      "듣고 반응하기 (20점)",
      "그림 보고 말하기 (20점)",
    ],
    firstExamAnswers: "",
    firstExamScores: [],
    firstExamMaxScore: 0,
    performanceMaxScores: [20, 20, 20],
    secondExamAnswers: "52515532434141141334352322",
    secondExamScores: [3.3, 3.7, 3.9, 3.5, 4.3, 3.6, 3.4, 4.4, 4.2, 3.6, 3.4, 3.8, 4.3, 3.8, 4.3, 3.9, 3.9, 4.1, 3.5, 3.7, 3.7, 3.8, 4.1, 4.4, 4.1, 3.3],
    secondExamMaxScore: 100,
  },
];

export const dates = [
  { date: "4/30 (수)", subjects: ["확률과 통계", "윤리와 사상", "-"] },
  { date: "5/1 (목)", subjects: ["영어독해와 작문", "세계지리", "미적분"] },
  { date: "5/2 (금)", subjects: ["언어와 매체 / 화법과 작문", "경제", "동아시아사"] },
];

export const examTypes = ["1차 지필평가", "2차 지필평가"];