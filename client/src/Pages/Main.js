import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Question from "../Components/Question";

export default function Main() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const history = useHistory();

  const startButton = async () => {
    try {
      const res = await axios.get("/trivia/saved_question");
      setCurrentQuestion(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1>hello {history.location.search.slice(10)}</h1>
      {currentQuestion ? <Question currentQuestion={currentQuestion} /> : ""}
      <button onClick={startButton}>start</button>
    </div>
  );
}
