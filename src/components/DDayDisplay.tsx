import { ChevronLeft, ChevronRight } from 'lucide-react'

type DDayDisplayProps = {
  daysLeft: Array<{ days: number; label: string; isDDay: boolean }>
  currentDdayIndex: number
  setCurrentDdayIndex: React.Dispatch<React.SetStateAction<number>>
}

export const DDayDisplay = ({ daysLeft, currentDdayIndex, setCurrentDdayIndex }: DDayDisplayProps) => (
  <div className="mb-6 text-center relative">
    <div className="flex justify-center items-center">
      <button
        onClick={() => setCurrentDdayIndex((prev) => (prev - 1 + daysLeft.length) % daysLeft.length)}
        className="p-2 mx-10 text-gray-400 hover:text-gray-600"
      >
        <ChevronLeft size={20} />
      </button>
      <div>
        <div className="text-3xl font-bold text-primary">
          {daysLeft[currentDdayIndex]?.isDDay
            ? "D-Day"
            : daysLeft[currentDdayIndex]?.days > 0
              ? `D-${daysLeft[currentDdayIndex]?.days}`
              : `D+${Math.abs(daysLeft[currentDdayIndex]?.days)}`}
        </div>
        <div className="text-sm text-gray-600">{daysLeft[currentDdayIndex]?.label}</div>
      </div>
      <button
        onClick={() => setCurrentDdayIndex((prev) => (prev + 1) % daysLeft.length)}
        className="p-2 mx-10 text-gray-400 hover:text-gray-600"
      >
        <ChevronRight size={20} />
      </button>
    </div>
    <div className="flex justify-center mt-2">
      {daysLeft.map((_, index) => (
        <div
          key={index}
          className={`w-1.5 h-1.5 rounded-full mx-1 ${index === currentDdayIndex ? "bg-blue-500" : "bg-gray-300"}`}
        />
      ))}
    </div>
  </div>
)
