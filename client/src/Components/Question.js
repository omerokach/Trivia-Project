import React from "react";
import "../App.css";
import AnswerOption from "./AnswerOption";

function Question({
  currentQuestion,
  questionAsked,
  checkAnswer,
  correctAnswers,
  timer,
  wrongAnswers,
  playerScore,
}) {
  return (
    <div className="board-div">
      <div className="board-information">
        <h4>Question {questionAsked}</h4>
        <h4>Correct Answer: {correctAnswers}</h4>
        <h4>{3 - wrongAnswers} 💝 </h4>
        <h4>Your score: {playerScore}</h4>
      </div>
      <div className="timer">{timer}</div>
      <div className="question-div">
        <h4>{currentQuestion.question}</h4>
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
    </div>
  );
}

export default Question;
