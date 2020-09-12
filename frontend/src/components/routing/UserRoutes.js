import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Upload from "../pages/Upload";

function UserRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/feed" component={Feed} />
      <PrivateRoute path="/new" component={Upload} />
      <PrivateRoute path="/editProfile" component={EditProfile} />
      <PrivateRoute path="/:userName" component={Profile} />
    </Switch>
  );
}

export default UserRoutes;
