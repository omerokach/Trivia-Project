import React, { useState, useEffect } from "react";

function Timer(props) {
  let counter = 20;

  useEffect(() => {
    const interval = setInterval(() => {
        counter--;
        setTimer((prev) => (prev = counter));
    if (counter === 0) {
        clearInterval(interval);
    }
    }, 1000);
  }, []);

  return (
      <div>
          {timer}
    </div>
  );
}

export default Timer;
