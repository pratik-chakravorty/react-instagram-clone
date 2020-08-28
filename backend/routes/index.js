const express = require("express");
const router = express.Router();
const { catchErrors } = require("../middlewares/errorHandler");
const {
  userValidationRules,
  loginValidationRules,
  postValidationRules,
  validate,
} = require("../middlewares/validator");

const auth = require("../middlewares/auth");
const {
  getUsers,
  getUser,
  follow,
  unfollow,
  feed,
  searchUser,
  updateUser,
} = require("../controllers/userController");

const {
  getPosts,
  getPost,
  addPost,
  deletePost,
  toggleLike,
  toggleSave,
  addComment,
  deleteComment,
  searchPost,
} = require("../controllers/postController");

const {
  register,
  login,
  currentUser,
} = require("../controllers/authController");

// Auth Routes

// Sign up a new User
router.post("/auth/register", userValidationRules(), validate, register);

// Login a new User
router.post(
  "/auth/login",
  loginValidationRules(),
  validate,
  catchErrors(login)
);

// Get Current User
router.get("/auth/me", catchErrors(auth), catchErrors(currentUser));

// User Routes

// Get Users
router.get("/users/getUsers", catchErrors(auth), catchErrors(getUsers));

// Get a single User
router.get("/users/getUser/:username", catchErrors(auth), catchErrors(getUser));

// Follow a user
router.get("/users/follow/:id", catchErrors(auth), catchErrors(follow));

// Unfollow a user
router.get("/users/unfollow/:id", catchErrors(auth), catchErrors(unfollow));

// Feed
router.get("/users/feed", catchErrors(auth), catchErrors(feed));

// Search User
router.get("/users/search", catchErrors(auth), catchErrors(searchUser));

// Update User
router.put("/users/update", catchErrors(auth), catchErrors(updateUser));

// Post Routes

// Get Posts
router.get("/posts/getPosts", catchErrors(auth), catchErrors(getPosts));

// Get Single Post
router.get("/posts/getPost/:id", catchErrors(auth), catchErrors(getPost));

// Delete a Post
router.delete("/posts/delete/:id", catchErrors(auth), catchErrors(deletePost));

// Toggle Like
router.get("/posts/toggleLike/:id", catchErrors(auth), catchErrors(toggleLike));

// Toggle Save
router.get("/posts/toggleSave/:id", catchErrors(auth), catchErrors(toggleSave));

// Add Post
router.post(
  "/posts/addPost",
  postValidationRules(),
  validate,
  catchErrors(auth),
  catchErrors(addPost)
);

// Add Comment
router.post(
  "/posts/addComment/:id",
  catchErrors(auth),
  catchErrors(addComment)
);

// Delete a Comment
router.delete(
  "/posts/deleteComment/:id/:commentId",
  catchErrors(auth),
  catchErrors(deleteComment)
);

// Search Post
router.get("/posts/search", catchErrors(auth), catchErrors(searchPost));

module.exports = router;
