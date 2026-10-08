"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="counter">{count}</p>
      <button className="primary" onClick={() => setCount(count + 1)}>
        1 증가
      </button>{" "}
      <button onClick={() => setCount(0)}>초기화</button>
    </div>
  );
}
