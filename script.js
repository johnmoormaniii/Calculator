// ********** script.js **********

// ---------- BUTTONS ------------------------------------------------------------------------

const btnNumber = document.querySelectorAll('[data-number]');
const btnOperation = document.querySelectorAll('[data-operation]')
const btnEquals = document.querySelector('[data-equals]')
const btnDelete = document.querySelector('[data-delete]')
const btnAllClear = document.querySelector('[data-allClear]')

const currentOperand = document.querySelector('[data-current-operand]')
const previousOperand = document.querySelector('[data-previous-operand]')

let currentMode = null;

// ---------- BUTTON FUNCTIONS ---------------------------------------------------------------

function allClear(){
    currentOperand.textContent = '';
    previousOperand.textContent = '';
}

function appendNumber(buttonText){
    if (currentOperand.textContent.includes('.') && buttonText === '.') return
    if (currentOperand.textContent === '' && buttonText === '0') return
    if ((   currentOperand.textContent.includes('÷') ||
            currentOperand.textContent.includes('*') ||
            currentOperand.textContent.includes('+') ||
            currentOperand.textContent.includes('-') ||
            currentOperand.textContent.includes('=')
        )   && (
            buttonText === '÷' ||
            buttonText === '*' ||
            buttonText === '+' ||
            buttonText === '-' ||
            buttonText === '='
        )
        ) return
    currentOperand.textContent += buttonText;
};

function updatePreviousOperand(operationInProgress){
    previousOperand.textContent = currentOperand.textContent;
    currentOperand.textContent = '';
}

function deleteNumber(){
    currentOperand.textContent = currentOperand.textContent.toString().slice(0, -1);
}

function typeOfComputation(operator){
    switch(operator){
        case '÷':
            return currentMode = 'division';
        case '*':
            return currentMode = 'multiplication';
        case '+':
            return currentMode = 'addition';
        case '-':
            return currentMode = 'subtraction';
        default:
            return null;
    };
};

function compute(){
    let a = Number(previousOperand.textContent.toString().slice(0, -1));
    let b = Number(currentOperand.textContent);
    
    switch(currentMode){
        case 'division':
                if (currentOperand.textContent === '0'){
                    alert('YOU CAN NOT DIVIDE BY ZERO');
                    currentOperand.textContent = '';
                    return;
                }
            currentOperand.textContent = (a / b).toString();
            previousOperand.textContent = '';
            return;

        case 'multiplication':
            currentOperand.textContent = (a * b).toString()
            previousOperand.textContent = '';
            return;
        
        case 'addition':
            currentOperand.textContent = (a + b).toString();
            previousOperand.textContent = '';
            return;

        case 'subtraction':
            currentOperand.textContent = (a - b).toString()
            previousOperand.textContent = '';
            return;
    }
};


function keyboardHandler(e){
    if (e.key >= 0 && e.key <= 9) {appendNumber(e.key)};
    if (e.key === '.') {appendNumber(e.key)};
    if (e.key === '=') {compute()};
    if (e.key === 'Backspace') {deleteNumber()};
    if (e.key === '/' || e.key === '*' || e.key === '+' || e.key === '-') {
        appendNumber(e.key);
        updatePreviousOperand(currentOperand.textContent);
        typeOfComputation(e.key);
    };
    if (e.key === 'Enter') {compute()};
}


// ---------- BUTTON EVENT LISTENERS ---------------------------------------------------------

btnNumber.forEach(function(button){
    button.addEventListener('click', function(){
        appendNumber(button.textContent);
    })
});

btnOperation.forEach(function(button){
    button.addEventListener('click', function(){
        appendNumber(button.textContent);
        updatePreviousOperand(currentOperand.textContent);
        typeOfComputation(button.textContent);
    })
})

btnAllClear.addEventListener('click', allClear)
btnDelete.addEventListener('click', deleteNumber)
btnEquals.addEventListener('click', compute);
window.addEventListener('keydown', keyboardHandler);