import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { fetchPosts as fetchPostsAction } from "../../actions/postActions";

function ShowPosts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, []);
  const { loading, posts } = useSelector((state) => state.posts);
  if (loading) return <div>Loading...</div>;
  return posts.map((post) => <Post key={post._id} post={post} />);
}

export default ShowPosts;
