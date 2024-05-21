// button selections
let addButton,
  subtractButton,
  multiplyButton,
  divideButton,
  changeSignButton,
  clearButton,
  parenthesisButton,
  remainderButton,
  equalsButton,
  decimalButton,
  backspaceButton;
let numberButtons;
let display;

// state variables
let currentInput = "";
let currentOperation = "";
let result = null;

// calc operations
function initializeVariables() {
  addButton = document.querySelector(".addition");
  subtractButton = document.querySelector(".subtract");
  multiplyButton = document.querySelector(".multiply");
  divideButton = document.querySelector(".divide");
  changeSignButton = document.querySelector(".changeSign");
  clearButton = document.querySelector(".clear");
  parenthesisButton = document.querySelector(".parenthesis");
  remainderButton = document.querySelector(".remainder");
  equalsButton = document.querySelector(".equals");
  backspaceButton = document.querySelector(".backspace"); // Backspace button
  numberButtons = document.querySelectorAll(".number");
  display = document.querySelector(".display");
}

function setupEventListeners() {
  addButton.addEventListener("click", () => handleOperation("+"));
  subtractButton.addEventListener("click", () => handleOperation("-"));
  multiplyButton.addEventListener("click", () => handleOperation("*"));
  divideButton.addEventListener("click", () => handleOperation("/"));
  changeSignButton.addEventListener("click", changeSign);
  clearButton.addEventListener("click", clearDisplay);
  parenthesisButton.addEventListener("click", () => handleParentheses());
  remainderButton.addEventListener("click", () => handleOperation("%"));
  equalsButton.addEventListener("click", calculateResult);
  backspaceButton.addEventListener("click", handleBackspace); // Event listener for backspace button

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => handleNumber(button.innerText));
  });
}

// operations functions

function handleNumber(number) {
  currentInput += number;
  updateDisplay();
}

function handleOperation(operation) {
  if (currentInput !== "") {
    if (currentOperation !== "") {
      calculateResult();
    }
    currentOperation = operation;
    result = currentInput;
    currentInput = "";
  } else if (result !== null) {
    currentOperation = operation;
  }
  updateDisplay();
}

function handleParentheses() {
  if (currentInput !== "") {
    currentInput = `(${currentInput})`;
  }
  updateDisplay();
}

function handleBackspace() {
  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
  } else if (currentOperation !== "") {
    currentOperation = "";
  } else if (result !== "") {
    currentInput = result;
    result = null;
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function calculateResult() {
  if (currentInput === "") {
    return;
  }
  const currentValue = parseFloat(currentInput);
  let calculatedResult;

  switch (currentOperation) {
    case "+":
      calculatedResult = parseFloat(result) + currentValue;
      break;
    case "-":
      calculatedResult = parseFloat(result) - currentValue;
      break;
    case "*":
      calculatedResult = parseFloat(result) * currentValue;
      break;
    case "/":
      calculatedResult =
        currentValue !== 0
          ? parseFloat(result) / currentValue
          : "dividing by 0 error";
      break;
    case "%":
      calculatedResult = parseFloat(result) % currentValue;
      break;
    default:
      return;
  }
  currentInput = calculatedResult.toString();
  currentOperation = "";
  result = null;
  updateDisplay();
}

function changeSign() {
  if (currentInput !== "") {
    currentInput = (parseFloat(currentInput) * -1).toString();
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  currentOperation = "";
  result = null;
  updateDisplay();
}

function updateDisplay() {
  display.textContent =
    result !== null
      ? `${result} ${currentOperation} ${currentInput}`
      : currentInput || "0";
}

document.addEventListener("DOMContentLoaded", () => {
  initializeVariables();
  setupEventListeners();
});
