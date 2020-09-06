import React from "react";
import Container from "../../styles/Container";
import ShowPosts from "../features/ShowPosts";

function Feed() {
  return (
    <div style={{ marginTop: "100px" }}>
      <Container width={"600px"}>
        <ShowPosts />
      </Container>
    </div>
  );
}

export default Feed;
