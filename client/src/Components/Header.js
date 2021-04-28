import React from "react";
import axios from "axios";

export default function Header({ isLogin, setIsLogin }) {
  const logOutButton = async () => {
    try {
      await axios.get("/users/logout");
      document.location.pathname = "/";
      setIsLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Cross Countries Trivia</h1>
        {isLogin && <button onClick={logOutButton}>Log out</button>}
      </div>
    </div>
  );
}
