import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../actions/postActions";
import { toggleSave } from "../../actions/authActions";
import {
  CommentIcon,
  HeartIcon,
  HeartIconFilled,
  InboxIcon,
  BookmarkIcon,
  BookmarkIconFilled,
} from "./Icons";

function PostActions({ post }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLike = () => dispatch(toggleLike(post._id));
  const handleSave = () => dispatch(toggleSave(post._id));
  return (
    <ul>
      <li>
        <CommentIcon />
      </li>
      <li>
        <InboxIcon />
      </li>
      <li className="right">
        {post?.likes.includes(user._id) ? (
          <HeartIconFilled onClick={handleLike} />
        ) : (
          <HeartIcon onClick={handleLike} />
        )}
      </li>
      <li>
        {user?.savedPosts.includes(post._id) ? (
          <BookmarkIconFilled onClick={handleSave} />
        ) : (
          <BookmarkIcon onClick={handleSave} />
        )}
      </li>
    </ul>
  );
}

export default PostActions;
