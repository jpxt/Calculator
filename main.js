// Getting the elements that we need and assigning them to variables
const initialDisplay = document.getElementById('initialDisplay');

const clearBtn = document.getElementById('clearBtn');
const delBtn = document.getElementById('delBtn');
const dotBtn = document.getElementById('dotBtn');
const equalBtn = document.getElementById('equalBtn');

const operBtn = document.querySelectorAll('.operatorBtn');
const numBtn = document.querySelectorAll(".numBtn");




// Variables that we will need

let firstNum = '';
let secondNum = '';
let operator = null;
let reset = false;




// event listeners

numBtn.forEach(button => button.addEventListener('click', () => updateDisplay(button.innerHTML)));
operBtn.forEach(button => button.addEventListener('click', () => setOperator(button.innerHTML)));

/* SAME AS */
/* for (let i=0;i<numBtn.length;i++){
    numBtn[i].addEventListener('click',() => updateDisplay(button.textContent));
}
for (let i=0;i<operatorBtn.length;i++){
    numBtn[i].addEventListener('click',() => setOperator(button.textContent));
} */

clearBtn.addEventListener('click', clear);
delBtn.addEventListener('click', del);
dotBtn.addEventListener('click', dot);
percentageBtn.addEventListener('click', percentage);
equalBtn.addEventListener('click', solve);

window.addEventListener("keydown", keyboard);






//FUNCTIONS



// function to display the values on screen
function updateDisplay(value) {
    if (initialDisplay.innerHTML === '0' || reset) {
        resetDisplay();
    }
    if (initialDisplay.innerHTML !== 'error-press C') {
        if (initialDisplay.innerHTML.length < 10) {
            initialDisplay.innerHTML += value;
        }
    }

}





//Funcion to remove the inicial zero

function resetDisplay() {

    initialDisplay.innerHTML = '';
    reset = false;
}


// function clear button

function clear() {
    initialDisplay.innerHTML = '0';
    firstNum = '';
    secondNum = '';
    operator = null;


}
//function for the delete button
function del() {

    if (initialDisplay.innerHTML !== null) {
        if (initialDisplay.innerHTML !== 'error-press C') {
            if (initialDisplay.innerHTML !== '0') {
                initialDisplay.innerHTML = initialDisplay.innerHTML.slice(0, -1);
            }

        }
    }

}
//function for the dot button - can have just one dot

function dot() {
    if (initialDisplay.innerHTML.includes('.')) {

    } else initialDisplay.innerHTML += '.';
}


// FUnction for the percentage button
function percentage(e) {
    let temp = initialDisplay.innerHTML;
    temp = temp / 100;
    initialDisplay.innerHTML = temp;

    firstNum = '';
    secondNum = '';
    operator = null;

}
// Function to set current operator
function setOperator(currentOperator) {


    if (operator !== null) {

        solve();
    }
    firstNum = initialDisplay.innerHTML;
    operator = currentOperator;
    reset = true;
}
//Function that sets the second operator and sends the operation to be calculated
function solve() {

    if (operator === null || reset) {
        return;
    }

    if (operator === '/' && initialDisplay.innerHTML === '0') {
        initialDisplay.innerHTML = 'error-press C';


        return null;


    }
    secondNum = initialDisplay.innerHTML;
    initialDisplay.innerHTML = fixDigits(calculate(Number(firstNum), Number(secondNum), operator));

    operator = null;


}
// Pass the result number to exponencial
function fixDigits(value) {
    return value.toExponential(3);
}

// do the calculation based on the operator
function calculate(firstNum, secondNum, operator) {

    switch (operator) {
        case '+':

            return add(firstNum, secondNum);

        case '-':
            return sub(firstNum, secondNum);
        case '*':
            return mult(firstNum, secondNum);
        case '/':
            return div(firstNum, secondNum);
        default:
            return null;

    }
}

function add(firstNum, secondNum) {

    return firstNum + secondNum;

}

function sub(firstNum, secondNum) {
    return firstNum - secondNum;
}

function mult(firstNum, secondNum) {
    return firstNum * secondNum;
}

function div(firstNum, secondNum) {
    return firstNum / secondNum;
}

//keyboard support functions
function keyboard(e) {
    switch (e.code) {
        case 'Numpad0':
        case 'Digit0':
            updateDisplay(0)
            break
        case 'Numpad1':
        case 'Digit1':
            updateDisplay(1)
            break
        case 'Numpad2':
        case 'Digit2':
            updateDisplay(2)
            break
        case 'Numpad3':
        case 'Digit3':
            updateDisplay(3)
            break
        case 'Numpad4':
        case 'Digit4':
            updateDisplay(4)
            break
        case 'Numpad5':
        case 'Digit5':
            updateDisplay(5)
            break
        case 'Numpad6':
        case 'Digit6':
            updateDisplay(6)
            break
        case 'Numpad7':
        case 'Digit7':
            updateDisplay(7)
            break
        case 'Numpad8':
        case 'Digit8':
            updateDisplay(8)
            break
        case 'Numpad9':
        case 'Digit9':
            updateDisplay(9)
            break
        case 'Delete':
            clear()
            break
        case 'Slash':
        case 'NumpadDivide':
            setOperator(convertOperator('/'))
            break
        case 'NumpadMultiply':
            setOperator(convertOperator('*'))
            break
        case 'NumpadSubtract':
        case 'Minus':
            setOperator(convertOperator('-'))
            break
        case 'NumpadAdd':
            setOperator(convertOperator('+'))
            break
        case 'Enter':

        case 'NumpadEnter':
            solve();
            break
        case 'Backspace':
            del();
            break
    }
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "×";
    if (keyboardOperator === "-") return "−";
    if (keyboardOperator === "+") return "+";
}