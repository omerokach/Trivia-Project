import React, { useState, useEffect, useContext } from "react";

function AfterAnswer({
  setDisplayState,
  currentQuestion,
  isLastAnswerCorrect,
  timeToAnswer,
}) {
  console.log(currentQuestion);

  const ratingFunc = (e) => {};

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
            {obj.country} <strong>{obj[currentQuestion.parameterB]}</strong>
          </li>
        ))}
      </ul>
      <div>
        <span id="1" onClick={(e) => console.log(e.target.id)}>
          1⭐{" "}
        </span>
        <span id="2">2⭐ </span>
        <span id="3">3⭐ </span>
        <span id="4">4⭐ </span>
        <span id="5">5⭐ </span>
      </div>
      <butt4n onClick={() => setDisplayState(1)}> Continue ↪ </butt4n>
    </div>
  );
}

export default AfterAnswer;
