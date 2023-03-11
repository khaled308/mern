const { check } = require("express-validator");
const validate = require("../middlewares/validate");
const User = require("../models/User");

exports.registerValidator = [
  check("username")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("min length is 2")
    .custom(async (val) => {
      const user = await User.findOne({ username: val });

      if (user) {
        return Promise.reject("username already in use");
      }
    }),

  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("email not valid")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });

      if (user) {
        return Promise.reject("E-mail already in use");
      }
    }),

  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 chars"),

  validate,
];
