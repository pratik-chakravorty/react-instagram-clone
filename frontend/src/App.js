import React from "react";
import { useSelector } from "react-redux";
import UserRoutes from "./components/routing/UserRoutes";
import GuestRoutes from "./components/routing/GuestRoutes";

// setup routes here
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <GuestRoutes />
      {isAuthenticated ? <UserRoutes /> : null}
    </React.Fragment>
  );
}

export default App;
