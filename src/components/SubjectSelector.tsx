import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { SubjectInfo } from '../types'

type SubjectSelectorProps = {
  subjectsInfo: SubjectInfo[]
  selectedSubject: string | null
  handleSubjectChange: (value: string) => void
}

export const SubjectSelector = ({ subjectsInfo, selectedSubject, handleSubjectChange }: SubjectSelectorProps) => (
  <div className="mb-6">
    <Select onValueChange={handleSubjectChange}>
      <SelectTrigger className="w-[calc(50%-3.75rem)] min-w-[150px] border-black text-gray-800">
        <SelectValue placeholder="과목 선택" className="text-center" />
      </SelectTrigger>
      <SelectContent className="max-h-[200px] overflow-y-auto">
        {subjectsInfo.map((subject, index) => (
          <SelectItem key={`subject-${index}`} value={subject.name}>
            {subject.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <div className="mt-2 p-3 border border-black rounded-md text-sm">
      {selectedSubject ? (
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          반영비율: {subjectsInfo.find((subject) => subject.name === selectedSubject)?.ratio}
        </p>
      ) : (
        <p className="text-center">과목을 선택해주세요</p>
      )}
    </div>
  </div>
)
