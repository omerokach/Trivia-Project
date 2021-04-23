import React from "react";
import AnswerOption from "./AnswerOption";
import Timer from "./Timer";

export default function Question({ currentQuestion, questionAsked, checkAnswer,correctAnswers }) {


  return (
    <div>
      <h3>Question {questionAsked}</h3>
      <h4>Correct Answer{correctAnswers}</h4>
      <h4>{currentQuestion.question}</h4>
      <Timer />
      <ul>
        {currentQuestion.options.map((option) => (
          <AnswerOption option={option} checkAnswer={checkAnswer} />
        ))}
      </ul>
    </div>
  );
}
