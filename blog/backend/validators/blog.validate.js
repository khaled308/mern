const { check } = require("express-validator");
const validate = require("../middleware/validate");

exports.addBlogValidator = [
  check("title").notEmpty().isLength({ min: 2 }).withMessage("min length is 2"),

  check("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("min length is 10"),
  validate,
];
