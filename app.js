// Get the screen element
const screen = document.getElementById('screen');

// Initialize variables
let currentInput = ''; // Holds the current input (the number you're typing)
let previousInput = ''; // Holds the previous input (the first operand)
let operator = ''; // Stores the operator (+, *, -, /)

// Attach click event to each button
const buttons = document.querySelectorAll('.btn'); // Corrected here
buttons.forEach(button => {
    button.addEventListener('click', function() { // Corrected here
        const action = button.getAttribute('data-action');
        const value = button.getAttribute('data-value');

        // Handle the different actions
        if (!action) {
            handleNumber(value);
        } else {
            switch(action) {
                case 'operation':
                    handleOperation(value);
                    break;
                case 'equals':
                    handleEquals();
                    break;
                case 'clear':
                    clearCalculator();
                    break;
                case 'delete':
                    deleteLastCharacter();
                    break;
            }
        }
    });
});

// Handle number input
function handleNumber(num) {
    if (currentInput.length < 10) {
        currentInput += num;
        updateScreen(currentInput);
    }
}

// Handle operations (+, -, *, /)
function handleOperation(op) {
    if (currentInput === '' && previousInput === '') {
        return; // Prevent operator input without a number
    }

    if (previousInput !== '') {
        handleEquals();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Handle equals (=)
function handleEquals() {
    if (currentInput === '' && previousInput === '') {
        return; // Prevent calculating if either input is empty
    }

    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString().slice(0, 10); // Limit display length
    previousInput = '';
    operator = '';
    updateScreen(currentInput);
}

// Update the calculator screen
function updateScreen(value) {
    screen.textContent = value || '0'; // Text equals value or 0 depending on the value contents
}

// Clear all inputs
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateScreen('0');
}

// Delete the last character of the current input
function deleteLastCharacter() {
    currentInput = currentInput.slice(0, -1); // Takes 1 off the end of the currentInput
    updateScreen(currentInput || '0');
}
