"use client"

import { useState } from 'react'
import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { dates } from '../constants'

export const ScheduleTable = () => {
  const [isTableExpanded, setIsTableExpanded] = useState(false)

  return (
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
                    <td
                      className="border border-gray-300 p-2 text-center font-semibold"
                      rowSpan={dateInfo.subjects.length + 1}
                    >
                      {dateInfo.date}
                    </td>
                  </tr>
                  {dateInfo.subjects.map((subject, subjectIndex) => (
                    <tr key={`subject-${index}-${subjectIndex}`}>
                      <td className="border border-gray-300 p-2 text-left">
                        <div className="text-[11px] leading-tight">{subject}</div>
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
  )
}
