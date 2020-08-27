const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    // check if fullname is empty
    check("fullname", "Fullname is required").not().isEmpty(),

    // check if username is empty
    check("username", "Username is required").not().isEmpty(),

    // check if email is in proper format
    check("email", "Please include a valid email").isEmail(),

    // check password length is min 6 characters
    check(
      "password",
      "Please enter password with more than 5 characters"
    ).isLength({ min: 5 }),
  ];
};

const postValidationRules = () => {
  return [
    // check if caption is present
    check("caption", "Caption is required").not().isEmpty(),
  ];
};

const commentValidationRules = () => {
  return [check("text", "Comment text is required").not().isEmpty()];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // no errors continue
    next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  postValidationRules,
  commentValidationRules,
  validate,
};
