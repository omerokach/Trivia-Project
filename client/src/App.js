import "./App.css";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");

  return (
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
  );
}

export default App;
