import { FC } from "react";

import styles from "./CalculatorHeaderButton.module.scss";

interface ICalculatorHeaderButton {
  onClick: () => void;
  active: boolean;
  icon: string;
  text: string;
}

const CalculatorHeaderButton: FC<ICalculatorHeaderButton> = ({
  active,
  onClick,
  icon,
  text,
}) => {
  return (
    <button
      onClick={onClick}
      className={active ? `${styles.button} ${styles.active}` : styles.button}
    >
      <figure className={styles.button__content}>
        <img
          src={icon}
          className={styles.button__icon}
          alt="Icon button content"
        />
        <figcaption>{text}</figcaption>
      </figure>
    </button>
  );
};

export { CalculatorHeaderButton };
