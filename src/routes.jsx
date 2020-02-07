import React from "react";
import { Route } from "react-router";
import App from "./app";
import Home from "./views/home";

export default (
  <Route path="/" component={App}>
    <Route exact path="/" component={Home} />
    <Route path="*" component={Home} />
  </Route>
);
