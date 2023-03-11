import { createContext, useContext } from "react";
import { ICalculatorContext } from "../types/ICalculatorContext";


const CalculatorContext = createContext<ICalculatorContext | null>(null)

const useCalculatorContext = () => {
  const context = useContext(CalculatorContext)

  if (!context) {
    throw new Error('Can not useCalculatorContext outside of the CalculatorContext')
  }

  return context
}

export { CalculatorContext, useCalculatorContext }