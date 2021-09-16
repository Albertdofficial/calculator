'use strict';
const calculatorDisplay = document.querySelector('h2');
const answerDisplay = document.querySelector('h1');
const valueKeys = document.querySelectorAll('.value');
const buttons = document.querySelectorAll('button');
const operatorKeys = document.querySelectorAll('.operator');
const equalSignBtn = document.querySelector('.equal-sign');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
let secondValue = 0;
let calculation;

///////////////////////////////
// Functions
function sendNumberValue(value) {
  //If current display value is 0, replace, if not add number
  const displayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent =
    displayValue === '0' ? value : displayValue + value;

  const str = calculatorDisplay.textContent.split(' ');
  const [first, op, second] = str;

  firstValue = +first;
  secondValue = +second;
}

function setOperator(operator) {
  operatorValue = operator;
  firstValue = calculation;
  if (calculation) {
    calculatorDisplay.textContent = calculation;
  }
}

function addDecimal() {
  calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}

function addOperator() {
  calculatorDisplay.textContent = `${calculatorDisplay.textContent} ${operatorValue} `;
}

function callDeleteBtn(deleteVal) {
  const str = calculatorDisplay.textContent;
  const arrStr = str.split('');
  arrStr.pop(arrStr.length);
  calculatorDisplay.textContent = arrStr.toString().replaceAll(',', '');
  console.log(arrStr);
}

function callResetBtn() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
  answerDisplay.textContent = '';
  calculation = 0;
}

buttons.forEach(button => {
  if (button.classList.contains('value')) {
    button.addEventListener('click', e => sendNumberValue(button.value));
  } else if (button.classList.contains('operator')) {
    button.addEventListener('click', () => {
      setOperator(button.value);
      addOperator();
    });
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', () => addDecimal());
  } else if (button.classList.contains('delete-btn')) {
    button.addEventListener('click', () => callDeleteBtn(button.value));
  } else if (button.classList.contains('reset-btn')) {
    button.addEventListener('click', () => {
      callResetBtn();
      console.log('RESET');
    });
  }
});

equalSignBtn.addEventListener('click', () => {
  if ((firstValue && secondValue) || firstValue == 0 || secondValue == 0) {
    switch (operatorValue) {
      case '/':
        calculation = firstValue / secondValue;
        break;
      case '-':
        calculation = firstValue - secondValue;
        break;
      case '+':
        calculation = firstValue + secondValue;
        break;
      case '*':
        calculation = firstValue * secondValue;
    }
    answerDisplay.textContent = calculation;
  }
});
