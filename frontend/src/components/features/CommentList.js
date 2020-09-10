import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  padding: 0 1rem;
  display: flex;
  align-items: center;
`;
function CommentList({ comments }) {
  return comments.slice(-2).map((comment) => (
    <CommentWrapper key={comment._id}>
      <h3>{comment.user.username}</h3>
      <p>{comment.text}</p>
    </CommentWrapper>
  ));
}

export default CommentList;
