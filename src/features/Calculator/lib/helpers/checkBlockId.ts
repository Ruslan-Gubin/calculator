import { ICalculatorBlocks } from "../types/ICalculatorBlocks";

const checkBlockId = (arr: ICalculatorBlocks[], id: number) => {
  return arr.some((item) => item.id === id);
};

export { checkBlockId };
