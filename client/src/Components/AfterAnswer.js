import React, { useState, useEffect, useContext } from "react";

function AfterAnswer({
  setDisplayState,
  currentQuestion,
  isLastAnswerCorrect,
  timeToAnswer,
}) {
  console.log(currentQuestion);

  return (
    <div>
      <h1>{isLastAnswerCorrect ? "Correct! 🎊" : "Wrong! 😥"}</h1>
      <h2>
        Took you {timeToAnswer[timeToAnswer.length - 1]} seconds to answer the
        question
      </h2>
      {isLastAnswerCorrect ? (
        ""
      ) : (
        <p>The right answer is: {currentQuestion.answer}</p>
      )}
      <p>Question about: {currentQuestion.questionAbout}</p>
      <ul>
        {currentQuestion.questionValues.map((obj) => (
          <li>
            {obj.country} <strong>{obj[currentQuestion.parameter]}</strong>
          </li>
        ))}
      </ul>
      <button onClick={() => setDisplayState(1)}> Continue ↪ </button>
    </div>
  );
}

export default AfterAnswer;
