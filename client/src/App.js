import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import Header from "./Components/Header";
import Main from "./Pages/Main";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login setUserName={setUserName} setIsLogin={setIsLogin} />
            </Route>
            <Route exact path="/signup">
              <SignUp setUserName={setUserName} setIsLogin={setIsLogin} />
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
