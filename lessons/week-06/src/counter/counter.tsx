import React, { useEffect, useState } from "react";
import "./counter.css";

export const Counter = () => {
  const [count, setCounter] = useState<number>(0);
  const [countChanged, setCountChanged] = useState<number>(0);

  useEffect(() => {
    setCountChanged(countChanged + 1);
  }, [count])

  return <div className="container">
    <div className="counters">{count}</div>
    <button className="buttons" onClick={() => setCounter(count + 1)}>Increase</button>
    <button className="buttons" onClick={() => setCounter(count - 1)}>Decrease</button>
    <div className="counters">Count Changed: {countChanged}</div>
  </div>
}