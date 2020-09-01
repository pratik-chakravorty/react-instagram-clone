import React from "react";
import styled from "styled-components";
import EditProfile from "./components/EditProfile";
import Container from "./styles/Container";

const AppWrapper = styled.div`
  display: flex;
`;

function App() {
  return (
    <AppWrapper>
      <Container>
        <EditProfile />
      </Container>
    </AppWrapper>
  );
}

export default App;
