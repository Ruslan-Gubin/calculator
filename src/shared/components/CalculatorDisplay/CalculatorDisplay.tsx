import { useCalculatorContext } from "../../../features/Calculator/lib";
import { checkBlockId } from "../../../features/Calculator/lib/helpers/checkBlockId";
import { CalculatorBlockWrapper } from "../CalculatorBlockWrapper";

import styles from "./CalculatorDisplay.module.scss";


const CalculatorDisplay = () => {
  const { blocksCanvas, textDisplay } = useCalculatorContext()
  const id = 1

  const filterTextDisplay = () => {
    const result: string[] = []
    textDisplay.split('').forEach(item => {
      if (item === '.') {
      result.push(',')
      } else {
        result.push(item)
      }
    }) 
    if (result[0]===','){
      result.unshift('0')
    }
    return result.join('') 
  }

  return (
    <CalculatorBlockWrapper  active={!checkBlockId(blocksCanvas, id)}>
      <strong
      className={styles.content}
      style={textDisplay.length > 10 ? {fontSize: '19px'} : {fontSize: '36px'}}
      >
      { filterTextDisplay() }
      </strong>
    
    </CalculatorBlockWrapper>
  );
};

export { CalculatorDisplay };
