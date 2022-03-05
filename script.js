const $display = document.querySelector("#display");
const $$numBtns = document.querySelectorAll("[data-type = 'number']");
const $$operatorBtns = document.querySelectorAll("[data-type = 'operator']");
const $clearBtn = document.querySelector("#clear");
const $positiveNegativeBtn = document.querySelector("#postive-negative");
const $percentBtn = document.querySelector("#percent");
const $equateBtn = document.querySelector("#equate");

let firstOpperand = null;
let secondOpperand = null;
let calculatedNum = null;
let string = "0";
let operator;

const displayText = (text) => {
  return ($display.textContent = text);
};

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

const operate = (a, b, op) => {
  if (op === "sum") calculatedNum = calcSum(a, b);
  if (op === "difference") calculatedNum = calcDifference(a, b);
  if (op === "product") calculatedNum = calcProduct(a, b);
  if (op === "quotient") calculatedNum = calcQuotient(a, b);
  displayText(calculatedNum);
  resetValues();
  return calculatedNum;
};

function numBtnHandler(input) {
  //check if imput is valid, no double decimal points, exceeds a length of 12.
  if (string.length >= 9) return;
  if (input === "." && string.includes(".")) return;
  if (string === "0" && input !== ".") {
    string = input;
    return displayText(string);
  }

  string += input;
  return displayText(string);
}

function operatorBtnHandler(input) {
  setOpperand();
  if (operator) {
    operate(firstOpperand, secondOpperand, operator);
    setOpperand();
  }
  setOperator(input);
}

function equateHandler() {
  if (!firstOpperand && !operator) return;
  setOpperand();
  operate(firstOpperand, secondOpperand, operator);
}

function setOpperand() {
  if (calculatedNum && string === "0") return (firstOpperand = calculatedNum);
  if (firstOpperand) {
    console.log("ran");
    secondOpperand = parseFloat(string);
    string = "0";
    return secondOpperand, string;
  }
  firstOpperand = parseFloat(string);
  string = "0";
  return firstOpperand, string;
}

function setOperator(input) {
  if (["x", "X", "*"].includes(input)) return (operator = "product");
  if (input === "/") return (operator = "quotient");
  if (input === "+") return (operator = "sum");
  if (input === "-") return (operator = "difference");
}

function resetValues() {
  return (
    (firstOpperand = null),
    (secondOpperand = null),
    (operator = null),
    (string = "0")
  );
}

$$numBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    let inputValue = e.target.textContent;
    numBtnHandler(inputValue);
  })
);

$$operatorBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    let inputValue = e.target.textContent;
    operatorBtnHandler(inputValue);
  })
);

$equateBtn.addEventListener("click", (e) => {
  equateHandler();
});

document.addEventListener("keydown", (e) => {
  let inputValue = e.key;

  if (
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(inputValue)
  )
    return numBtnHandler(inputValue);

  if (["x", "X", "*", "-", "+", "/"].includes(inputValue))
    return operatorBtnHandler(inputValue);

  if (["=", "Enter"].includes(inputValue)) {
    return equateHandler();
  }
});
