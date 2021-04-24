import React, { useState } from "react";
import "../App.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [isError, setIsError] = useState(false);
  const loginButton = (e) => {
    if (userName === "") {
      e.preventDefault();
      setIsError(true);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to the most popular trivia game online</h1>
      <div className="login-div">
        <h2>Login</h2>
        <form action="/main">
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
