import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Question from "../Components/Question";

export default function Main() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswer] = useState(0);
  const [wrongAnswers, setWrongAnswer] = useState(0);
  let timerCount = 20;
  const updateTimer = () => {
    return timerCount > 5 ? 20 - 0.5 * correctAnswers : 5;
  };
  const [timer, setTimer] = useState(updateTimer);
  const [questionAsked, setQuestionAsked] = useState(0);
  const [nextQeustion, setNextQuestion] = useState(false);

  const history = useHistory();

  const getSavedQuestion = async () => {
    try {
      const res = await axios.get("/trivia/saved_question");
      setQuestionAsked((prev) => prev + 1);
      setCurrentQuestion(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getGeneratedQuestion = async () => {
    try {
      const res = await axios.get("/trivia/generate_question");
      setQuestionAsked((prev) => prev + 1);
      setCurrentQuestion(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkAnswer = (answer) => {
    if (answer === currentQuestion.answer) {
      setCorrectAnswer((prev) => prev + 1);
    } else {
      setWrongAnswer((prev) => prev + 1);
    }
  };

  const startButton = async () => {
    getSavedQuestion();
  };

  return (
    <div>
      <h1>hello {history.location.search.slice(10)}</h1>
      {currentQuestion ? (
        <Question
          currentQuestion={currentQuestion}
          questionAsked={questionAsked}
          checkAnswer={checkAnswer}
          correctAnswers={correctAnswers}
          setTimer={setTimer}
          timer={timer}
        />
      ) : (
        ""
      )}
      <button onClick={startButton}>start</button>
    </div>
  );
}
