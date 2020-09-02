import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function HomeRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default HomeRoutes;
