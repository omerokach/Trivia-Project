import React from "react";
import AnswerOption from "./AnswerOption";

export default function Question({ currentQuestion }) {
  return (
    <div>
      {/* <h3>Question ${numberOfQuestion}</h3> */}
      <h4>{currentQuestion.question}</h4>
      <ul>
        {currentQuestion.options.map((option) => (
          <AnswerOption option={option} />
        ))}
      </ul>
    </div>
  );
}
