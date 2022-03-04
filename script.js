const $display = document.querySelector("#display");
const $$numBtns = document.querySelectorAll("[data-type = 'number']");
const $$operatorBtns = document.querySelectorAll("[data-type = 'operator']");
const $clearBtn = document.querySelector("#clear");
const $positiveNegativeBtn = document.querySelector("#postive-negative");
const $percentBtn = document.querySelector("#percent");
const $equateBtn = document.querySelector("#equate");

let firstOpperand = 0;
let secondOpperand;
let calcutedNum;
let string = "0";
let operator;

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

const operate = (a, b, operator) => {
  console.log({ firstOpperand, secondOpperand, operator });
  if (operator == "sum") calcutedNum = calcSum(a, b);
  if (operator == "difference") calcutedNum = calcDifference(a, b);
  if (operator == "product") calcutedNum = calcProduct(a, b);
  if (operator == "quotient") calcutedNum = calcQuotient(a, b);
  string = `${calcutedNum}`;
  $display.textContent = string;
  return string, calcutedNum;
};

function numBtnHandler(input) {
  //check if imput is valid, no double decimal points, exceeds a length of 12.
  if (string.length >= 9) return;
  if (input === "." && string.includes(".")) return;
  if (string === "0" && input !== ".") {
    string = input;
    $display.textContent = string;
    return;
  }

  string += input;
  $display.textContent = string;
  return;
}

function operatorBtnHandler(input) {
  if (operator) {
    stringToFloat(string, secondOpperand);
    operate(firstOpperand, secondOpperand, operator);
  }
  if (!operator) {
    stringToFloat(string, firstOpperand);
    resetString();
  }
  if (["x", "X", "*"].includes(input)) return (operator = "product");
  if (input === "/") return (operator = "quotient");
  if (input === "+") return (operator = "sum");
  if (input === "-") return (operator = "difference");
}

function stringToFloat(string, opperand) {
  if (opperand === firstOpperand) {
    return (firstOpperand = parseFloat(string));
  }
  return (secondOpperand = parseFloat(string));
}

function resetString() {
  return (string = "0");
}

$$numBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    let inputValue = e.target.textContent;
    numBtnHandler(inputValue);
  })
);

document.addEventListener("keydown", (e) => {
  let inputValue = e.key;
  if (
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(inputValue)
  )
    return numBtnHandler(inputValue);
  if (["x", "X", "*", "-", "+", "/"].includes(inputValue))
    return operatorBtnHandler(inputValue);
});

$$operatorBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    let inputValue = e.target.textContent;
    operatorBtnHandler(inputValue);
  })
);

$equateBtn.addEventListener("click", (e) => {
  //figure this out next
});
