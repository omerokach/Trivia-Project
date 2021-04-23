import React, { useState, useEffect, useContext } from "react";
import {displayStateContext} from '../Pages/Main.js'
import AnswerOption from "./AnswerOption";

export default function Question({
  currentQuestion,
  questionAsked,
  checkAnswer,
  correctAnswers,
  setTimer,
  timer,
  wrongAnswers,
  setTimeToAnswer,
}) {
  const displayState = useContext(displayStateContext)
  console.log("useContext(displayStateContext)",useContext(displayStateContext));
  let counter = timer;
  let startingTime = timer;
  useEffect(() => {
    const interval = setInterval(() => {
      counter--;
      setTimer((prev) => (prev = counter));
      console.log("display",displayState);
      if (counter === 0 || displayState !== 1) {
        setTimeToAnswer((prev) => [...prev, startingTime-counter])
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  return (
    <div>
      <h3>Question {questionAsked}</h3>
      <h4>Correct Answer: {correctAnswers}</h4>
      <h4>{3 - wrongAnswers}Heart</h4>
      <h4>{currentQuestion.question}</h4>
      <div>{timer}</div>
      <ul>
        {currentQuestion.options.map((option) => (
          <AnswerOption
            option={option}
            checkAnswer={checkAnswer}
            timer={timer}
          />
        ))}
      </ul>
    </div>
  );
}
