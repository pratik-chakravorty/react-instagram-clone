import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Feed from "../pages/Feed";
import Upload from "../pages/Upload";

function UserRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/feed" component={Feed} />
      <PrivateRoute path="/new" component={Upload} />
    </Switch>
  );
}

export default UserRoutes;
