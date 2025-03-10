import { useEffect, useState } from "react";
import "./App.css";
// '2+3+5*6*7+25+3-5'
function calc(exp) {
  if(exp==='0/0') return NaN
  else if(exp==='1/0') return Infinity;
  const arr = [];
  let i = 0;
  while (i < exp.length) {
    let f = i;
    while (
      f < exp.length &&
      exp[f] !== "+" &&
      exp[f] !== "-" &&
      exp[f] !== "*" &&
      exp[f] !== "/"
    ) {
      f++;
    }

    const val = exp.substring(i, f);

    arr.push(val);
    if (f < exp.length) {
      arr.push(exp[f]);
    }
    i = f + 1;
  }
  let total = Number(arr[0]);
  i = 1;
  // '2+3+5*6*7+25+3-5'
  console.log(arr);
  while (i < arr.length) {
    console.log(i, arr.length, arr[i]);
    let j = i + 2,
      val = arr[i + 1];

    while (j < arr.length && (arr[j] === "*" || arr[j] === "/")) {
      // console.log(i,j);
      if (arr[j] === "*") val *= arr[j + 1];
      else val /= arr[j + 1];
      j += 2;
    }
    // console.log(val,total);
    if (arr[i] === "+") total += Number(val);
    else if(arr[i]==='-') total -= val;
    else if(arr[i]==='*') total*=val;
    else total/=val;
    i = j;
  }
  console.log("total", total);
  return total;
}

const CalculatorButton = ({ value, btnOnClick }) => {
  return (
    <button
      className="calc-but"
      onClick={() => {
        btnOnClick(value);
      }}
    >
      {value}
    </button>
  );
};

const buttons = [
  "1",
  "2",
  "3",
  "+",
  "4",
  "5",
  "6",
  "-",
  "7",
  "8",
  "9",
  "*",
  "C",
  "0",
  "=",
  "/",
];

function App() {
  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");

  function btnOnClick(type) {
    if (type === "C") {
      setInputValue("");
      setResult("");
    } else if (type === "=") {
      const newResult = calc(inputValue);
      console.log(newResult);
      setResult(newResult);
    } else setInputValue(inputValue + type);
  }

  useEffect(() => {
    setResult("");
  }, []);
  return (
    <div className="App">
      <h1>React Calculator</h1>
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        type="text"
      ></input>
      <h5>{result}</h5>
      <div className="btn-cont">
        {buttons.map((value) => (
          <CalculatorButton value={value} btnOnClick={btnOnClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
