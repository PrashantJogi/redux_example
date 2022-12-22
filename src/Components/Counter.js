import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../Slice/couterSlice"
// import styles from "./Counter.module.css";


export function Counter() {

  const user = useSelector((state)=>state.user.value)
  console.log("🚀 ~ file: Counter.js:11 ~ Counter ~ user", user)
  
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          ADD
        </button>
        <span>{user}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
