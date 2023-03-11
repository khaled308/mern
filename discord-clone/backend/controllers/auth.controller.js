const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (userId) => jwt.sign({ userId }, process.env.TOKEN_SECRET);

exports.register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });

  const { password: userPassword, ...data } = user._doc;
  data.token = signToken(user._id);

  res
    .status(201)
    .send({ success: true, message: "user created successfully", data });
});

exports.login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const result = await bcrypt.compare(password, user?.password || "");

  if (!result)
    return res
      .status(400)
      .send({ success: false, message: ["email or password not correct"] });

  const { password: userPassword, ...data } = user._doc;
  data.token = signToken(user._id);

  res
    .status(201)
    .send({ success: true, message: "user login successfully", data });
});

exports.getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  const { password: userPassword, ...data } = user._doc;

  res
    .status(200)
    .send({ success: true, message: "user created successfully", data });
});
