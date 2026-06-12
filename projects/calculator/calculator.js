const calcHistory = [];

//addition function
function calcAdd(num1, num2) {
  const result = num1 + num2;
  calcHistory.push({ operation: "+", num1, num2, result });
  return result;
}

//multiplication function
function calcMult(num1, num2) {
  const result = num1 * num2;
  calcHistory.push({ operation: "*", num1, num2, result });
  return result;
}

//division function
function calcDiv(num1, num2) {
  const result = num1 / num2;
  calcHistory.push({ operation: "/", num1, num2, result });
  return result;
}

//subtraction function
function calcSub(num1, num2) {
  const result = num1 - num2;
  calcHistory.push({ operation: "-", num1, num2, result });
  return result;
}

//toggle visibility of calculation history and convert the stored array into something readable
function toggleHistoryView() {
  const historySection = document.getElementById("history");
  if (historySection.className === "hidden") {
    const historyContent = ["History"];
    calcHistory.forEach((calc) => {
      console.log(compileCalcString(calc));
      historyContent.push(compileCalcString(calc));
    });
    historySection.innerHTML = historyContent.join("<br>");
    historySection.className = "";
  } else {
    historySection.className = "hidden";
    historySection.innerHTML = "";
  }
}

//update the history section to show the new calculation if visible
function updateHistory(historySection) {
  historySection.innerHTML =
    historySection.innerHTML +
    `<br>${compileCalcString(calcHistory[calcHistory.length - 1])}`;
}

//helper funtion to take a stored calc object and convert it into an easily readable string
function compileCalcString(calc) {
  return `${calc.num1} ${calc.operation} ${calc.num2} = ${calc.result}`;
}

//method to call the math functions and update history element if visible.
// This minimizes the amount of times the code has to find html elements
function doMath() {
  const num1 = Number(document.getElementsByName("num1")[0].value);
  const num2 = Number(document.getElementsByName("num2")[0].value);
  const historySection = document.getElementById("history");
  const operation = document.getElementById("operator").value;
  let result;
  if (operation === "+") {
    result = calcAdd(num1, num2);
  } else if (operation === "-") {
    result = calcSub(num1, num2);
  } else if (operation === "*") {
    result = calcMult(num1, num2);
  } else if (operation === "/") {
    result = calcDiv(num1, num2);
  } else {
    console.log(operation);
    console.error("Unimplimented Operation");
  }
  if (historySection.className !== "hidden") {
    updateHistory(historySection);
  }
  document.getElementById("result").innerHTML = result;
}
