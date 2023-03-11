const { validationResult } = require("express-validator");

const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: errors.array().map(({ msg }) => msg), success: false });
  }
  next();
};

module.exports = validate;
