import React from "react";
import "../App.css";

export default function AnswerOption({ option, checkAnswer, timer }) {
  return <li onClick={() => checkAnswer(option, timer)}>{option}</li>;
}
