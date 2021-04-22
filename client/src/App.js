import "./App.css";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
