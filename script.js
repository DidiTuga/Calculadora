function calculate(n1, operator, n2) {
  let result = "";
  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result;
}

document.addEventListener("DOMContentLoaded", function () {
  const calculator = document.querySelector(".calculator");
  const keys = document.querySelector(".calculator .keys");
  const display = document.querySelector(".calculator .display");

  keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;

      if (!action) {
        calculator.dataset.calculate_again = 0;
        if (
          displayedNum === "0" ||
          calculator.dataset.previousKeyType === "operator"
        ) {
          display.textContent = keyContent;
        } else {
          display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = "number";
      }
      if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
      ) {
        calculator.dataset.calculate_again = 0;
        calculator.dataset.operator = action;
        if (
          calculator.dataset.operator_click == 1 &&
          calculator.dataset.previousKeyType == "number"
        ) {
          const firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          const secondValue = displayedNum;
          display.textContent = calculate(firstValue, operator, secondValue);
        } else {
          calculator.dataset.operator = action;
          calculator.dataset.firstValue = displayedNum;
          if (calculator.dataset.previousKeyType == "number") {
            calculator.dataset.operator_click = 1;
          }
        }
        calculator.dataset.previousKeyType = "operator";
      }
      if (action === "decimal") {
        calculator.dataset.calculate_again = 0;
        if (
          !displayedNum.includes(".") &&
          calculator.dataset.previousKeyType != "operator"
        ) {
          display.textContent = displayedNum + ".";
        } else if (calculator.dataset.previousKeyType === "operator") {
          display.textContent = "0.";
        }
        calculator.dataset.previousKeyType = "decimal";
      }

      if (action === "clear") {
        calculator.dataset.previousKeyType = "clear";
        display.textContent = "0";
        delete(calculator.dataset.operator_click)
        delete(calculator.dataset.firstValue)
        delete(calculator.dataset.secondValue)
        delete(calculator.dataset.operator)
        delete(calculator.dataset.calculate_again)
      }

      if (action === "calculate") {
        if (calculator.dataset.calculate_again != 1) {
          const firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          const secondValue = displayedNum;
          calculator.dataset.secondValuer = secondValue;
          if (operator != null) {
            calculator.dataset.calculate_again = 1;
            display.textContent = calculate(firstValue, operator, secondValue);
          }
        } else {
          const firstValue = displayedNum;
          display.textContent = calculate(
            firstValue,
            calculator.dataset.operator,
            calculator.dataset.secondValuer
          );
        }
        calculator.dataset.previousKeyType = "calculate";
        calculator.dataset.operator_click = false;
      }
    }
  });
});
