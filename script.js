const $display = document.querySelector("#display");
const $$numBtns = document.querySelectorAll("[data-type = 'number']");
const $$operatorBtns = document.querySelectorAll("[data-type = 'operator']");
const $clearBtn = document.querySelector("#clear");
const $positiveNegativeBtn = document.querySelector("#positive-negative");
const $percentBtn = document.querySelector("#percent");
const $equateBtn = document.querySelector("#equate");
const $toggleThemeBtn = document.querySelector(".toggle-theme-btn");

let operator;
let opperand;
let lastEvaluated;
let currentValue = 0;

const calcSum = (a, b) => {
  return a + b;
};
const calcDifference = (a, b) => {
  return a - b;
};
const calcProduct = (a, b) => {
  return a * b;
};
const calcQuotient = (a, b) => {
  return a / b;
};

const displayValue = (input) => {
  if ($display.textContent.includes(".") && input === ".") return;
  if ($display.textContent !== "0" || input === ".") {
    $display.textContent += input;
    return $display.textContent;
  }
  $display.textContent = input;
  return $display.textContent;
};

function updateValues(input) {
  currentValue = parseFloat(displayValue(input));
  return currentValue;
}

function updateOperator(input) {
  if (input === "+") return (operator = calcSum);
  if (input === "-") return (operator = calcDifference);
  if (["X", "x", "*"].includes(input)) return (operator = calcProduct);
  if (input === "/") return (operator = calcQuotient);
}

function updateOpperand(input) {
  return (opperand = input);
}

function handleNumberInput(e) {
  if (currentValue === lastEvaluated) $display.textContent = "0";
  if (document.querySelector(".active-operator")) {
    toggleActiveOperator();
    updateOpperand(currentValue);
    $display.textContent = "0";
  }
  let input = e.target.textContent;
  updateValues(input);
}

function handleOperatorInput(e) {
  if (opperand) performOperation(opperand, currentValue, operator);
  if (document.querySelector(".active-operator")) {
    toggleActiveOperator();
  }
  e.target.classList.toggle("active-operator");

  let input = e.target.textContent;
  return updateOperator(input);
}

function handleEquateInput() {
  if (!operator) return;
  if (!opperand) opperand = currentValue;
  performOperation(opperand, currentValue, operator);
}

function toggleActiveOperator() {
  document
    .querySelector(".active-operator")
    .classList.toggle("active-operator");
}

function performOperation(opperand, currentValue, operator) {
  $display.textContent = "0";
  lastEvaluated = updateValues(operator(opperand, currentValue));
  updateOpperand(null);
}

function clearEverything() {
  if (document.querySelector(".active-operator")) toggleActiveOperator();
  opperand = null;
  operator = null;
  currentValue = 0;
  $display.textContent = "0";
  return opperand, operator, currentValue;
}

function toggleTheme() {
  document.body.classList.toggle("toggle-theme");
  document.querySelector("span").textContent === "🌙"
    ? (document.querySelector("span").textContent = "🌞")
    : (document.querySelector("span").textContent = "🌙");
}

$$numBtns.forEach((btn) => {
  btn.addEventListener("click", handleNumberInput);
});

$$operatorBtns.forEach((btn) => {
  btn.addEventListener("click", handleOperatorInput);
});

$equateBtn.addEventListener("click", handleEquateInput);

$clearBtn.addEventListener("click", clearEverything);

$positiveNegativeBtn.addEventListener("click", () => {
  currentValue = currentValue * -1;
  return ($display.textContent = currentValue);
});

$percentBtn.addEventListener("click", () => {
  currentValue = currentValue / 100;
  return ($display.textContent = currentValue);
});

$toggleThemeBtn.addEventListener("click", toggleTheme);
