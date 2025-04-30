import { SubjectInfo, Errors } from '../types'

export const calculateExamScore = (
  subjectsInfo: SubjectInfo[],
  selectedSubject: string | null,
  selectedExam: string | null,
  userAnswer: string
) => {
  if (!selectedSubject || !selectedExam) {
    return { error: "과목과 평가를 선택해주세요", scoreMessage: null, incorrectQuestions: [] }
  }

  const subject = subjectsInfo.find((s) => s.name === selectedSubject)
  if (!subject) {
    return { error: "과목을 찾을 수 없습니다", scoreMessage: null, incorrectQuestions: [] }
  }

  const isFirstExam = selectedExam === "1차 지필평가"
  const examAnswers = isFirstExam ? subject.firstExamAnswers : subject.secondExamAnswers
  const examScores = isFirstExam ? subject.firstExamScores : subject.secondExamScores
  const examMaxScore = isFirstExam ? subject.firstExamMaxScore : subject.secondExamMaxScore

  if (!examAnswers || examAnswers.length === 0) {
    return { error: "평가가 존재하지 않습니다", scoreMessage: null, incorrectQuestions: [] }
  }

  const cleanedUserAnswer = userAnswer.replace(/\s/g, "")
  if (cleanedUserAnswer.length !== examAnswers.length) {
    return { error: "답안의 길이가 올바르지 않습니다", scoreMessage: null, incorrectQuestions: [] }
  }

  let minScore = 0
  let maxScore = 0
  let hasUncertainAnswer = false
  const incorrectQuestions: number[] = []

  for (let i = 0; i < cleanedUserAnswer.length; i++) {
    if (cleanedUserAnswer[i] === "0") {
      hasUncertainAnswer = true
      maxScore += examScores[i]
    } else if (cleanedUserAnswer[i] === examAnswers[i]) {
      minScore += examScores[i]
      maxScore += examScores[i]
    } else {
      incorrectQuestions.push(i + 1)
    }
  }

  const minCalculatedScore = Number(minScore.toFixed(2))
  const maxCalculatedScore = Number(maxScore.toFixed(2))
  const scoreMessage = hasUncertainAnswer
    ? `${minCalculatedScore}점 ~ ${maxCalculatedScore}점 / ${examMaxScore}점`
    : `${minCalculatedScore}점 / ${examMaxScore}점`

  return { error: "", scoreMessage, incorrectQuestions }
}

export const calculateRawScore = (subjectsInfo: SubjectInfo[], selectedSubject: string | null, inputs: any) => {
  if (!selectedSubject) {
    return {
      performanceErrors: { 1: "과목을 선택해주세요", 2: "", 3: "" },
      writtenErrors: { 1: "", 2: "" },
      rawScoreMessage: null,
    }
  }

  const subject = subjectsInfo.find((s) => s.name === selectedSubject)
  if (!subject) {
    return {
      performanceErrors: { 1: "과목을 찾을 수 없습니다", 2: "", 3: "" },
      writtenErrors: { 1: "", 2: "" },
      rawScoreMessage: null,
    }
  }

  let totalScore = 0
  let hasError = false
  const performanceErrors: { [key: string]: string } = {}
  const writtenErrors: { [key: string]: string } = {}

  subject.performanceAssessments.forEach((_, index) => {
    const score = Number.parseFloat(inputs[`performance${index + 1}`])
    const maxScore = subject.performanceMaxScores[index]
    if (isNaN(score)) {
      performanceErrors[`${index + 1}`] = "점수를 입력해주세요"
      hasError = true
    } else if (score > maxScore) {
      performanceErrors[`${index + 1}`] = `해당 수행평가는 ${maxScore}점을 초과할 수 없습니다`
      hasError = true
    } else {
      totalScore += score
    }
  })

  const written1 = Number.parseFloat(inputs.written1)
  const written2 = Number.parseFloat(inputs.written2)

  if (subject.hasFirstExam) {
    if (isNaN(written1)) {
      writtenErrors[1] = "점수를 입력해주세요"
      hasError = true
    } else if (written1 > 100) {
      writtenErrors[1] = "지필평가는 100점을 초과할 수 없습니다"
      hasError = true
    }
  }

  if (isNaN(written2)) {
    writtenErrors[2] = "점수를 입력해주세요"
    hasError = true
  } else if (written2 > 100) {
    writtenErrors[2] = "지필평가는 100점을 초과할 수 없습니다"
    hasError = true
  }

  if (hasError) {
    return { performanceErrors, writtenErrors, rawScoreMessage: null }
  }

  switch (subject.name) {
    case "화법과 작문":
    case "언어와 매체":
    case "영어독해와 작문":
    case "확률과 통계":
    case "미적분":
    case "동아시아사":
    case "경제":
      totalScore += (written1 * 3) / 10 + (written2 * 3) / 10
      break
    case "경제 수학":
    case "기하":
    case "물리학Ⅱ":
    case "화학Ⅱ":
    case "생명과학Ⅱ":
    case "지구과학Ⅱ":
    case "생활과 과학":
      totalScore += (written2 * 4) / 10
      break
    case "세계지리":
      totalScore += (written1 * 25) / 100 + (written2 * 25) / 100
      break
    case "윤리와 사상":
      totalScore += (written1 * 275) / 1000 + (written2 * 275) / 1000
      break
  }

  const roundedTotalScore = Number(totalScore.toFixed(2))
  const roundedScore = Math.round(totalScore)
  const rawScoreMessage = `원점수: ${roundedScore}점 (${roundedTotalScore}점)`

  return { performanceErrors: {}, writtenErrors: {}, rawScoreMessage }
}
