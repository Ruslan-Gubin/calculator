import { useState } from "react";
import { CalculatorContext } from "./lib";
import { CalculatorHeader } from "./components/CalculatorHeader";
import { ICalculatorState } from "./lib/types/ICalculatorState";
import { IDisplayNumber } from "./lib/types/IDisplayNumber";
import { CalculatorSidebar } from "./components/CalculatorSidebar";
import { CalculatorCanvas } from "./components/CalculatorCanvas/CalculatorCanvas";
import * as shared from "../../shared";
import { ICalculatorBlocks } from "./lib/types/ICalculatorBlocks";
import { roundBigString } from "./lib/helpers/roundBigString";

import styles from "./lib/styles/Calculator.module.scss";

const Calculator = () => {
  const [calculatorState, setCalculatorState] = useState<ICalculatorState>({
    active: "constructor",
    activeNumber: false,
  });
  const [calculatorBlocks] = useState<ICalculatorBlocks[]>([
    { id: 1, place: "aside", component: <shared.CalculatorDisplay /> },
    { id: 2, place: "aside", component: <shared.CalculatorOperations /> },
    { id: 3, place: "aside", component: <shared.CalculatorDigitalBlock /> },
    { id: 4, place: "aside", component: <shared.CalculatorEqualBlock /> },
  ]);
  const [blocksCanvas, setBlocksCanvas] = useState<ICalculatorBlocks[]>([]);
  const [currentBlock, setCurrentBlock] = useState<ICalculatorBlocks | null>(
    null
  );
  const [displayNumer, setDisplayNumber] = useState<IDisplayNumber>({
    firstNumber: [],
    operator: "",
    secondNumber: [],
  });

  const [textDisplay, setTextDisplay] = useState("0");
  const [stageCalculator, setStageCalculator] = useState<
    "firstNum" | "secondNum"
  >("firstNum");

  const handleCalculerotState = (value: "runtime" | "constructor") => {
    setCalculatorState((prev) => ({ ...prev, active: value }));
    setTextDisplay('0')
    setDisplayNumber(() => ({firstNumber: [], operator: '', secondNumber: []}))
  };

  const handlePushNumber = (value: string) => {
    setCalculatorState((prev) => ({ ...prev, activeNumber: true }));

    if (value === "=") {
      handleResult();
      setStageCalculator("firstNum");
    }
    
    if (value === '-' || value === '+'|| value === 'x'|| value === '/') {
      if (displayNumer.firstNumber.length === 0) {
        return
      }
      handleOperation(value);
      return;
    }

    if (value === ",") {
      value = ".";
    }

    if (
      stageCalculator === "secondNum" &&
      displayNumer.operator &&
      displayNumer.secondNumber.length < 10
    ) {
      if (value === '.' && displayNumer.secondNumber.some(item => item === '.')){
        return
      }
      setDisplayNumber((prev) => ({
        ...prev,
        secondNumber: [...displayNumer.secondNumber, value],
      }));
      setTextDisplay([...displayNumer.secondNumber, value].join(""));
    }

    if (
      stageCalculator === "firstNum" &&
      displayNumer.firstNumber.length < 10
    ) {
      

      if (value === '.' && displayNumer.firstNumber.some(item => item === '.')){
        return
      }
      setDisplayNumber((prev) => ({
        ...prev,
        firstNumber: [...displayNumer.firstNumber, value],
      }));
      setTextDisplay([...displayNumer.firstNumber, value].join(""));
    } else {
      return;
    }
  };

  const handleOperation = (value: string) => {
    if (displayNumer.secondNumber.length === 0) {
      setDisplayNumber((prev) => ({ ...prev, operator: value }));
      setStageCalculator("secondNum");
    }
  };

  const handleResult = () => {
    const operator = displayNumer.operator;
    const firstNum = Number(displayNumer.firstNumber.join(""));
    const secondNum = Number(displayNumer.secondNumber.join(""));
    let result;

    if (secondNum === 0 && operator === "/") {
      setTextDisplay("Не определено");
      setDisplayNumber(() => ({
        firstNumber: [],
        operator: "",
        secondNumber: [],
      }));
      setStageCalculator("firstNum");
    }

    if (!operator || !firstNum || !secondNum) {
      return;
    }

    switch (operator) {
      case "+":
        result = firstNum + secondNum;
        break;
      case "-":
        result = firstNum - secondNum;
        break;
      case "x":
        result = firstNum * secondNum;
        break;
      case "/":
        result = firstNum / secondNum;
        break;
    }

    if (Number.isSafeInteger(result) === false && !result?.toString().split('').some(item => item === '.')) {
      if (result) {
        result = roundBigString(String(result))
      }
    }

    setDisplayNumber(() => ({
      firstNumber: [],
      operator: "",
      secondNumber: [],
    }));
    if (String(result).length > 18) {
      setTextDisplay("Не определено")
    }
    setTextDisplay(String(result));
    setStageCalculator("firstNum");
  };


  return (
    <CalculatorContext.Provider
      value={{
        textDisplay,
        setBlocksCanvas,
        setCurrentBlock,
        currentBlock,
        handleResult,
        calculatorBlocks,
        blocksCanvas,
        handlePushNumber,
        calculatorState,
        handleCalculerotState,
      }}
    >
      <div className={styles.root}>
        <CalculatorHeader />
        <section className={styles.content}>
          <CalculatorSidebar />
          <CalculatorCanvas />
        </section>
      </div>
    </CalculatorContext.Provider>
  );
};

export { Calculator };
