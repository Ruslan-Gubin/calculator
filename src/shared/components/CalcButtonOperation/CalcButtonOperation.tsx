
import styles from './CalcButtonOperation.module.scss';

interface ICalcButtonOperation {
  value: number | string;
  active?: boolean;
  onClick: (value: string | number) => void;
}

const CalcButtonOperation = ({value, active, onClick}: ICalcButtonOperation) => {

  return (
    <>
    {!active ?
    <button 
    onClick={() => onClick(value)}
    style={value === '0' ? {width: '152px'} : {width: ''}}
    className={styles.button}
    >
      {value}
    </button>
    :
    <div 
    onClick={() => {}}
    style={value === '0' ? {width: '152px'} : {width: ''}}
    className={styles.button__active}
    >
      {value}
    </div>
    }
      </>
  );
};

export { CalcButtonOperation };