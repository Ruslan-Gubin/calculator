import { useCalculatorContext } from "../../lib";
import { calculatorIcons } from "../../constants/calculatorIcons";
import { CalculatorHeaderButton } from "../../../../shared";

import styles from "./CalculatorHeader.module.scss";

const CalculatorHeader = () => {
  const { calculatorState, handleCalculerotState } = useCalculatorContext();

  return (
    <section className={styles.root}>
      <nav className={styles.nav__buttons}>
        <CalculatorHeaderButton
          text='Runtime'
          icon={calculatorState.active === 'runtime' ? calculatorIcons.eyeBlue : calculatorIcons.eye}
          active={calculatorState.active === "runtime"}
          onClick={() => handleCalculerotState("runtime")}
        />
        <CalculatorHeaderButton
          text="Constructor"
          icon={calculatorState.active === 'constructor' ? calculatorIcons.arrays  : calculatorIcons.arraysGray}
          active={calculatorState.active === "constructor"}
          onClick={() => handleCalculerotState("constructor")}
        />
      </nav>
    </section>
  );
};

export { CalculatorHeader };
