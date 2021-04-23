import React, { useState, useEffect } from "react";
import AnswerOption from "./AnswerOption";

export default function Question({ currentQuestion, questionAsked, checkAnswer,correctAnswers, setTimer, timer }) {
  const [timeToAnswer, setTimeToAnswer] = useState([]);
  let counter = timer;
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
      <h3>Question {questionAsked}</h3>
      <h4>Correct Answer{correctAnswers}</h4>
      <h4>{currentQuestion.question}</h4>
      <div>{timer}</div>
      <ul>
        {currentQuestion.options.map((option) => (
          <AnswerOption option={option} checkAnswer={checkAnswer} timer={timer} />
        ))}
      </ul>
    </div>
  );
}
