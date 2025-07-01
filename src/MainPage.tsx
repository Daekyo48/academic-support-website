"use client"

import { useState, useEffect } from 'react'
import { useDaysLeft } from './hooks/useDaysLeft'
import { useInputHandler } from './hooks/useInputHandler'
import { useScoreCalculator } from './hooks/useScoreCalculator'
import { DDayDisplay } from './components/DDayDisplay'
import { ScheduleTable } from './components/ScheduleTable'
import { SubjectSelector } from './components/SubjectSelector'
import { ExamScoreCalculator } from './components/ExamScoreCalculator'
import { RawScoreCalculator } from './components/RawScoreCalculator'
import { subjectsInfo } from './constants'

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  const { daysLeft, currentDdayIndex, setCurrentDdayIndex } = useDaysLeft()
  const { inputs, setInputs, errors, setErrors, handleInputChange } = useInputHandler()
  const {
    scoreMessage,
    rawScoreMessage,
    incorrectQuestions,
    calculateScore,
    calculateRawScore,
    setScoreMessage,
    setRawScoreMessage,
    setIncorrectQuestions,
  } = useScoreCalculator(subjectsInfo, selectedSubject, selectedExam, inputs, setErrors)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value)
    setScoreMessage(null)
    setRawScoreMessage(null)
    setErrors({ category1: "", performance: {}, written: {} })
    setInputs({
      category1: "",
      performance1: "",
      performance2: "",
      performance3: "",
      written1: "",
      written2: "",
    })
    setIncorrectQuestions([])
  }

  const handleExamChange = (value: string) => {
    setSelectedExam(value)
    setScoreMessage(null)
    setRawScoreMessage(null)
    setErrors({ category1: "", performance: {}, written: {} })
    setIncorrectQuestions([])
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-gray-800 flex justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen bg-white" aria-live="polite" aria-busy="true">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <main className="w-full max-w-[500px] px-4 py-6 bg-white shadow-lg mx-auto">
          <h1 className="text-xl font-bold text-center mb-6 py-2 border border-black rounded-lg shadow-sm">
            학업 보조 웹사이트
          </h1>

          {daysLeft.length > 0 ? (
            <DDayDisplay
              daysLeft={daysLeft}
              currentDdayIndex={currentDdayIndex}
              setCurrentDdayIndex={setCurrentDdayIndex}
            />
          ) : (
            <p className="text-center text-gray-600 mb-6">디데이가 없습니다</p>
          )}

          <ScheduleTable />
          <SubjectSelector
            subjectsInfo={subjectsInfo}
            selectedSubject={selectedSubject}
            handleSubjectChange={handleSubjectChange}
          />

          {selectedSubject && (
            <div className="space-y-4">
              <ExamScoreCalculator
                selectedExam={selectedExam}
                handleExamChange={handleExamChange}
                inputs={inputs}
                handleInputChange={handleInputChange}
                errors={errors}
                calculateScore={calculateScore}
                scoreMessage={scoreMessage}
                incorrectQuestions={incorrectQuestions}
              />
              <RawScoreCalculator
                selectedSubject={selectedSubject}
                subjectsInfo={subjectsInfo}
                inputs={inputs}
                handleInputChange={handleInputChange}
                errors={errors}
                calculateRawScore={calculateRawScore}
                rawScoreMessage={rawScoreMessage}
              />
            </div>
          )}

          <p className="text-xs text-gray-600 text-center mt-2 mb-1 leading-relaxed">
            입력된 정보는 이외의 용도로 수집·이용되지 않습니다<br />
            v2.1.2, 2025-07-01
          </p>
        </main>
      )}
    </div>
  )
}
