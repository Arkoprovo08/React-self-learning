import { useState } from "react";
import './App.css';

function Counter() {
  const [value, setvalue] = useState(0);
  let add = () => {
    setvalue(value + 1);
    console.log(value);
  };
  let subtract = () => {
    setvalue(value - 1);
    console.log(value);
  };
  let sub = ()=>{
    console.log("Submitted",value);
  }
  return (
    <div>
      <button type="button" onClick={add}>
        ADD
      </button>{" "}
      <button type="button" onClick={subtract}>
        SUBTRACT
      </button>
      <p>
        {" Current Value : "}
        {value}
      </p>
      <button type="submit" onClick={sub}>
        Submit
      </button>
    </div>
  );
}
export default Counter;
