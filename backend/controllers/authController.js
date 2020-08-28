const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ errors: [{ msg: "User already exists!" }] });
  } else {
    //create user obj
    user = new User({ fullname, username, email, password });
    //generate hash
    const salt = await bcrypt.genSalt(5);
    user.password = await bcrypt.hash(password, salt);
    //save user to DB
    await user.save();

    //sign jwt and send a token response
    const payload = {
      user: {
        id: user._id,
      },
    };

    //sign jwt -> change the expiration in 1 hour or more
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  //check if user exists
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
  //compare password with hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
  //sign jwt and send token as a response
  const payload = {
    user: {
      id: user.id,
    },
  };
  //sign jwt
  jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

exports.currentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "avatar username fullname email _id website bio"
  );
  res.status(200).json(user);
};
