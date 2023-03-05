const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.verifyToken = expressAsyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  const tokenArr = token?.split(" ");

  jwt.verify(
    token && tokenArr[1],
    process.env.TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        const error = new AppError("token not valid", 403);
        return next(error);
      }

      req.userId = decoded.userId;
    }
  );
  next();
});

exports.isAuthorized = expressAsyncHandler(async (req, res, next) => {
  const id = req.body.user._id;
  if (String(req.userId) != String(id)) {
    const error = new AppError("You are not allowed", 403);
    return next(error);
  }
  next();
});
