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
function PhotoGrid({ items }) {
  return (
    <PostWrapper>
      {items.map((item) => (
        <div>
          {" "}
          <Image src={item.files[0]} />
        </div>
      ))}
    </PostWrapper>
  );
}

export default PhotoGrid;
