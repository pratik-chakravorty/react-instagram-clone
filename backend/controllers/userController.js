const User = require("../models/User");
const Post = require("../models/Post");

exports.getUsers = async (req, res) => {
  // get all users excluding their passwords
  let users = await User.find().select("-password").lean().exec();

  users.forEach((user) => {
    user.isFollowing = false;
    // get followers of each  of the users
    const followers = user.followers.map((follower) => follower._id.toString());
    // check if the user is following current logged in user (req.user)
    if (followers.includes(req.user.id)) {
      user.isFollowing = true;
    }
  });

  //   exlcude the currently logged in user from the list
  users = users.filter((user) => user._id.toString() !== req.user.id);

  //   send result back
  res.status(200).json({ success: true, data: users });
};

exports.getUser = async (req, res) => {
  const reqUser = await User.findById(req.user.id);
  const user = await User.findOne({ username: req.params.username })
    .select("-password")
    .populate({
      path: "posts",
      select: "caption files commentsCount likesCount",
    })
    .populate({
      path: "savedPosts",
      select: "caption files commentsCount likesCount",
    })
    .populate({ path: "followers", select: "avatar username fullname" })
    .populate({ path: "following", select: "avatar username fullname" })
    .lean()
    .exec();

  if (!user) {
    return res.status(404).json({ msg: `Username not found` });
  }

  user.isFollowing = false;
  const followers = user.followers.map((follower) => follower._id.toString());
  //   feed this to the followers list
  user.followers.forEach((follower) => {
    follower.isFollowing = false;
    // if currently logged in user is following
    if (reqUser.following.includes(follower._id.toString())) {
      follower.isFollowing = true;
    }
  });

  //   feed this to the following list
  user.following.forEach((user) => {
    user.isFollowing = false;
    if (reqUser.following.includes(user._id.toString())) {
      user.isFollowing = true;
    }
  });

  //   check if the currently logged-in user is following the getUser
  if (followers.includes(req.user.id)) {
    user.isFollowing = true;
  }

  user.isMe = req.user.id === user._id.toString();

  res.status(200).json({ success: true, data: user });
};

exports.follow = async (req, res) => {
  // make sure the user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ msg: "No user found" });
  }

  //   make sure the user is not following himself/herself
  if (req.params.id === req.user.id) {
    return res.status(400).json({ msg: "You cannot follow yourself" });
  }

  //   allow following if the user is not following already
  if (user.followers.includes(req.user.id)) {
    return res.status(400).json({ msg: "You are already following the user" });
  }

  //   add the logged in user to the other user as a follower and increment followersCount
  await User.findByIdAndUpdate(req.params.id, {
    $push: { followers: req.user.id },
    $inc: { followersCount: 1 },
  });
  //   add the other user as a following to the currently logged-in user and incrememnt followingCount
  await User.findByIdAndUpdate(req.user.id, {
    $push: { following: req.params.id },
    $inc: { followingCount: 1 },
  });

  res.status(200).json({ success: true, msg: "User followed successfully!" });
};

exports.unfollow = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(400).json({ msg: "No user found" });
  }

  // make sure the user is not the logged-in user
  if (req.params.id === req.user.id) {
    return res.status(400).json({ msg: "You cannot unfollow yourself" });
  }

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user.id },
    $inc: { followersCount: -1 },
  });

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: req.params.id },
    $inc: { followingCount: -1 },
  });

  res
    .status(200)
    .json({ success: true, msg: "Successfully unfollowed the user" });
};

exports.feed = async (req, res) => {
  const reqUser = await User.findById(req.user.id);
  const following = reqUser.following;

  // get the users from  the followers
  const users = await User.find()
    .where("_id")
    .in(following.concat([req.user.id]))
    .exec();

  const postIds = users.map((user) => user.posts).flat();

  const posts = await Post.find()
    .populate({
      path: "comments",
      select: "text",
      populate: { path: "user", select: "avatar fullname username" },
    })
    .populate({ path: "user", select: "avatar fullname username" })
    .sort("-createdAt")
    .where("_id")
    .in(postIds)
    .lean()
    .exec();

  posts.forEach((post) => {
    // did the logged in user liked the post?
    post.isLiked = false;
    const likes = post.likes.map((like) => like.toString());
    if (likes.includes(req.user.id)) {
      post.isLiked = true;
    }

    // did the logged in user save this post
    post.isSaved = false;
    const savedPosts = req.user.savedPosts.map((post) => post.toString());
    if (savedPosts.includes(post._id)) {
      post.isSaved = true;
    }
    // does this post belong to the logged-in user
    post.isMine = false;
    if (post.user._id.toString() === req.user.id) {
      post.isMine = true;
    }

    // does the comment belong to the logged-in user
    post.comments.map((comment) => {
      comment.isCommentMine = false;
      if (comment.user._id.toString() === req.user.id) {
        comment.isCommentMine = true;
      }
    });
  });

  res.status(200).json({ success: true, data: posts });
};

exports.searchUser = async (req, res) => {
  if (!req.query.username) {
    return res.status(400).json({ msg: "The username cannot be empty" });
  }

  const regex = new RegExp(req.query.username, "i");
  const users = await User.find({ username: regex });

  res.status(200).json({ success: true, data: users });
};

exports.updateUser = async (req, res) => {
  const { avatar, username, fullname, bio, website, email } = req.body;

  const updateFields = {};
  if (avatar) updateFields.avatar = avatar;
  if (username) updateFields.username = username;
  if (fullname) updateFields.fullname = fullname;
  if (email) updateFields.email = email;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: { ...updateFields, website, bio },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("avatar username fullname email bio website");

  res.status(200).json({ success: true, data: user });
};
