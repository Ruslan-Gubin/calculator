import { ICalculatorBlocks } from "./ICalculatorBlocks";
import { ICalculatorState } from "./ICalculatorState";
import { IDisplayNumber } from "./IDisplayNumber";

interface ICalculatorContext {
  handlePushNumber: (value: string) => void
  calculatorState: ICalculatorState;
  handleCalculerotState: (value: "runtime" | "constructor") => void;
  calculatorBlocks: ICalculatorBlocks[]
  blocksCanvas: ICalculatorBlocks[]
  handleResult: () => void
  currentBlock: ICalculatorBlocks | null
  setCurrentBlock: React.Dispatch<React.SetStateAction<ICalculatorBlocks | null>>
  setBlocksCanvas: React.Dispatch<React.SetStateAction<ICalculatorBlocks[]>>
  textDisplay: string
}

export type { ICalculatorContext };
