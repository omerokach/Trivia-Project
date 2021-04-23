import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import TriviaBoard from "../Components/TriviaBoard";

export default function Main() {
  const [start, setStart] = useState(false);
  const [firstQuestion, setFirstQuestion] = useState({});

  const getSavedQuestion = async () => {
    try {
      const res = await axios.get("/trivia/saved_question");
      setFirstQuestion(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startButton = async () => {
    await getSavedQuestion();
    setStart(true);
  };

  const highScoreButton = async () => {
    const res = await axios.get("/high_score");
    console.log(res.data);
  };

  const history = useHistory();

  return (
    <div>
      <h1>hello {history.location.search.slice(10)}</h1>
      {start ? <TriviaBoard firstQuestion={firstQuestion} /> : ""}
      <button onClick={highScoreButton}>High scores table</button>
      <button onClick={startButton}>Start</button>
    </div>
  );
}
