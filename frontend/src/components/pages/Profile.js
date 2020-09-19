import React from "react";
import Container from "../../styles/Container";
import UserProfile from "../features/UserProfile";

function Profile(props) {
  return (
    <Container>
      <UserProfile {...props} />
    </Container>
  );
}

export default Profile;
