import React from "react";
import AnswerOption from "./AnswerOption";
function Question({
  currentQuestion,
  questionAsked,
  checkAnswer,
  correctAnswers,
  setTimer,
  timer,
  wrongAnswers,
  setTimeToAnswer,
}) {
  return (
    <div>
      <h3>Question {questionAsked}</h3>
      <h4>Correct Answer: {correctAnswers}</h4>
      <h4>{3 - wrongAnswers}Heart</h4>
      <h4>{currentQuestion.question}</h4>
      <div>{timer}</div>
      <ul>
        {currentQuestion.options.map((option, i) => (
          <AnswerOption
            key={i}
            option={option}
            checkAnswer={checkAnswer}
            timer={timer}
          />
        ))}
      </ul>
    </div>
  );
}

export default Question;