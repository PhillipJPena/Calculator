const $display = document.querySelector("#display");
const $$numBtns = document.querySelectorAll(".num-btn");

let operator = "sum";
let firstOpperandFloat = 4;
let secondOpperandFloat = 6;
let firstOpperandString = "";
let secondOpperandString = "";

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
  if (operator == "sum") return calcSum(a, b);
  if (operator == "difference") return calcDifference(a, b);
  if (operator == "product") return calcProduct(a, b);
  if (operator == "quotient") return calcQuotient(a, b);
};

function numBtnHandler(e) {
  const inputValue = e.target.textContent;
  //check if imput is valid, no double decimal points, exceeds a length of 12.
  inputValidator(inputValue) ? assignToOpperand(inputValue) : "";
}

$$numBtns.forEach((btn) => btn.addEventListener("click", numBtnHandler));
console.log(operate(firstOpperandFloat, secondOpperandFloat, operator));

//NEXT TASK: ADD KEYBOARD INPUT TO KEYPAD
