import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import avatar from "../../static/default_avatar.jpg";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../actions/postActions";
import { toggleSave } from "../../actions/authActions";
import CommentList from "./CommentList";
import PostDetail from "./PostDetail";
import {
  CommentIcon,
  HeartIcon,
  HeartIconFilled,
  InboxIcon,
  BookmarkIcon,
  BookmarkIconFilled,
} from "./Icons";
import styled from "styled-components";

const PostWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  margin-bottom: 60px;
  padding: 1rem 0;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 6rem auto;

  img {
    width: 100%;
  }

  h3 {
    font-size: 14px;
    font-weight: 500;
  }

  p,
  .para-muted {
    font-size: 14px;
    cursor: pointer;
    margin-left: 15px;
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

  .post-content {
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }
`;
function Post(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const contentStyle = { padding: "0", border: "0", width: "60%" };
  const handleLike = () => dispatch(toggleLike(props.post._id));
  const handleSave = () => dispatch(toggleSave(props.post._id));
  return (
    <PostWrapper>
      <div className="post-heading">
        <img src={props.post?.user?.avatar} alt="avatar" />
        <h3>{props.post?.user?.username}</h3>
      </div>
      {props.post?.files[0] && (
        <img src={props.post?.files[0]} alt="detailed-image" />
      )}
      <div className="post-actions">
        <ul>
          <li>
            <CommentIcon />
          </li>
          <li>
            <InboxIcon />
          </li>
          <li className="right">
            {props.post?.likes.includes(user._id) ? (
              <HeartIconFilled onClick={handleLike} />
            ) : (
              <HeartIcon onClick={handleLike} />
            )}
          </li>
          <li>
            {user?.savedPosts?.includes(props.post._id) ? (
              <BookmarkIconFilled onClick={handleSave} />
            ) : (
              <BookmarkIcon onClick={handleSave} />
            )}
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
        <h3>{props.post?.user?.username}</h3>
        <p>{props.post?.caption}</p>
      </div>
      <CommentList comments={props.post.comments} />
      {props.post.commentsCount > 5 && (
        <Popup
          modal={true}
          lockScroll
          trigger={
            <p className="para-muted">
              View all {props.post.commentsCount} comments
            </p>
          }
          {...{ contentStyle }}
          position="center center"
        >
          <PostDetail post={props.post} />
        </Popup>
      )}
      <CommentForm postId={props.post._id} />
    </PostWrapper>
  );
}

export default Post;
