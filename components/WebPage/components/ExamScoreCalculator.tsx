import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { examTypes } from '../constants'
import { Inputs, Errors } from '../types'

type ExamScoreCalculatorProps = {
  selectedExam: string | null
  handleExamChange: (value: string) => void
  inputs: Inputs
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: Errors
  calculateScore: () => void
  scoreMessage: string | null
  incorrectQuestions: number[]
}

export const ExamScoreCalculator = ({
  selectedExam,
  handleExamChange,
  inputs,
  handleInputChange,
  errors,
  calculateScore,
  scoreMessage,
  incorrectQuestions,
}: ExamScoreCalculatorProps) => (
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
            <SelectItem key={`exam-${index}`} value={examType} className="text-center">
              {examType}
            </SelectItem>
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
      <p className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
        불확실한 답안은 숫자 '0'으로 입력해주세요
      </p>
      <button
        onClick={calculateScore}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        점수 계산하기
      </button>
      {scoreMessage && <p className="text-sm font-semibold">{scoreMessage}</p>}
      {incorrectQuestions.length > 0 && (
        <p className="text-sm text-orange-500">
          틀린 문항: {incorrectQuestions.map((item) => item.toString()).join(", ")}
        </p>
      )}
    </div>
  </div>
)