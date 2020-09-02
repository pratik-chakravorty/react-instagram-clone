import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Feed from "../pages/Feed";
import Nav from "../layout/Nav";

function HomeRoutes() {
  return (
    <Router>
      <Switch>
        <Nav />
        <PrivateRoute exact path="/feed" component={Feed} />
      </Switch>
    </Router>
  );
}

export default HomeRoutes;
