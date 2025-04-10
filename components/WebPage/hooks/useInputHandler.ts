"use client"

import { useState, ChangeEvent } from 'react'
import { Errors, Inputs } from '../types'

export const useInputHandler = () => {
  const [inputs, setInputs] = useState<Inputs>({
    category1: "",
    performance1: "",
    performance2: "",
    performance3: "",
    written1: "",
    written2: "",
  })
  const [errors, setErrors] = useState<Errors>({
    category1: "",
    performance: {},
    written: {},
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "category1") {
      if (/^[\d\s]*$/.test(value)) {
        setInputs((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, category1: "" }))
      } else {
        setErrors((prev) => ({ ...prev, category1: "숫자 또는 공백만 입력 가능합니다" }))
      }
    } else if (name.startsWith("performance")) {
      const index = Number.parseInt(name.replace("performance", ""))
      if (/^\d*$/.test(value)) {
        setInputs((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, performance: { ...prev.performance, [index]: "" } }))
      } else {
        setErrors((prev) => ({ ...prev, performance: { ...prev.performance, [index]: "숫자만 입력 가능합니다" } }))
      }
    } else if (name.startsWith("written")) {
      const index = Number.parseInt(name.replace("written", ""))
      if (/^\d*\.?\d*$/.test(value)) {
        setInputs((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, written: { ...prev.written, [index]: "" } }))
      } else {
        setErrors((prev) => ({ ...prev, written: { ...prev.written, [index]: "숫자 또는 소수점만 입력 가능합니다" } }))
      }
    }
  }

  return { inputs, setInputs, errors, setErrors, handleInputChange }
}