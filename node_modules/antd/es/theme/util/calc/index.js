import CSSCalculator from './CSSCalculator';
import NumCalculator from './NumCalculator';
const genCalc = type => {
  const Calculator = type === 'css' ? CSSCalculator : NumCalculator;
  return num => new Calculator(num);
};
export default genCalc;