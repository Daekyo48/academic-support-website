"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState, useEffect, useCallback, useMemo } from 'react';

type SubjectInfo = {
  name: string;
  ratio: string;
  hasFirstExam: boolean;
  performanceAssessments: string[];
  firstExamAnswers: string;
  firstExamScores: number[];
  firstExamMaxScore: number;
  performanceMaxScores: number[];
  secondExamAnswers: string;
  secondExamScores: number[];
  secondExamMaxScore: number;
}

type Errors = {
  category1: string;
  performance: { [key: string]: string };
  written: { [key: string]: string };
}

export default function WebPage() {
  const [inputs, setInputs] = useState({
    category1: '',
    performance1: '', performance2: '', performance3: '',
    written1: '', written2: ''
  })
  const [errors, setErrors] = useState<Errors>({
    category1: '',
    performance: {},
    written: {}
  })
  const [isTableExpanded, setIsTableExpanded] = useState(false)
  const [daysLeft, setDaysLeft] = useState<number | string>(0);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [scoreMessage, setScoreMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [incorrectQuestions, setIncorrectQuestions] = useState<number[]>([]);
  const [rawScoreMessage, setRawScoreMessage] = useState<string | null>(null);

  const subjectsInfo = useMemo<SubjectInfo[]>(() => [
    { 
      name: "독서", 
      ratio: "지필평가 60% | 수행평가 40%", 
      hasFirstExam: true, 
      performanceAssessments: ["독서과정 (25점)", "독후활동(논술) (10점)", "독후활동(구술) (5점)"], 
      firstExamAnswers: "532441422315351441135223", 
      firstExamScores: [4.1, 4.1, 3.9, 4.5, 3.9, 4.2, 4.3, 3.9, 4.1, 4.1, 4.5, 4.2, 4.3, 4.2, 4.2, 4.5, 3.9, 3.9, 4.1, 3.9, 4.1, 4.5, 4.3, 4.3], 
      firstExamMaxScore: 100, 
      performanceMaxScores: [25, 10, 5],
      secondExamAnswers: "315534312434152533143255",
      secondExamScores: [4.3, 3.9, 4.2, 4.1, 4.5, 4.1, 4.5, 3.9, 4.1, 3.9, 4.2, 4.3, 4.1, 4.3, 4.5, 3.9, 4.2, 4.5, 4.3, 3.9, 4.1, 3.9, 4.1, 4.2],
      secondExamMaxScore: 100
    },
    { 
      name: "수학Ⅱ", 
      ratio: "지필평가 60% | 수행평가 40%", 
      hasFirstExam: true, 
      performanceAssessments: ["극한과 연속 암호 만들기 (13점)", "나의 인생 그래프 그리기 (15점)", "포트폴리오 (12점)"], 
      firstExamAnswers: "312551324454321341", 
      firstExamScores: [4.2, 4.2, 4.4, 4.4, 4.6, 4.6, 4.8, 4.8, 5, 5, 5.2, 5.2, 5.4, 5.4, 5.6, 5.6, 5.8, 5.8], 
      firstExamMaxScore: 90, 
      performanceMaxScores: [13, 15, 12],
      secondExamAnswers: "431551123254523342",
      secondExamScores: [4.2, 4.2, 4.4, 4.4, 4.6, 4.6, 4.8, 4.8, 5, 5, 5.2, 5.2, 5.4, 5.4, 5.6, 5.6, 5.8, 5.8],
      secondExamMaxScore: 90
    },
    { 
      name: "영어Ⅱ", 
      ratio: "지필평가 60% | 수행평가 40%", 
      hasFirstExam: true, 
      performanceAssessments: ["나의 행복 글쓰기 (25점)", "공동체의 행복 증진 방안 말하기 (15점)"], 
      firstExamAnswers: "5441432421135525235231", 
      firstExamScores: [4.2, 4.4, 4.7, 4.1, 4.7, 4.1, 4.4, 5.1, 4.9, 4.9, 4.4, 4.4, 4.9, 4.4, 5.1, 4.1, 4.9, 4.4, 4.7, 4.1, 4.4, 4.7], 
      firstExamMaxScore: 100, 
      performanceMaxScores: [25, 15], 
      secondExamAnswers: "2155443542234112233513", 
      secondExamScores: [4.1, 4.7, 4.4, 4.2, 4.1, 4.1, 4.1, 5.1, 4.7, 4.7, 4.4, 4.4, 4.4, 4.9, 4.9, 4.4, 4.4, 5.1, 4.9, 4.9, 4.4, 4.7], 
      secondExamMaxScore: 100
    },
    { 
      name: "정치와 법", 
      ratio: "지필평가 60% | 수행평가 40%", 
      hasFirstExam: true, 
      performanceAssessments: ["정치 참여 방안 제시하기 (20점)", "국제 문제 해결할 수 있는 국제 기구 만들기 (20점)"], 
      firstExamAnswers: "1422532235343352314154", 
      firstExamScores: [4.7, 5.6, 4.5, 3.8, 4.3, 5.5, 5, 3.5, 4.2, 5.2, 4.1, 5.4, 5.1, 3.7, 4.8, 4.6, 3.9, 3.5, 5.3, 4.9, 4.4, 4], 
      firstExamMaxScore: 100, 
      performanceMaxScores: [20, 20], 
      secondExamAnswers: "41525231144251523331", 
      secondExamScores: [5.1, 5.6, 5, 4.8, 4.7, 4.3, 5.4, 4.9, 4.1, 4.2, 4.5, 4.4, 5.2, 4.6, 5.3, 5.5, 5.7, 5.9, 5.8, 5], 
      secondExamMaxScore: 100
    },
    { 
      name: "사회·문화", 
      ratio: "지필평가 60% | 수행평가 40%", 
      hasFirstExam: true, 
      performanceAssessments: ["사회 변동 가상 신문 제작 (20점)", "사회 불평등 논술 (20점)"], 
      firstExamAnswers: "43134121532435542425", 
      firstExamScores: [4.6, 4.5, 4.7, 5.6, 4.8, 4.9, 5.3, 4.4, 4.9, 5.1, 4.8, 5.5, 5.1, 5.2, 5.3, 4.9, 5.4, 4.7, 4.6, 5.7], 
      firstExamMaxScore: 100, 
      performanceMaxScores: [20, 20], 
      secondExamAnswers: "12125334541433152152", 
      secondExamScores: [4.6, 4.7, 4.9, 5.3, 4.6, 4.8, 5.3, 4.8, 4.9, 4.5, 5.4, 4.9, 5.1, 5.7, 5.2, 4.4, 5.5, 5.1, 5.6, 4.7], 
      secondExamMaxScore: 100
    },
    { 
      name: "생활과 윤리", 
      ratio: "지필평가 40% | 수행평가 60%", 
      hasFirstExam: false, 
      performanceAssessments: ["혐오 표현 규제 (20점)", "환경 윤리 논술^? (20점)", "카드 뉴스 제작 (20점)"], 
      firstExamAnswers: "", 
      firstExamScores: [], 
      firstExamMaxScore: 0, 
      performanceMaxScores: [20, 20, 20], 
      secondExamAnswers: "5443412123325343531521351", 
      secondExamScores: [3.2, 3.6, 3.2, 4, 3.6, 4.4, 4.6, 4, 4.2, 4.4, 4, 4.2, 3.8, 4.4, 4, 4.2, 4.2, 4.2, 4, 4.2, 3.6, 4, 4, 4, 4], 
      secondExamMaxScore: 100
    },
    { 
      name: "화학Ⅰ", 
      ratio: "지필평가 40% | 수행평가 60%", 
      hasFirstExam: true, 
      performanceAssessments: ["자료를 통한 원소의 주기성 찾기 (20점)", "분자의 구조 (20점)", "산과 염기 및 산화 환원 (20점)"], 
      firstExamAnswers: "5444145344153224125533124", 
      firstExamScores: [2.8, 4.5, 4.7, 4.4, 3.3, 3.4, 3.8, 3, 3.5, 3.9, 3.7, 4.6, 4, 4.9, 2.9, 3.1, 3.6, 4.1, 4.2, 4.3, 3.2, 4.8, 5, 5.1, 5.2], 
      firstExamMaxScore: 100, 
      performanceMaxScores: [20, 20, 20], 
      secondExamAnswers: "312511145234221355524345", 
      secondExamScores: [3.2, 3.1, 3.3, 3.4, 3, 3.5, 3.6, 3.8, 4.5, 3.6, 4.7, 4, 4.1, 4.2, 4.4, 3.7, 4.6, 3.9, 4.9, 5.1, 5.5, 5.2, 5.4, 5.3], 
      secondExamMaxScore: 100
    },
    { 
      name: "생명과학Ⅰ", 
      ratio: "지필평가 50% | 수행평가 50%", 
      hasFirstExam: true, 
      performanceAssessments: ["유전 해석하기 (20점)", "군집 분석 (20점)", "포트폴리오 (10점)"], 
      firstExamAnswers: "115423532442135354", 
      firstExamScores: [3.7, 3.8, 4.1, 4.1, 4.6, 3.8, 3.9, 4.8, 5, 5.1, 5.2, 3.8, 4.4, 4.2, 3.8, 4.9, 5.3, 5.5], 
      firstExamMaxScore: 80, 
      performanceMaxScores: [20, 20, 10], 
      secondExamAnswers: "21554431112235354432", 
      secondExamScores: [4.3, 4.5, 4.4, 5.1, 5.3, 5.6, 5.6, 5.7, 4.5, 4.2, 4.6, 5, 5.3, 5.4, 4.3, 4.8, 5.5, 5.4, 5.2, 5.3], 
      secondExamMaxScore: 100
    },
    { 
      name: "지구과학Ⅰ", 
      ratio: "지필평가 50% | 수행평가 50%", 
      hasFirstExam: true, 
      performanceAssessments: ["태풍의 일생 논술^? (20점)", "지구과학 탐구 보고서 (20점)", "포트폴리오 (10점)"], 
      firstExamAnswers: "23332352451114411422534", 
      firstExamScores: [3.7, 4.7, 4.3, 3.7, 3.7, 4.7, 4.3, 4.3, 4.7, 4.3, 4.3, 5, 3.7, 4.3, 4.7, 3.7, 4.3, 4.7, 4.3, 5, 4.3, 5, 4.3, 4.3, 5], 
      firstExamMaxScore: 100, 
      performanceMaxScores: [20, 20, 10], 
      secondExamAnswers: "15412343142113553523422", 
      secondExamScores: [4.7, 4.7, 4.3, 4.3, 4.7, 3.7, 3.7, 3.7, 4.3, 4.3, 4.3, 3.7, 4.3, 4.3, 4.7, 5, 4.7, 3.7, 4.3, 5, 4.3, 4.3, 5], 
      secondExamMaxScore: 100
    },
    { 
      name: "일본어Ⅰ", 
      ratio: "지필평가 40% | 수행평가 60%", 
      hasFirstExam: false, 
      performanceAssessments: ["일상생활표현 말하기 (20점)", "일본문화 주제탐구 발표 (25점)", "일본어 문장쓰기 (15점)"], 
      firstExamAnswers: "", 
      firstExamScores: [], 
      firstExamMaxScore: 0, 
      performanceMaxScores: [20, 25, 15], 
      secondExamAnswers: "4154434235145135324251523", 
      secondExamScores: [4, 4, 3.8, 3.8, 3.5, 4, 3.9, 3.6, 4, 4.8, 3.6, 3.6, 3.8, 3.8, 4.4, 4.6, 3.4, 5, 5, 3.8, 4, 4.2, 3.8, 3.6, 4], 
      secondExamMaxScore: 100
    },
    { 
      name: "중국어Ⅰ", 
      ratio: "지필평가 40% | 수행평가 60%", 
      hasFirstExam: false, 
      performanceAssessments: ["음식 주문하기 (20점)", "듣고 반응하기 (20점)", "그림 보고 말하기 (20점)"], 
      firstExamAnswers: "", 
      firstExamScores: [], 
      firstExamMaxScore: 0, 
      performanceMaxScores: [20, 20, 20], 
      secondExamAnswers: "52515532434141141334352322", 
      secondExamScores: [3.3, 3.7, 3.9, 3.5, 4.3, 3.6, 3.4, 4.4, 4.2, 3.6, 3.4, 3.8, 4.3, 3.8, 4.3, 3.9, 3.9, 4.1, 3.5, 3.7, 3.7, 3.8, 4.1, 4.4, 4.1, 3.3], 
      secondExamMaxScore: 100 
    }
  ], []);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date()
      const targetDate = new Date(2025, 2, 4)
      const endDate = new Date(2025, 2, 5)
      const timeDiff = targetDate.getTime() - today.getTime()
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24))
      
      if (today >= targetDate && today <= endDate) {
        return 'DAY'
      } else {
        return daysLeft
      }
    }

    setDaysLeft(calculateDaysLeft())

    const timer = setInterval(() => {
      setDaysLeft(calculateDaysLeft())
    }, 1000 * 60 * 60 * 24)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'category1') {
      if (/^[\d\s]*$/.test(value)) {
        setInputs(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, category1: '' }))
      } else {
        setErrors(prev => ({ ...prev, category1: '숫자 또는 공백만 입력 가능합니다' }))
      }
    } else if (name.startsWith('performance')) {
      const index = parseInt(name.replace('performance', ''))
      if (/^\d*$/.test(value)) {
        setInputs(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, performance: { ...prev.performance, [index]: '' } }))
      } else {
        setErrors(prev => ({ ...prev, performance: { ...prev.performance, [index]: '숫자만 입력 가능합니다' } }))
      }
    } else if (name.startsWith('written')) {
      const index = parseInt(name.replace('written', ''))
      if (/^\d*\.?\d*$/.test(value)) {
        setInputs(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, written: { ...prev.written, [index]: '' } }))
      } else {
        setErrors(prev => ({ ...prev, written: { ...prev.written, [index]: '숫자 또는 소수점만 입력 가능합니다' } }))
      }
    }
  }

  const calculateScore = useCallback(() => {
    if (!selectedSubject || !selectedExam) {
      setErrors(prev => ({ ...prev, category1: '과목과 평가를 선택해주세요' }));
      setScoreMessage(null);
      setIncorrectQuestions([]);
      return;
    }

    const subject = subjectsInfo.find(s => s.name === selectedSubject);
    if (!subject) {
      setErrors(prev => ({ ...prev, category1: '과목을 찾을 수 없습니다' }));
      setScoreMessage(null);
      setIncorrectQuestions([]);
      return;
    }

    const isFirstExam = selectedExam === "1차 지필평가";
    const examAnswers = isFirstExam ? subject.firstExamAnswers : subject.secondExamAnswers;
    const examScores = isFirstExam ? subject.firstExamScores : subject.secondExamScores;
    const examMaxScore = isFirstExam ? subject.firstExamMaxScore : subject.secondExamMaxScore;

    if (!examAnswers || examAnswers.length === 0) {
      setErrors(prev => ({ ...prev, category1: '평가가 존재하지 않습니다' }));
      setScoreMessage(null);
      setIncorrectQuestions([]);
      return;
    }

    const userAnswer = inputs.category1.replace(/\s/g, '');

    if (userAnswer.length !== examAnswers.length) {
      setErrors(prev => ({ ...prev, category1: '답안의 길이가 올바르지 않습니다' }));
      setScoreMessage(null);
      setIncorrectQuestions([]);
      return;
    }

    let minScore = 0;
    let maxScore = 0;
    let hasUncertainAnswer = false;
    const incorrectQuestionsArray: number[] = [];

    for (let i = 0; i < userAnswer.length; i++) {
      if (userAnswer[i] === '0') {
        hasUncertainAnswer = true;
        maxScore += examScores[i];
      } else if (userAnswer[i] === examAnswers[i]) {
        minScore += examScores[i];
        maxScore += examScores[i];
      } else {
        incorrectQuestionsArray.push(i + 1);
      }
    }

    const minCalculatedScore = Number(minScore.toFixed(2));
    const maxCalculatedScore = Number(maxScore.toFixed(2));
    
    if (hasUncertainAnswer) {
      setScoreMessage(`${minCalculatedScore}점 ~ ${maxCalculatedScore}점 / ${examMaxScore}점`);
    } else {      
      setScoreMessage(`${minCalculatedScore}점 / ${examMaxScore}점`);
    }
    
    setErrors(prev => ({ ...prev, category1: '' }));
    setIncorrectQuestions(incorrectQuestionsArray);
  }, [selectedSubject, selectedExam, inputs.category1, subjectsInfo]);

  const handleSubjectChange = useCallback((value: string) => {
    setSelectedSubject(value);
    setScoreMessage(null);
    setErrors(prev => ({ ...prev, category1: '', performance: {}, written: {} }));
    setInputs(prev => ({ ...prev, category1: '', performance1: '', performance2: '', performance3: '', written1: '', written2: '' }));
    setIncorrectQuestions([]);
    setRawScoreMessage(null);
  }, []);

  const handleExamChange = useCallback((value: string) => {
    setSelectedExam(value);
    setScoreMessage(null);
    setErrors(prev => ({ ...prev, category1: '', performance: {}, written: {} }));
    setIncorrectQuestions([]);
    setRawScoreMessage(null);
  }, []);

  const calculateRawScore = useCallback(() => {
    if (!selectedSubject) {
      setErrors(prev => ({ ...prev, performance: { 1: '과목을 선택해주세요', 2: '', 3: '' }, written: { 1: '', 2: '' } }));
      setRawScoreMessage(null);
      return;
    }

    const subject = subjectsInfo.find(s => s.name === selectedSubject);
    if (!subject) {
      setErrors(prev => ({ ...prev, performance: { 1: '과목을 찾을 수 없습니다', 2: '', 3: '' }, written: { 1: '', 2: '' } }));
      setRawScoreMessage(null);
      return;
    }

    let totalScore = 0;
    let hasError = false;
    const newErrors: Errors = { category1: '', performance: {}, written: {} };

    subject.performanceAssessments.forEach((assessment, index) => {
      const score = parseFloat(inputs[`performance${index + 1}` as keyof typeof inputs]);
      const maxScore = subject.performanceMaxScores[index];
      if (isNaN(score)) {
        newErrors.performance[`${index + 1}`] = '점수를 입력해주세요';
        hasError = true;
      } else if (score > maxScore) {
        newErrors.performance[`${index + 1}`] = `해당 수행평가는 ${maxScore}점을 초과할 수 없습니다`;
        hasError = true;
      } else {
        totalScore += score;
      }
    });

    const written1 = parseFloat(inputs.written1);
    const written2 = parseFloat(inputs.written2);

    if (subject.hasFirstExam) {
      if (isNaN(written1)) {
        newErrors.written[1] = '점수를 입력해주세요';
        hasError = true;
      } else if (written1 > 100) {
        newErrors.written[1] = '지필평가는 100점을 초과할 수 없습니다';
        hasError = true;
      }
    }

    if (isNaN(written2)) {
      newErrors.written[2] = '점수를 입력해주세요';
      hasError = true;
    } else if (written2 > 100) {
      newErrors.written[2] = '지필평가는 100점을 초과할 수 없습니다';
      hasError = true;
    }

    if (hasError) {
      setErrors(prev => ({
        ...prev,
        performance: { ...prev.performance, ...newErrors.performance },
        written: { ...prev.written, ...newErrors.written }
      }));
      setRawScoreMessage(null);
      return;
    }

    // Calculate scores based on subject
    switch (subject.name) {
      case "독서":
      case "수학Ⅱ":
      case "영어Ⅱ":
      case "정치와 법":
      case "사회·문화":
        totalScore += (written1 * 3 / 10) + (written2 * 3 / 10);
        break;
      case "생활과 윤리":
      case "일본어Ⅰ":
      case "중국어Ⅰ":
        totalScore += (written2 * 4 / 10);
        break;
      case "화학Ⅰ":
        totalScore += (written1 * 2 / 10) + (written2 * 2 / 10);
        break;
      case "생명과학Ⅰ":
      case "지구과학Ⅰ":
        totalScore += (written1 * 25 / 100) + (written2 * 25 / 100);
        break;
    }

    const roundedTotalScore = Number(totalScore.toFixed(2));
    const roundedScore = Math.round(totalScore);

    setRawScoreMessage(`원점수: ${roundedScore}점 (${roundedTotalScore}점)`);
    setErrors(prev => ({ ...prev, performance: {}, written: {} }));
  }, [selectedSubject, inputs, subjectsInfo]);

  const examTypes = ["1차 지필평가", "2차 지필평가"]

  const dates = [
  { date: "-", subjects: ["-", "-", "-"] },
  { date: "-", subjects: ["-", "-", "-"] },
  { date: "-", subjects: ["-", "-", "-"] },
  { date: "-", subjects: ["-", "-", "-"] },
  { date: "-", subjects: ["-", "-", "-"] }
];

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-gray-800 flex justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen bg-white" aria-live="polite" aria-busy="true">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <main className="w-full max-w-[500px] px-4 py-6 bg-white shadow-lg mx-auto">
          <h1 className="text-xl font-bold text-center mb-6 py-2 border border-black rounded-lg shadow-sm">
            학업 지원 플랫폼
          </h1>
          
          <div className="mb-6 text-center">
            <div className="text-3xl font-bold text-primary">
              {daysLeft === 'Day' ? 'D-Day' : `D-${daysLeft}`}
            </div>
            <div className="text-sm text-gray-600">
              (개학식까지)
            </div>
          </div>

          <div className="mb-6 bg-gray-100 rounded-lg p-4">
            <div 
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={() => setIsTableExpanded(!isTableExpanded)}
            >
              <h2 className="text-lg font-semibold">일정표</h2>
              
              {isTableExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {isTableExpanded && (
              <div className="overflow-x-auto bg-white">
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    {dates.map((dateInfo, index) => (
                      <React.Fragment key={`row-${index}`}>
                        <tr>
                          <td className="border border-gray-300 p-2 text-center font-semibold" rowSpan={dateInfo.subjects.length + 1}>
                            {dateInfo.date}
                          </td>
                        </tr>
                        {dateInfo.subjects.map((subject, subjectIndex) => (
                          <tr key={`subject-${index}-${subjectIndex}`}>
                            <td className="border border-gray-300 p-2 text-left">
                              <div className="text-[11px] leading-tight">
                                {subject}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <Select onValueChange={handleSubjectChange}>
              <SelectTrigger className="w-[calc(50%-3.75rem)] min-w-[150px] border-black text-gray-800">
                <SelectValue placeholder="과목 선택" className="text-center" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {subjectsInfo.map((subject, index) => (
                  <SelectItem key={`subject-${index}`} value={subject.name}>{subject.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 p-3 border border-black rounded-md text-sm">
              {selectedSubject ? (
                <>
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    반영비율: {subjectsInfo.find(subject => subject.name === selectedSubject)?.ratio}
                  </p>
                </>
              ) : (
                <p className="text-center">과목을 선택해주세요</p>
              )}
            </div>
          </div>
          
          {selectedSubject && (
            <div className="space-y-4">
              <div className="border border-black rounded-lg p-3">
                <h2 className="text-lg font-semibold mb-2">지필평가 점수 계산기</h2>
                <hr className="border-t border-gray-400 mb-2" />
                <div className="space-y-2">
                  <Select onValueChange={handleExamChange}>
                    <SelectTrigger className="w-[106px] px-2 py-0 text-xs border-black text-gray-800 h-8">
                      <SelectValue placeholder="평가 선택" className="text-center" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto">
                      {examTypes.map((examType, index) => (
                        <SelectItem key={`exam-${index}`} value={examType} className="text-center">{examType}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    id="category1-input" 
                    name="category1"
                    value={inputs.category1}
                    onChange={handleInputChange}
                    placeholder="답안을 차례로 입력해주세요 (예: 12345..)" 
                    className="w-full text-xs text-gray-800 border-black" 
                  />
                  {errors.category1 && <p className="text-red-500 text-xs mt-1">{errors.category1}</p>}
                  <p className="text-xs text-gray-500 whitespace-nowrapoverflow-hidden text-ellipsis">불확실한 답안은 숫자 &apos;0&apos;으로 입력해주세요</p>
                  <button 
                    onClick={calculateScore}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    점수 계산하기
                  </button>
                  {scoreMessage && (
                    <p className="text-sm font-semibold">{scoreMessage}</p>
                  )}
                  {incorrectQuestions.length > 0 && (
                    <p className="text-sm text-orange-500">
                      틀린 문항: {incorrectQuestions.map(item => item.toString()).join(', ')}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="border border-black rounded-lg p-3">
                <h2 className="text-lg font-semibold mb-2">원점수 계산기</h2>
                <hr className="border-t border-gray-400 mb-2" />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-md font-semibold mb-2">수행평가 영역</h3>
                    {subjectsInfo.find(subject => subject.name === selectedSubject)?.performanceAssessments.map((assessment, index) => (
                      assessment && (
                        <div key={`performance-${index + 1}`} className="space-y-1 mb-2">
                          <Label htmlFor={`performance${index + 1}-input`} className="text-xs font-medium text-gray-800">
                            {assessment.replace('^?', '')}
                            {assessment.includes('^?') && <sup>?</sup>}
                          </Label>
                          <Input 
                            id={`performance${index + 1}-input`} 
                            name={`performance${index + 1}`}
                            value={inputs[`performance${index + 1}` as keyof typeof inputs]}
                            onChange={handleInputChange}
                            placeholder={`수행평가 점수를 입력해주세요`} 
                            className="w-full text-xs text-gray-800 border-black" 
                          />
                          {errors.performance[index + 1] && (
                            <p className="text-red-500 text-xs mt-1">{errors.performance[index + 1]}</p>
                          )}
                        </div>
                      )
                    ))}
                    <p className="text-xs text-gray-500 mt-2"><sup>?</sup> 정확하지 않은 평가명</p>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold mb-2">지필평가 영역</h3>
                    {subjectsInfo.find(subject => subject.name === selectedSubject)?.hasFirstExam ? (
                      <>
                        {[1, 2].map((item) => (
                          <div  key={`written-${item}`} className="space-y-1 mb-2">
                            <Label htmlFor={`written${item}-input`} className="text-xs font-medium text-gray-800">
                              {item}차 지필평가 (100점)
                            </Label>
                            <Input 
                              id={`written${item}-input`} 
                              name={`written${item}`}
                              value={inputs[`written${item}` as keyof typeof inputs]}
                              onChange={handleInputChange}
                              placeholder={`지필평가 점수를 입력해주세요`} 
                              className="w-full text-xs text-gray-800 border-black" 
                            />
                            {errors.written[item] && (
                              <p className="text-red-500 text-xs mt-1">{errors.written[item]}</p>
                            )}
                          </div>
                        ))}
                      </>
                    ) : (
                      <div key="written-2" className="space-y-1 mb-2">
                        <Label htmlFor="written2-input" className="text-xs font-medium text-gray-800">
                          2차 지필평가 (100점)
                        </Label>
                        <Input 
                          id="written2-input" 
                          name="written2"
                          value={inputs.written2}
                          onChange={handleInputChange}
                          placeholder="지필평가 점수를 입력해주세요"
                          className="w-full text-xs text-gray-800 border-black" 
                        />
                        {errors.written[2] && (
                          <p className="text-red-500 text-xs mt-1">{errors.written[2]}</p>
                        )}
                      </div>
                    )}
                    <button 
                      onClick={calculateRawScore}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors mt-2"
                    >
                      점수 계산하기
                    </button>
                    {rawScoreMessage && (
                      <p className="text-sm font-semibold mt-2 whitespace-pre-line">{rawScoreMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        <p className="text-xs text-gray-600 text-center mt-2 mb-1">
          입력된 정보는 이외의 용도로 수집·이용되지 않습니다
        </p>
        <p className="text-xs text-gray-600 text-center">
          v1.4.3, 2025-01-14
        </p>
        </main>
      )}
    </div>
  )
}
