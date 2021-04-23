import React from "react";
import axios from "axios";

function AfterAnswer({
  setDisplayState,
  currentQuestion,
  isLastAnswerCorrect,
  timeToAnswer,
  playerScore,
  questionAsked,
  getGeneratedQuestion,
  getSavedQuestion,
  updateTimer,
  setTimer,
}) {
  console.log(currentQuestion);

  const ratingFunc = (e) => {};

  const continueButton = async () => {
    if (questionAsked % 3 === 0) {
      getGeneratedQuestion();
      setTimer(updateTimer());
    } else {
      getSavedQuestion();
      setTimer(updateTimer());
    }
  };

  return (
    <div>
      <h1>{isLastAnswerCorrect ? "Correct! 🎊" : "Wrong! 😥"}</h1>
      <h2>
        Took you {timeToAnswer[timeToAnswer.length - 1]} seconds to answer the
        question
      </h2>
      <h4>Your score: {playerScore}</h4>
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
      <button onClick={() => continueButton()}> Continue ↪ </button>
    </div>
  );
}

export default AfterAnswer;
