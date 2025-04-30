export type SubjectInfo = {
    name: string
    ratio: string
    hasFirstExam: boolean
    performanceAssessments: string[]
    firstExamAnswers: string
    firstExamScores: number[]
    firstExamMaxScore: number
    performanceMaxScores: number[]
    secondExamAnswers: string
    secondExamScores: number[]
    secondExamMaxScore: number
  }
  
  export type Errors = {
    category1: string
    performance: { [key: string]: string }
    written: { [key: string]: string }
  }
  
  export type TargetDateInfo = {
    date: Date
    label: string
    dDayDuration?: number
  }
  
  export type Inputs = {
    category1: string
    performance1: string
    performance2: string
    performance3: string
    written1: string
    written2: string
  }
