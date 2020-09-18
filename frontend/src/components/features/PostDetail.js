import React from "react";
import styled from "styled-components";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import CommentListFull from "./CommentListFull";

const PostDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 900px;
  height: 700px;
`;

const Image = styled.img`
  width: 100%;
  height: 700px;
  padding: 0;
  margin-right: 10px;
  object-fit: cover;
  background-position: center center;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  .overflow-container {
    height: 60vh;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 0px; /* Remove scrollbar space */
      background: transparent; /* Optional: just make scrollbar invisible */
    }
  }
  .post-heading {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    h3 {
      font-size: 15px;
      font-weight: 500;
    }
    img {
      border-radius: 50%;
      width: 15%;
      margin-right: 10px;
    }
  }
  .post-content-container {
    display: flex;
    align-items: start;
    flex-wrap: nowrap;
    padding: 1rem 1.5rem;
    vertical-align: middle;
    img {
      border-radius: 50%;
      width: 15%;
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
  }
  .post-actions {
    padding: 1rem 0.5rem;
    width: 100%;
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
    li:last-child {
      margin-right: none;
    }
  }
  .likes {
    display: flex;
    padding: 0 0.5rem;
    align-items: center;
    img {
      width: 10%;
      border-radius: 50%;
      height: 100%;
      margin-right: 4px;
    }
  }
`;

function PostDetail({ post }) {
  const commentsRef = React.useRef();
  return (
    <PostDetailWrapper>
      <Image src={post.files[0]} alt="image" />
      <Content>
        <div className="post-heading">
          <img src={post.user.avatar} alt="avatar" />
          <h3>{post.user.username}</h3>
        </div>
        <div className="overflow-container" ref={commentsRef}>
          <div className="post-content-container">
            <img src={post.user.avatar} alt="avatar" />
            <div className="post-content">
              <span>{post.user.username}</span>
              {post.caption} Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Perspiciatis necessitatibus harum accusantium. Repudiandae
              mollitia incidunt iste sunt, repellat nam ipsum pariatur omnis,
              corporis est neque vitae eos eligendi, reiciendis sequi!
            </div>
          </div>
          <CommentListFull post={post} commentsRef={commentsRef} />
        </div>
        <div className="post-actions">
          <PostActions post={post} />
        </div>
        <div className="likes">
          <img src={post.user.avatar} alt="avatar" />
          <p>
            Liked by <strong>user123</strong> and 567 others
          </p>
        </div>
        <CommentForm postId={post._id} commentsRef={commentsRef} />
      </Content>
    </PostDetailWrapper>
  );
}

export default PostDetail;
