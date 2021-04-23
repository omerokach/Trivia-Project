import React, { useState, useEffect } from "react";

function Timer(props) {
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer((prev) => prev - 1), 1000);
  }, [timer]);
  return <div>{timer}</div>;
}

export default Timer;
