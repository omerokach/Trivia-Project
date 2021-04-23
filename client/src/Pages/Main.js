import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Question from "../Components/Question";

export default function Main() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswer] = useState(0);
  const [questionAsked, setQuestionAsked] = useState(0);

  const history = useHistory();

  const checkAnswer = (answer) => {
    
    if(answer === currentQuestion.answer){

      setCorrectAnswer(prev => prev +1);

    }else{

    }
  }

  const startButton = async () => {
    try {
      const res = await axios.get("/trivia/saved_question");
      setQuestionAsked((prev) => prev + 1);
      setCurrentQuestion(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1>hello {history.location.search.slice(10)}</h1>
      {currentQuestion ? (
        <Question
          currentQuestion={currentQuestion}
          questionAsked={questionAsked}
          checkAnswer= {checkAnswer}
          correctAnswers={correctAnswers}
        />
      ) : (
        ""
      )}
      <button onClick={startButton}>start</button>
    </div>
  );
}
