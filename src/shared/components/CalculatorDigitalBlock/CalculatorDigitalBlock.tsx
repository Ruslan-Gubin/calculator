import { FC } from 'react';
import { useCalculatorContext } from '../../../features/Calculator/lib';
import { CalcButtonOperation, CalculatorBlockWrapper } from '../..';
import { checkBlockId } from '../../../features/Calculator/lib/helpers/checkBlockId';

import styles from './CalculatorDigitalBlock.module.scss';


const CalculatorDigitalBlock: FC = ({ }) => {
  const { handlePushNumber, blocksCanvas, calculatorState } = useCalculatorContext()
  const id = 3


  const numbers: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0' , ',']

  return (
    <CalculatorBlockWrapper active={!checkBlockId(blocksCanvas, id)}>
      <ul className={styles.button__container}>
        {numbers.map(operator => (
          <li key={operator} className={styles.button__item}>
      <CalcButtonOperation 
      onClick={(value) => handlePushNumber(String(value))} 
      active={calculatorState.active !== 'runtime'} 
      value={operator} 
      />
        </li>
          ))}
      </ul>
    </CalculatorBlockWrapper>
  );
};

export { CalculatorDigitalBlock };