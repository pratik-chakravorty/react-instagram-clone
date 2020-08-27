const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");
  // check if token is there
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  //   verify token for yo shady folks
  await jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
    if (err) {
      res.status(401).json({ msg: "Token is not valid" });
    } else {
      //   put token in req user object
      req.user = decoded.user;
      next();
    }
  });
};
