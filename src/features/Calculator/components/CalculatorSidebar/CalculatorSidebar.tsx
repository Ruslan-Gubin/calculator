import { DragEvent, FC } from "react";
import { useCalculatorContext } from "../../lib";
import { ICalculatorBlocks } from "../../lib/types/ICalculatorBlocks";

import styles from './CalculatorSidebar.module.scss';


const CalculatorSidebar: FC = () => {
  const { calculatorState, calculatorBlocks, blocksCanvas ,setCurrentBlock, currentBlock} = useCalculatorContext()

  const checkBlock = (id: number) => {
    return blocksCanvas.some(item => item.id === id)
  }

  const handleDragStart = (e: DragEvent<HTMLLIElement>, block: ICalculatorBlocks) => {
    setCurrentBlock(block)
  }

  return (
    <section>
    {calculatorState.active === 'constructor' &&
    <ul>
      {calculatorBlocks.map(block => (
        <li 
        onDragStart={(e) => handleDragStart(e, block) }
        className={styles.block__item}
        draggable={!checkBlock(block.id)} 
        key={block.id}
        style={blocksCanvas.some(item => item.id === block.id) ? {opacity: '50%', cursor: 'default'} : {opacity: '100%'}}
        >
        {block.component}
        </li>
      ))}
    </ul> 
    }
      </section>
  );
};

export { CalculatorSidebar };

