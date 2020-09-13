import { somethingNew } from "react";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/layout/Nav";
import { useDispatch, useSelector } from "react-redux";
import { loadUser as loadUserAction } from "./actions/authActions";
import UserRoutes from "./components/routing/UserRoutes";
import GuestRoutes from "./components/routing/GuestRoutes";
// setup routes here
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUserAction());
  }, []);
  return (
    <React.Fragment>
      <Router>
        {isAuthenticated && <Nav user={user} />}
        <GuestRoutes />
        {isAuthenticated ? <UserRoutes /> : null}
      </Router>
    </React.Fragment>
  );
}

export default App;
