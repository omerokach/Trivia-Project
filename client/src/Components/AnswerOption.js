import React from "react";

export default function AnswerOption({ option, checkAnswer, timer }) {
  return (
        <li onClick={() => checkAnswer(option, timer)} >{option}</li>
  );
}
