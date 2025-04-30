"use client"

import { useState, useCallback } from 'react'
import { SubjectInfo, Errors } from '../types'
import { calculateExamScore, calculateRawScore as calcRawScore } from '../utils/scoreUtils'

export const useScoreCalculator = (
  subjectsInfo: SubjectInfo[],
  selectedSubject: string | null,
  selectedExam: string | null,
  inputs: any,
  setErrors: React.Dispatch<React.SetStateAction<Errors>>
) => {
  const [scoreMessage, setScoreMessage] = useState<string | null>(null)
  const [rawScoreMessage, setRawScoreMessage] = useState<string | null>(null)
  const [incorrectQuestions, setIncorrectQuestions] = useState<number[]>([])

  const calculateScore = useCallback(() => {
    const result = calculateExamScore(subjectsInfo, selectedSubject, selectedExam, inputs.category1)
    setErrors((prev: Errors) => ({ ...prev, category1: result.error || "" }))
    setScoreMessage(result.scoreMessage)
    setIncorrectQuestions(result.incorrectQuestions)
  }, [subjectsInfo, selectedSubject, selectedExam, inputs.category1, setErrors])

  const calculateRawScore = useCallback(() => {
    const result = calcRawScore(subjectsInfo, selectedSubject, inputs)
    setErrors((prev: Errors) => ({
      ...prev,
      performance: result.performanceErrors || {},
      written: result.writtenErrors || {},
    }))
    setRawScoreMessage(result.rawScoreMessage)
  }, [subjectsInfo, selectedSubject, inputs, setErrors])

  return {
    scoreMessage,
    rawScoreMessage,
    incorrectQuestions,
    calculateScore,
    calculateRawScore,
    setScoreMessage,
    setRawScoreMessage,
    setIncorrectQuestions,
  }
}