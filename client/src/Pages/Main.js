import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import TriviaBoard from "../Components/TriviaBoard";
import Swal from "sweetalert2";

export default function Main({ userName }) {
  const [start, setStart] = useState(false);
  const [firstQuestion, setFirstQuestion] = useState({});
  const [clickedHighScore, setClickedHighScore] = useState(false);
  const [highScore, setHighScore] = useState([]);
  const [questionShowedId, setQuestionShowedId] = useState([]);

  const startButton = async () => {
    try {
      const res = await axios.get("/trivia/saved_question");
      setQuestionShowedId((prev) => [...prev, res.data.id]);
      setFirstQuestion(res.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Our server's are down for the moment, Hang tight!",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }
    setStart(true);
  };

  const highScoreButton = async () => {
    try {
      const res = await axios.get("/high_score");
      setClickedHighScore(true);
      const sorted = res.data.sort((a, b) => b.score - a.score);
      setHighScore(sorted);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Our server's are down for the moment, Hang tight!",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }
  };

  return (
    <div className="main-div">
      {start ? (
        <TriviaBoard
          firstQuestion={firstQuestion}
          setStart={setStart}
          userName={userName}
          questionShowedId={questionShowedId}
          setQuestionShowedId={setQuestionShowedId}
        />
      ) : (
        <div className="start-page">
          <h1>Welcome {userName}</h1>
          <h2>Hope you'll enjoy 😃</h2>
          <div className="instruction">
            <h3>Instruction</h3>
            <ul>
              <li>
                Once you clicked the start button the game will start and you
                will have 20 seconds to answer each question.
              </li>
              <li>
                If you answer correct, in the next question you will have 0.5
                second less than the previous question.
              </li>
              <li>You have only one chance to answer correctly</li>
              <li>
                You have only 3 life, once you answer wrong on 3 questions the
                game will be over.
              </li>
            </ul>
          </div>
          <button onClick={highScoreButton}>High scores table</button>
          <button onClick={startButton}>Start</button>
          <div className="high-score-div">
            {clickedHighScore && (
              <table className="high-score-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {highScore.map((obj, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{obj.name}</td>
                      <td>{obj.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
