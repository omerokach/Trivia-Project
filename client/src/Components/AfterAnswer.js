import React, { useState } from "react";
import "../App.css";
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
  wrongAnswers,
  userRatingSave,
  isTimeOver,
  setIsTimeOver,
  setStart,
  playerRank,
  setQuestionShowedId,
  questionShowedId,
}) {
  const [isRated, setIsRated] = useState(false);

  const chancesArrFunc = (theChanceOfSavedQuestion) => {
    const chancesArr = [];
    for (let i = 0; i < theChanceOfSavedQuestion; i++) {
      chancesArr.push("saved");
    }
    for (let i = 0; i < 100 - theChanceOfSavedQuestion; i++) {
      chancesArr.push("generated");
    }
    const randomIndex = Math.floor(Math.random() * chancesArr.length);
    return chancesArr[randomIndex];
  };

  const continueButton = async () => {
    if (wrongAnswers === 3) {
      setStart(false);
      return;
    }
    const savedQuestionsArr = await axios.get("/trivia/all_saved_questions");
    const numOfQuestionDidntAsked =
      savedQuestionsArr.data.length - questionShowedId.length;
    setIsTimeOver(false);
    let randomQuestion = "";
    let theChanceOfSavedQuestion = "";
    if (numOfQuestionDidntAsked > 100) {
      theChanceOfSavedQuestion = 70;
      randomQuestion = chancesArrFunc(theChanceOfSavedQuestion);
    } else if (numOfQuestionDidntAsked <= 100 && numOfQuestionDidntAsked > 0) {
      theChanceOfSavedQuestion = Math.floor(
        (0.006 * numOfQuestionDidntAsked + 0.1) * 100
      );
      randomQuestion = chancesArrFunc(theChanceOfSavedQuestion);
    } else {
      randomQuestion = "generated";
    }

    if (randomQuestion === "generated") {
      setDisplayState(1);
      getGeneratedQuestion();
      setTimer(updateTimer());
    } else {
      setDisplayState(1);
      getSavedQuestion();
      setTimer(updateTimer());
    }
  };

  const ratingOnce = async (questionRating, questionId) => {
    setIsRated(true);

    if (!currentQuestion.id) {
      currentQuestion.numOfVotes += 1;
      currentQuestion.rating = questionRating;
      try {
        const dbRes = await axios.post(
          "/trivia/save_new_question",
          currentQuestion
        );
        setQuestionShowedId((prev) => [...prev, dbRes.questionId]);
      } catch (error) {
        console.log(error);
      }
    } else {
      userRatingSave(questionRating, questionId);
    }
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
        <p>
          {isRated
            ? "Thank you for rating ✔"
            : "Rate the question if you liked her!"}
        </p>
        <span
          id="1"
          onClick={
            isRated === false
              ? (e) => {
                  ratingOnce(e.target.id, currentQuestion.id);
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
                  ratingOnce(e.target.id, currentQuestion.id);
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
                  ratingOnce(e.target.id, currentQuestion.id);
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
                  ratingOnce(e.target.id, currentQuestion.id);
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
                  ratingOnce(e.target.id, currentQuestion.id);
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
