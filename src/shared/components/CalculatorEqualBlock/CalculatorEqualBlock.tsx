import { FC } from 'react';
import { useCalculatorContext } from '../../../features/Calculator/lib';
import { CalculatorBlockWrapper } from '../..';
import { checkBlockId } from '../../../features/Calculator/lib/helpers/checkBlockId';

import styles from './CalculatorEqualBlock.module.scss';

interface ICalculatorEqualBlock {

} 

const CalculatorEqualBlock: FC<ICalculatorEqualBlock> = ({}) => {
  const { blocksCanvas, handleResult } = useCalculatorContext()
  const id = 4

  return (
    <div>
    <CalculatorBlockWrapper active={!checkBlockId(blocksCanvas, id)}>
      {checkBlockId(blocksCanvas, id) ? 
      <button onClick={() => handleResult()} className={styles.button}>=</button>
      :  
      <div className={styles.button}>=</div>
    }
    </CalculatorBlockWrapper>
    </div>
  );
};

export { CalculatorEqualBlock };