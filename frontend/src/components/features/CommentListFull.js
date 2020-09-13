import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CommentListFullWrapper = styled.div`
  display: flex;
  align-items: start;
  overflow: auto;
  flex-wrap: nowrap;
  padding: 1rem 1.5rem;
  vertical-align: middle;
  img {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .post-content {
    font-size: 15px;
    margin-left: 5px;
    line-height: 1.5;
    font-weight: 300;
    span {
      font-size: 15px;
      font-weight: 500;
      margin-right: 5px;
    }
  }
`;
function CommentListFull({ post: { comments }, commentsRef }) {
  useEffect(() => {
    // scroll to the bottom if comments array changes
    commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
  }, [comments]);
  return comments.map((comment) => (
    <CommentListFullWrapper key={comment._id}>
      <img src={comment.user.avatar} alt="avatar" />
      <div className="post-content">
        <span>{comment.user.username}</span>
        {comment.text}
      </div>
    </CommentListFullWrapper>
  ));
}

CommentListFull.prototypes = {
  post: PropTypes.object.isRequired,
  commentsRef: PropTypes.object.isRequired,
};

export default CommentListFull;
