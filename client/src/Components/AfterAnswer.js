import React, { useState } from "react";
import "../App.css";

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
  wrongAnswers,
  userRatingSave,
  isTimeOver,
  setIsTimeOver,
  setStart,
  playerRank,
}) {
  console.log(currentQuestion);
  const [isRated, setIsRated] = useState(false);
  const continueButton = async () => {
    if (wrongAnswers === 3) {
      setStart(false);
      console.log("loose");
      return;
    }

    setIsTimeOver(false);

    if (questionAsked % 3 === 0) {
      setDisplayState(1);
      getGeneratedQuestion();
      setTimer(updateTimer());
    } else {
      setDisplayState(1);
      getSavedQuestion();
      setTimer(updateTimer());
    }
  };

  const ratingOnce = (questionRating, question) => {
    setIsRated(true);
    userRatingSave(questionRating, question);
  };

  return (
    <div className="after-answer-div">
      {wrongAnswers === 3 ? (
        <h1>
          Game over, you have answer {questionAsked - wrongAnswers} question
          correctly
        </h1>
      ) : (
        ""
      )}
      <h2>
        {isTimeOver
          ? "Sorry, you run out of time.."
          : isLastAnswerCorrect
          ? "Correct! 🎊"
          : "Wrong! 😥"}
      </h2>
      {isTimeOver === false ? (
        <h3>
          Took you {timeToAnswer[timeToAnswer.length - 1]} seconds to answer the
          question
        </h3>
      ) : (
        ""
      )}
      <div className="after-answer-information">
        <h4>Your score: {playerScore}</h4>
        <h4>Your rank: {playerRank}</h4>
        {isLastAnswerCorrect ? (
          ""
        ) : (
          <p>The right answer is: {currentQuestion.answer}</p>
        )}
        <p>Question about: {currentQuestion.questionAbout}</p>
      </div>
      <ul>
        {currentQuestion.questionValues.map((obj, i) => (
          <li key={i}>
            {obj.country} <strong>{obj[currentQuestion.parameterB]}</strong>
          </li>
        ))}
      </ul>
      <div className="rating">
        <p>Rate the question if you liked her!</p>
        <span
          id="1"
          onClick={
            isRated === false
              ? (e) => {
                  ratingOnce(e.target.id, currentQuestion.question);
                }
              : null
          }
        >
          1⭐{" "}
        </span>
        <span
          id="2"
          onClick={
            isRated === false
              ? (e) => {
                  ratingOnce(e.target.id, currentQuestion.question);
                }
              : null
          }
        >
          2⭐{" "}
        </span>
        <span
          id="3"
          onClick={
            isRated === false
              ? (e) => {
                  ratingOnce(e.target.id, currentQuestion.question);
                }
              : null
          }
        >
          3⭐{" "}
        </span>
        <span
          id="4"
          onClick={
            isRated === false
              ? (e) => {
                  ratingOnce(e.target.id, currentQuestion.question);
                }
              : null
          }
        >
          4⭐{" "}
        </span>
        <span
          id="5"
          onClick={
            isRated === false
              ? (e) => {
                  ratingOnce(e.target.id, currentQuestion.question);
                }
              : null
          }
        >
          5⭐{" "}
        </span>
      </div>
      <button onClick={() => continueButton()}>
        {wrongAnswers === 3 ? "Back to homepage" : "Continue ↪"}
      </button>
    </div>
  );
}

export default AfterAnswer;
