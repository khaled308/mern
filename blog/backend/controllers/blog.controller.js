const expressAsyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

exports.store = expressAsyncHandler(async (req, res) => {
  const { title, description, content } = req.body;

  const blog = await Blog.create({
    title,
    description,
    content,
    user: req.userId,
  });

  res
    .status(201)
    .send({ success: true, message: "blog created successfully", blog });
});

exports.get = expressAsyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const blogsCount = await Blog.countDocuments();
  const blogs = await Blog.find()
    .skip(skip)
    .limit(limit)
    .populate({ path: "user", select: "name" });

  const pagination = {
    page,
    limit,
    blogsCount,
  };

  res.status(200).send({ success: true, blogs, pagination });
});
