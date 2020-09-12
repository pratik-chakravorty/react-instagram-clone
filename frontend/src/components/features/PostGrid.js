import React from "react";
import styled from "styled-components";

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;
const Image = styled.img`
  width: 214px;
  height: 214px;
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
