import { FC, useState } from "react";
import { useCalculatorContext } from "../../lib";
import { ICalculatorBlocks } from "../../lib/types/ICalculatorBlocks";
import { CalculatorCanvasNoContent } from "../CalculatorCanvasNoContent";


import styles from "./CalculatorCanvas.module.scss";

const CalculatorCanvas: FC = () => {
  const { currentBlock, blocksCanvas, setBlocksCanvas, setCurrentBlock, calculatorState } = useCalculatorContext();
  const [hoverSection, setHoverSection] = useState(false);
  const [hoverItem, setHoverItem] = useState<number | null>(null);

  const handleRemoveBlock = (id: number) => {
    if (calculatorState.active === 'runtime') {
      return
    }
    setBlocksCanvas((prev) => prev.filter((item) => item.id !== id));
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (blocksCanvas.length === 0) {
      setHoverSection(true);
    }
  };
  const dragLealeSection = () => {
    setHoverSection(false);
  };

  const dropBlockSection = (
    block: ICalculatorBlocks
  ) => {
    setBlocksCanvas((prev) => [...prev, {...block, place: 'canvas'}]);
    setHoverSection(false);
    setCurrentBlock(null);
  };

  const dropBlockUlList = (
    e: React.DragEvent<HTMLElement>,
    block: ICalculatorBlocks
  ) => {
    if (blocksCanvas.some(item => item.id === block.id)) {
      return
    }
    if (e.currentTarget.className === "container") {
      if (block.id === 1) {
        setBlocksCanvas((prev) => [{...block, place: 'canvas'}, ...prev]);
        setHoverItem(null);
      } else {
        setBlocksCanvas((prev) => [...prev, {...block, place: 'canvas'} ]);
        setCurrentBlock(null);
      }
    }
  };

  const dropOverItem = (e: React.DragEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    if (e.currentTarget.id == "item") {
      setHoverItem(id);
    }
  };

  const dropLeaveItem = (e: React.DragEvent<HTMLElement>) => {
    setHoverItem(null);
  };

  const dropEndItem = () => {
    setHoverItem(null);
    setCurrentBlock(null);
  };

  const dropBlockItem = (
    e: React.DragEvent<HTMLElement>,
    block: ICalculatorBlocks
  ) => {
    e.stopPropagation();
    if (e.currentTarget.id === "container") {
      return;
    }
    if (blocksCanvas.some((item) => item.id == 1) && block.id === 1) {
      return;
    }

    if (!hoverItem) {
      return;
    }

    if (e.currentTarget.id === "item") {
      let currentIndex;
      blocksCanvas.forEach((item, index) => {
        if (item.id === hoverItem) {
          currentIndex = index;
        }
      });

      if (block.id === 1) {
        setBlocksCanvas((prev) => [ {...block, place: 'canvas'}, ...prev]);
        setHoverItem(null);
      } else {
        const copyCanvasBlocks = blocksCanvas;
        if (typeof currentIndex === "number") {
          const dropIndex = blocksCanvas.indexOf(block);
          if (dropIndex !== -1) {
            copyCanvasBlocks.splice(dropIndex, 1);
          }
          copyCanvasBlocks.splice(currentIndex + 1, 0, {...block, place: 'canvas'});
        }
        setBlocksCanvas(copyCanvasBlocks);
        setCurrentBlock(null);
        setHoverItem(null);
      }
    }
  };

  const dropStartItem = (
    block: ICalculatorBlocks
  ) => {
    setCurrentBlock(block);
  };

  return (
    <>
      {blocksCanvas.length === 0 ? (
        <section
          onDragLeave={() => dragLealeSection()}
          onDrop={() => currentBlock && dropBlockSection(currentBlock)}
          onDragOver={(e) => dragOverHandler(e)}
          className={
            hoverSection
              ? `${styles.calculator__canvas_container} ${styles.calculator__canvas_hover}`
              : styles.calculator__canvas_container
          }
        >
          <CalculatorCanvasNoContent />
        </section>
      ) : (
        <ul
          className="container"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => currentBlock && dropBlockUlList(e, currentBlock)}
        >
          {blocksCanvas.map((item) => (
            <li
              onDoubleClick={() => handleRemoveBlock(item.id)}
              id="item"
              onDragEnd={() => dropEndItem()}
              onDragLeave={(e) => dropLeaveItem(e)}
              onDragOver={(e) => dropOverItem(e, item.id)}
              onDrop={(e) => currentBlock && dropBlockItem(e, currentBlock)}
              onDragStart={() => dropStartItem(item)}
              draggable={calculatorState.active === 'constructor'}
              key={item.id}
            >
              {item.component}
              {item.id === hoverItem && (
                <div className={styles.hover__item}></div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { CalculatorCanvas };
