import React from "react";

export default function AnswerOption({ option, checkAnswer }) {
  return (
        <li onClick={() => checkAnswer(option)} >{option}</li>
  );
}
