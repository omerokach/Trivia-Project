import React, { useState, useEffect } from "react";
import AfterAnswer from "./AfterAnswer";
import Question from "./Question";
import axios from "axios";
import "../App.css";
import Swal from "sweetalert2";

export default function TriviaBoard({
  firstQuestion,
  setStart,
  userName,
  questionShowedId,
  setQuestionShowedId,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(firstQuestion);
  const [correctAnswers, setCorrectAnswer] = useState(0);
  const [wrongAnswers, setWrongAnswer] = useState(0);
  const [timeToAnswer, setTimeToAnswer] = useState([]);
  const [isLastAnswerCorrect, setIsLastAnswerCorrect] = useState(false);
  const [displayState, setDisplayState] = useState(1);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [playerRank, setPlayerRank] = useState(null);
  let timerCount = 20;
  const updateTimer = () => {
    return timerCount > 5 ? 20 - 0.5 * correctAnswers : 5;
  };
  const [timer, setTimer] = useState(updateTimer);
  const [questionAsked, setQuestionAsked] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [ratingArr, setRatingArr] = useState([]);

  useEffect(() => {
    const count =
      timer > 0 &&
      displayState === 1 &&
      setInterval(() => setTimer(timer - 1), 1000);
    if (timer === 0) {
      setIsTimeOver(true);
      setDisplayState(2);
      setWrongAnswer((prev) => prev + 1);
    }
    return () => clearInterval(count);
  }, [timer]);

  const checkAnswer = async (answer, remainingTime) => {
    let startingTime = updateTimer();
    setTimeToAnswer((prev) => [...prev, startingTime - remainingTime]);
    setDisplayState(2);
    if (answer === currentQuestion.answer) {
      setPlayerScore((prev) =>
        Math.floor(
          prev + ((1 - (startingTime - remainingTime) / startingTime) * 70 + 30)
        )
      );
      setCorrectAnswer((prev) => prev + 1);
      setIsLastAnswerCorrect(true);
    } else {
      setIsLastAnswerCorrect(false);
      setWrongAnswer((prev) => prev + 1);
      if (wrongAnswers === 2) {
        try {
          const res = await axios.post("/high_score", {
            userName: userName,
            score: playerScore,
          });
          setPlayerRank(res.data.userIndex);
          const ratingRes = await axios.post("/rating", {
            userId: res.data.userId,
            ratingArr,
            userScore: playerScore,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Our server's are down for the moment, Hang tight!",
            icon: "error",
            confirmButtonText: "Cool",
          });
          return;
        }
      }
    }
  };

  const userRatingSave = (rating, questionId) => {
    setRatingArr((prev) => [...prev, { rating, questionId }]);
  };

  return (
    <div>
      {displayState === 1 ? (
        <Question
          currentQuestion={currentQuestion}
          questionAsked={questionAsked}
          checkAnswer={checkAnswer}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          setTimer={setTimer}
          timer={timer}
          setTimeToAnswer={setTimeToAnswer}
          displayState={displayState}
          playerScore={playerScore}
        />
      ) : displayState === 2 ? (
        <AfterAnswer
          setDisplayState={setDisplayState}
          currentQuestion={currentQuestion}
          isLastAnswerCorrect={isLastAnswerCorrect}
          timeToAnswer={timeToAnswer}
          playerScore={playerScore}
          questionAsked={questionAsked}
          updateTimer={updateTimer}
          setTimer={setTimer}
          wrongAnswers={wrongAnswers}
          userRatingSave={userRatingSave}
          isTimeOver={isTimeOver}
          setIsTimeOver={setIsTimeOver}
          setStart={setStart}
          playerRank={playerRank}
          setQuestionShowedId={setQuestionShowedId}
          questionShowedId={questionShowedId}
          setQuestionAsked={setQuestionAsked}
          setCurrentQuestion={setCurrentQuestion}
        />
      ) : (
        ""
      )}
    </div>
  );
}
