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
import { useState } from "react";
import Header from "./Components/Header";

function App() {
  const [userName, setUserName] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <>
        <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
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
