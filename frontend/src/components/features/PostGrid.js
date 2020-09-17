import React from "react";
import styled from "styled-components";

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 320px);
  grid-gap: 10px;
`;
const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
function PostGrid({ posts }) {
  return (
    <PostWrapper>
      {posts.map((post) => (
        <div>
          {" "}
          <Image src={post.files[0]} />
        </div>
      ))}
    </PostWrapper>
  );
}

export default PostGrid;
