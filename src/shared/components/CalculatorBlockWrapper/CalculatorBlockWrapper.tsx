import { FC } from "react";

import styles from "./CalculatorBlockWrapper.module.scss";

interface ICalculatorBlockWrapper {
  children: React.ReactNode;
  active: boolean;
}

const CalculatorBlockWrapper: FC<ICalculatorBlockWrapper> = ({ children, active }) => {
  
  return <section 
  className={active ? `${styles.root} ${styles.active}` : styles.root}
  >
  {children}
  </section>;
};

export { CalculatorBlockWrapper };
