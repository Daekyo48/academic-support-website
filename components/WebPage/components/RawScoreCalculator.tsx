import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubjectInfo, Inputs, Errors } from '../types'

type RawScoreCalculatorProps = {
  selectedSubject: string | null
  subjectsInfo: SubjectInfo[]
  inputs: Inputs
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: Errors
  calculateRawScore: () => void
  rawScoreMessage: string | null
}

export const RawScoreCalculator = ({
  selectedSubject,
  subjectsInfo,
  inputs,
  handleInputChange,
  errors,
  calculateRawScore,
  rawScoreMessage,
}: RawScoreCalculatorProps) => {
  const subject = subjectsInfo.find((s) => s.name === selectedSubject)

  return (
    <div className="border border-black rounded-lg p-3">
      <h2 className="text-lg font-semibold mb-2">원점수 계산기</h2>
      <hr className="border-t border-gray-400 mb-2" />
      <div className="space-y-3">
        <div>
          <h3 className="text-md font-semibold mb-2">수행평가 영역</h3>
          {subject?.performanceAssessments.map((assessment, index) => (
            <div key={`performance-${index + 1}`} className="space-y-1 mb-2">
              <Label
                htmlFor={`performance${index + 1}-input`}
                className="text-xs font-medium text-gray-800"
              >
                {assessment.replace("^?", "")}
                {assessment.includes("^?") && <sup>?</sup>}
              </Label>
              <Input
                id={`performance${index + 1}-input`}
                name={`performance${index + 1}`}
                value={inputs[`performance${index + 1}` as keyof Inputs]}
                onChange={handleInputChange}
                placeholder="수행평가 점수를 입력해주세요"
                className="w-full text-xs text-gray-800 border-black"
              />
              {errors.performance[index + 1] && (
                <p className="text-red-500 text-xs mt-1">{errors.performance[index + 1]}</p>
              )}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">지필평가 영역</h3>
          {subject?.hasFirstExam ? (
            <>
              {[1, 2].map((item) => (
                <div key={`written-${item}`} className="space-y-1 mb-2">
                  <Label htmlFor={`written${item}-input`} className="text-xs font-medium text-gray-800">
                    {item}차 지필평가 (100점)
                  </Label>
                  <Input
                    id={`written${item}-input`}
                    name={`written${item}`}
                    value={inputs[`written${item}` as keyof Inputs]}
                    onChange={handleInputChange}
                    placeholder="지필평가 점수를 입력해주세요"
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
              {errors.written[2] && <p className="text-red-500 text-xs mt-1">{errors.written[2]}</p>}
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
  )
}