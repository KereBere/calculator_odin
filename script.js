const calculator = {
    displayValue:'0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}
function inputDigit(digit) {
    const displayValue = calculator.displayValue;
    const waitingForSecondOperand = calculator.waitingForSecondOperand;

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot){
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const displayValue = calculator.displayValue;
    const firstOperand = calculator.firstOperand;
    const operator = calculator.operator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator;
        return;
    }

    if(firstOperand === null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;
    }else if(operator){
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator){
    if(operator === '+'){
        return firstOperand + secondOperand
    }else if(operator === '-'){
        return firstOperand - secondOperand
    }else if(operator === '*'){
        return firstOperand * secondOperand
    }else if(operator === '/'){
        return firstOperand / secondOperand
    }
    return secondOperand;
}




function updateScreen(){
    const display = document.querySelector('.current-operand');
    const upDisplay = document.querySelector('.previous-operand');
    upDisplay.textContent = calculator.firstOperand;
    display.textContent = calculator.displayValue;
}
updateScreen();

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

function deleteLastDigit() {
    const displayValue = calculator.displayValue;
    if(calculator.displayValue.length > 1 ){
        calculator.displayValue = displayValue.slice(0 , -1);
    }else if(calculator.displayValue.length === 1){
        calculator.displayValue = '0';
    }
    calculator.waitingForSecondOperand = false;
}

const keys = document.querySelector('.calculator-grid');
keys.addEventListener('click', (e) => {
    const { target } = e;
    const { value } = target;

    if (!target.matches('button')){
      return;
    }

    manageInput(value);
    updateScreen();

  });

  
document.addEventListener("keydown", function(event) {


    if(event.key === 'Enter'){
        manageInput('=');
        console.log(event.key);
    }else if(event.key == 'Delete'){
        manageInput('ac');
    }else if(event.key == 'Backspace'){
        manageInput('del');
    } else{
        manageInput(event.key);
    }
    updateScreen();
});

  
  function manageInput(value){
 
    switch (value) {
        case '/':
        case '*':
        case '+':
        case '-':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'ac':
            resetCalculator();
            break
        case 'del':
            deleteLastDigit();
            break;
        default:
            if(Number.isInteger(parseFloat(value))){
                inputDigit(value);
            }else{
                alert('Nope! I only talk in numbers. Give me numbers. I like no letters');
                return
            }
    }
  }



