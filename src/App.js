import React, { Component } from "react";
import "./App.css";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import NotFoundPage from "./pages/404";

//Import all needed Component for this tutorial
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

class App extends Component {
  componentDidMount() {
    document.body.style.background = "#252525";
  }

  render() {
    return (
      <Router>
        {/*All our Routes goes here!*/}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
