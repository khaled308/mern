const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");

exports.register = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).send({ success: true, message: "user created successfully" });
});

exports.login = expressAsyncHandler(() => {});
