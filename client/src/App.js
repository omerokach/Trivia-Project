import "./App.css";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <>
      <div className="header">
        <h1>Cross Countries Trivia</h1>
      </div>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login userName={userName} setUserName={setUserName} />
            </Route>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/main">
              <Main userName={userName} />
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
