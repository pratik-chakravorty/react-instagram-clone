const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getPosts = async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({ succcess: true, data: posts });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "comments",
      select: "text",
      popuate: {
        path: "user",
        select: "username avatar",
      },
    })
    .populate({
      path: "user",
      select: "username avatar",
    })
    .lean()
    .exec();

  if (!post) {
    return res.status(404).json({ msg: "No post found" });
  }

  //   is this post belonging to logged-in user?
  post.isMine = req.user.id === post._id.toString();

  //   logged-in user liked the post
  const likes = post.likes.map((like) => like.toString());
  post.isLiked = likes.includes(req.user.id);

  //   logged-in user liked the saved post
  const savedPosts = req.user.savedPosts.map((post) => post.toString());
  post.isSaved = savedPosts.includes(req.params.id);

  //   does the comment belong to logged-in user

  post.comments.forEach((comment) => {
    comment.isCommentMine = false;

    const userString = comment.user._id.toString();
    if (userString === req.user.id) {
      comment.isCommentMine = true;
    }
  });

  res.status(200).json({ success: true, data: post });
};

exports.deletePost = async (req, res) => {};
