import { calculatorIcons } from "../../constants/calculatorIcons";

import styles from "./CalculatorCanvasNoContent.module.scss";

const CalculatorCanvasNoContent = () => {
  return (
    <figure className={styles.root}>
      <img className={styles.img} src={calculatorIcons.area} alt="Icon area" />
      <figcaption className={styles.figcaption}>
        <strong className={styles.title}>Перетащите сюда</strong>
        <p className={styles.text}>любой элемент из левой панели</p>
      </figcaption>
    </figure>
  );
};

export { CalculatorCanvasNoContent };
