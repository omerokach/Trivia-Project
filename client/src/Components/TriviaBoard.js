import React, { useState, useEffect, useHistory } from "react";
import AnswerOption from "./AnswerOption";
import AfterAnswer from "./AfterAnswer";
import Question from "./Question";
import axios from "axios";

export default function TriviaBoard({ firstQuestion }) {
  const [currentQuestion, setCurrentQuestion] = useState(firstQuestion);
  const [correctAnswers, setCorrectAnswer] = useState(0);
  const [wrongAnswers, setWrongAnswer] = useState(0);
  const [timeToAnswer, setTimeToAnswer] = useState([]);
  const [isLastAnswerCorrect, setIsLastAnswerCorrect] = useState(false);
  const [displayState, setDisplayState] = useState(1);
  let timerCount = 20;
  const updateTimer = () => {
    return timerCount > 5 ? 20 - 0.5 * correctAnswers : 5;
  };
  const [timer, setTimer] = useState(updateTimer);
  const [questionAsked, setQuestionAsked] = useState(1);
  const [nextQeustion, setNextQuestion] = useState(false);

  const getSavedQuestion = async () => {
    try {
      const res = await axios.get("/trivia/saved_question");
      setQuestionAsked((prev) => prev + 1);
      setCurrentQuestion(res.data);
      setDisplayState(1);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDisplayState = (displayState) => {
    return displayState;
  };

  const getGeneratedQuestion = async () => {
    try {
      const res = await axios.get("/trivia/generate_question");
      setQuestionAsked((prev) => prev + 1);
      setCurrentQuestion(res.data);
      setDisplayState(1);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    let counter = timer;
    const interval = setInterval(() => {
      counter--;
      setTimer((prev) => (prev = counter));
      if (counter === 0 || displayState !== 1) {
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  const checkAnswer = (answer, remainingTime) => {
    let startingTime = updateTimer();
    setTimeToAnswer((prev) => [...prev, startingTime - remainingTime]);
    setDisplayState(2);
    if (answer === currentQuestion.answer) {
      setCorrectAnswer((prev) => prev + 1);
      setIsLastAnswerCorrect(true);
    } else {
      setIsLastAnswerCorrect(false);
      setWrongAnswer((prev) => prev + 1);
    }
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
        />
      ) : displayState === 2 ? (
        <AfterAnswer
          setDisplayState={setDisplayState}
          currentQuestion={currentQuestion}
          isLastAnswerCorrect={isLastAnswerCorrect}
          timeToAnswer={timeToAnswer}
          getDisplayState={getDisplayState}
        />
      ) : (
        ""
      )}
    </div>
  );
}
