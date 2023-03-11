import { FC } from 'react';
import { useCalculatorContext } from '../../../features/Calculator/lib';
import { CalcButtonOperation, CalculatorBlockWrapper } from '../..';
import { checkBlockId } from '../../../features/Calculator/lib/helpers/checkBlockId';

import styles from './CalculatorOperations.module.scss';

interface ICalculatorOperations {

} 

const CalculatorOperations: FC<ICalculatorOperations> = ({ }) => {
  const { handlePushNumber, blocksCanvas, calculatorState } = useCalculatorContext()
  const id = 2

  const operators: string[] = ['/','x','-','+',]
 
  return (
    <CalculatorBlockWrapper active={!checkBlockId(blocksCanvas, id)}>
      <ul className={styles.button__container}>
        {operators.map(operator => (
          <li key={operator} className={styles.button__item}>
      <CalcButtonOperation 
      active={calculatorState.active !== 'runtime'} 
      onClick={(value) => handlePushNumber(String(value))} value={operator}
      />
        </li>
          ))}
      </ul>
    </CalculatorBlockWrapper>
  );
};

export { CalculatorOperations };