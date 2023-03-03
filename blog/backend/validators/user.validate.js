const { check } = require("express-validator");
const User = require("../models/User");
const validate = require("../middleware/validate");

exports.registerValidator = [
  check("name").notEmpty().isLength({ min: 2 }).withMessage("min length is 2"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
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
