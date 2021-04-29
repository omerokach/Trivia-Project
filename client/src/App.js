import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./Pages/Main";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import axios from "axios";

function App() {
  const [userName, setUserName] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  localStorage.setItem("isLogIn", false);

  useEffect(() => {
    setIsLogIn(localStorage.getItem("isLogIn"));
    isLogIn === false ? setIsLogIn(false) : setIsLogIn(true);
  }, []);

  const logOutButton = async () => {
    try {
      await axios.get("/users/logout");
      localStorage.setItem("isLogIn", false);
      document.location.pathname = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="header">
        <h1>Cross Countries Trivia</h1>
        {isLogIn && <button onClick={logOutButton}>Logout</button>}
      </div>
      {/* <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} /> */}
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login setUserName={setUserName} setIsLogIn={setIsLogIn} />
            </Route>
            <Route exact path="/signup">
              <SignUp setUserName={setUserName} setIsLogIn={setIsLogIn} />
            </Route>
            <Route exact path="/main">
              <Main userName={userName} />
            </Route>
            <Route path="/404" component={NotFound} />
            <Route>
              <Redirect to="/404"></Redirect>
            </Route>
          </Switch>
        </Router>
      </div>
      <footer className="footer">
        <small>© Omer Rokach, Dvir Yadai</small>
      </footer>
    </>
  );
}

export default App;
