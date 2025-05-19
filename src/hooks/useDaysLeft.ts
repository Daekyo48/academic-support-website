"use client"

import { useState, useEffect, useCallback } from 'react'
import { TargetDateInfo } from '../types'

export const useDaysLeft = () => {
  const [daysLeft, setDaysLeft] = useState<Array<{ days: number; label: string; isDDay: boolean }>>([])
  const [currentDdayIndex, setCurrentDdayIndex] = useState(0)

  const calculateDaysLeft = useCallback(() => {
    const today = new Date()
    const targetDates: TargetDateInfo[] = [
      { date: new Date(2025, 4, 23), label: "현장체험학습", dDayDuration: 1 },
      { date: new Date(2025, 5, 4), label: "대수능모의평가", dDayDuration: 1 },
      { date: new Date(2025, 5, 30), label: "2차 지필평가", dDayDuration: 5 },
      { date: new Date(2025, 6, 18), label: "여름방학식", dDayDuration: 1 },
      { date: new Date(2025, 10, 13), label: "대학수학능력시험", dDayDuration: 1 },
    ]

    return targetDates
      .map(({ date, label, dDayDuration = 1 }) => {
        const timeDiff = date.getTime() - today.getTime()
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24))
        const isDDay = daysLeft <= 0 && daysLeft > -dDayDuration
        return { days: daysLeft, label, isDDay }
      })
      .filter(({ days, isDDay }) => days >= 0 || isDDay)
  }, [])

  useEffect(() => {
    const updateDaysLeft = () => {
      const newDaysLeft = calculateDaysLeft()
      if (newDaysLeft.length > 0) {
        setDaysLeft(newDaysLeft)
        setCurrentDdayIndex(0)
      } else {
        setDaysLeft([])
      }
    }
    updateDaysLeft()
    const timer = setInterval(updateDaysLeft, 1000 * 60 * 60 * 24)
    return () => clearInterval(timer)
  }, [calculateDaysLeft])

  return { daysLeft, currentDdayIndex, setCurrentDdayIndex }
}