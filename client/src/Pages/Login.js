import React, { useState } from "react";
import { useHistory } from "react-router";
import "../App.css";

export default function Login({ userName, setUserName }) {
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const loginButton = (e) => {
    e.preventDefault();
    if (userName === "") {
      setIsError(true);
    } else {
      history.push("/main");
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to the most popular trivia game online</h1>
      <div className="login-div">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username: </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
          />
          <button onClick={(e) => loginButton(e)}>login</button>
          <div className="error-div">
            {isError ? "Please enter username" : ""}
          </div>
        </form>
      </div>
    </div>
  );
}
