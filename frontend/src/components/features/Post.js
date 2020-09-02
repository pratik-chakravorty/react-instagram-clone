import React from "react";
import detailed from "../../static/detailed_post.jpg";
import avatar from "../../static/default_avatar.jpg";
import { CommentIcon, HeartIcon, InboxIcon, BookmarkIcon } from "./Icons";
import styled from "styled-components";

const PostWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  margin-bottom: 60px;
  padding: 1rem 0;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 6rem auto;

  h3 {
    font-size: 14px;
    font-weight: 500;
  }

  p,
  .para-muted {
    font-size: 14px;
    margin-left: 15px;
  }

  input {
    border: none;
    width: 100%;
    height: 100%;
  }

  .post-heading {
    display: flex;
    padding: 1rem 1.5rem;
    align-items: center;
    img {
      border-radius: 50%;
      width: 5%;
      height: 5%;
      margin-right: 10px;
    }
  }

  .post-actions {
    padding: 1rem 1rem;
    margin-right: auto;
    ul {
      display: flex;
      list-style-type: none;
    }
    li {
      margin-right: 10px;
    }
    .right {
      margin-right: auto;
    }
  }

  .likes {
    display: flex;
    padding: 0 1rem;
    align-items: center;
    img {
      width: 4%;
      height: 4%;
      margin-right: 4px;
    }
  }

  .post-content,
  .post-comment,
  .comment-input {
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }
`;
function Post() {
  return (
    <PostWrapper>
      <div className="post-heading">
        <img src={avatar} alt="avatar" />
        <h3>Post Example</h3>
      </div>
      <img src={detailed} alt="detailed-image" />
      <div className="post-actions">
        <ul>
          <li>
            <CommentIcon />
          </li>
          <li>
            <InboxIcon />
          </li>
          <li className="right">
            <HeartIcon />
          </li>
          <li>
            <BookmarkIcon />
          </li>
        </ul>
      </div>
      <div className="likes">
        <img src={avatar} alt="avatar" />
        <p>
          Liked by <strong>user123</strong> and 567 others
        </p>
      </div>
      <div className="post-content">
        <h3>Post Example</h3>
        <p>Caption Content goes here....and I hope its good.</p>
      </div>
      <div className="post-comment">
        <h3>user123</h3>
        <p>Some awesome comment here</p>
      </div>
      <div className="post-comment">
        <h3>someguy123</h3>
        <p>Some posting here</p>
      </div>
      <p class="para-muted">View all 455 comments</p>
      <div className="comment-input">
        <br />
        <input type="text" placeholder="Add Comment" />
      </div>
    </PostWrapper>
  );
}

export default Post;
