// Select elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

var currentInput = '';
var operator = '';
var operand1 = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            currentInput = '';
            operator = '';
            operand1 = null;
            display.value = '';
        }
        else if (value === "=") {
            if (operand1 !== null && operator && currentInput) {
                try {
                    const result = calculate(operand1, operator, parseFloat(currentInput));
                    display.value = result;
                    currentInput = result;
                    operator = '';
                    operand1 = null;
                }
                catch (error) {
                    display.value = "Error";
                    console.error(error.message);
                }
                
            }
        }
        else if (['+', '-', '*', '/', '%'].includes(value)) {
            if(currentInput) {
                operand1 = parseFloat(currentInput);
                operator = value;
                currentInput = '';
            }
        }
        else {
            currentInput += value; // Append the clicked number to the input
            display.value = currentInput; // Update the display
        }
    })
})

function calculate (operand1, operator, operand2) {
    switch(operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if(operand2 === 0){
                throw new Error("Division by zero is not allowed.");
            }
            return operand1 / operand2;
        case '%':
            if (operand2 < 0){ 
                throw new Error("Percentage can't be negative");
            }
            operand2 = operand2 / 100;
            console.log(operand2);
            return operand1 * operand2;
        default:
            throw new Error("Unsupported operator");
    }
}