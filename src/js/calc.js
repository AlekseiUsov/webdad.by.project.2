const calc = document.querySelector('.calc__inner');
const result = document.querySelector('#calc__input');
const symbols = ['-', '+', '/', '*'];
const symbolsForReset = ['/', '*', '+'];
const priotirySymbols = ['/', '*'];
const notPriotirySymbols = ['-', '+'];


const mathOperations = (num1,num2,operator) => {
    let mathResult;
    const numberOne = Number(num1);
    const numberTwo = Number(num2);

    switch (operator) {
      case '-':
        mathResult = numberOne - numberTwo;
        break;

      case '*':
        mathResult =  numberOne * numberTwo;
        break;

      case '+':
        mathResult = numberOne + numberTwo;
        break;

      case '/': 
       mathResult =  numberOne / numberTwo;
        break;

      default: return;
    }
    return mathResult;
  };

const preptData = (data) => {
  let result = '';
  for (let i = 0; i < data.length; i += 1) {
    let last = data[i - 1];
    let current = data[i];
    let next = data[i + 1];

    if (isNaN(Number(last)) && current  === '-' && !isNaN(Number(next))) {
      result += `-${next}`;
      i += 1;
    }
    if (!isNaN(Number(last)) && symbols.includes(current) && !isNaN(Number(next))) {
      result += ` ${current} `;
    }
    if (!symbols.includes(current)) {
      result += `${current}`;
    }
  }
  return result;
}

const operationData = (data) => {
  const preptedData = preptData(data);
  let array = preptedData.split(' ');

  for (let i = 0; i < array.length; i += 1) {
    let last = array[i - 1];
    let next = array[i + 1];
    let current = array[i];

    const lastIndex = i - 1;
    const result = mathOperations(last,next,current);
    const requirement = array.some(r => priotirySymbols.includes(r));

    if (priotirySymbols.includes(current)) {
         array.splice(lastIndex,3,result);
         return operationData(array.join(''));
     }
     if (!requirement) {
      if (notPriotirySymbols.includes(current)) {
        array.splice(lastIndex,3,result);
        return operationData(array.join(''));
      }
     }
   }
   return array.join(''); 
}

const calcFunction = (event) => {
    if (event.target.classList.contains('calc__item')) {
      const value = event.target.innerHTML;
      result.value += symbolsForReset.includes(value) && result.value === '' ? '' : value;
    }
    if (event.target.classList.contains('calc__equally')) {
      result.value = operationData(result.value);
    }
    if (event.target.classList.contains('calc__delete')) {
      result.value = result.value.slice(0, -1); 
    }
    if (event.target.classList.contains('calc__reset')) {
      result.value = '';
    }
}

calc.addEventListener('click', calcFunction);