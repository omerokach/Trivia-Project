import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

function Header({ isLogIn, setIsLogIn }) {
  const history = useHistory();
  const logOutButton = async () => {
    try {
      await axios.get("/users/logout");
      setIsLogIn(false);
      document.location.pathname = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="header">
      <h1>Cross Countries Trivia</h1>
      {isLogIn && <button onClick={logOutButton}>Logout</button>}
    </div>
  );
}

export default Header;
