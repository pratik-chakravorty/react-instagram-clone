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

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  if (post.user.toString() !== req.user.id) {
    return res
      .status(401)
      .json({ msg: "You are not authorized to delete the post" });
  }

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { posts: req.params.id },
    $inc: { postCount: -1 },
  });

  await post.remove();

  res.status(200).json({ success: true, msg: "Post deleted successfully" });
};

exports.addPost = async (req, res) => {
  const { caption, files, tags } = req.body;
  const user = req.user.id;

  let post = await Post.create({ caption, files, tags });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { posts: post._id },
    $inc: { postCount: 1 },
  });

  post = await post
    .populate({ path: "use", select: "avatar username fullname" })
    .execPopulate();

  res.status(200).json({ success: true, data: post });
};

exports.toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ msg: "Post does not exist" });
  }

  if (post.likes.includes(req.user.id)) {
    const index = post.likes.indexOf(req.user.id);
    post.likes.splice(index, 1);
    post.likesCount = post.likesCount - 1;
    await post.save();
  } else {
    post.likes.push(req.user.id);
    post.likesCount = post.likesCount + 1;
    await post.save();
  }

  res.status(200).json({ success: true, msg: "Post liked successfully" });
};

exports.addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found!" });
  }

  let comment = await Comment.create({
    user: req.user.id,
    post: req.params.id,
    text: req.body.text,
  });

  post.comments.push(comment._id);
  post.commentsCount = post.commentsCount + 1;
  await post.save();

  comment = await comment.populate({
    path: "user",
    select: "avatar username fullname",
  });

  res.status(200).json({ success: true, data: comment });
};

exports.deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  let comment = await Comment.findOne({
    _id: req.params.commentId,
    post: req.params.id,
  });

  if (!comment) {
    return res.status(404).json({ msg: "No comment found" });
  }

  if (comment.user.toString() !== req.user.id) {
    return res
      .status(401)
      .json({ msg: "Not authorized to delete the comment" });
  }

  // remove the comment from the post
  const index = post.comments.indexOf(comment._id);
  post.comments.splice(index, 1);
  post.commentsCount = post.commentsCount - 1;
  await post.save();

  await comment.remove();

  res.status(200).json({ success: true, msg: "Comment deleted successfully" });
};

exports.searchPost = async (req, res) => {
  if (!req.query.caption && !req.quer.tag) {
    return res
      .status(404)
      .json({ msg: "Please enter either caption or tag for search." });
  }

  let posts = [];

  if (req.query.caption) {
    const regex = new RegExp(req.query.caption, "i");
    posts = await Post.find({ caption: regex });
  }

  if (req.query.tag) {
    posts = posts.concat([await Post.find({ tags: req.query.tags })]);
  }

  res.status(200).json({ success: true, data: post });
};

exports.toggleSave = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "No post found" });
  }

  const { user } = req;

  if (user.savedPosts.includes(req.params.id)) {
    console.log("removing saved post");
    await User.findByIdAndUpdate(user.id, {
      $pull: { savedPosts: req.params.id },
    });
  } else {
    console.log("adding the saved post");
    await User.findByIdAndUpdate(user.id, {
      $push: { savedPosts: req.params.id },
    });
  }

  req.status(200).json({ success: true, msg: "Post saved successfully" });
};
