const expressAsyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

exports.store = expressAsyncHandler(async (req, res) => {
  const { title, description, content } = req.body;

  const blog = await Blog.create({
    title,
    description,
    content,
    author: req.userId,
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
    .populate({ path: "author", select: "name" });

  const pagination = {
    page,
    limit,
    blogsCount,
  };

  res.status(200).send({ success: true, blogs, pagination });
});

exports.show = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate({
    path: "author",
    select: "name",
  });

  if (!blog)
    res.status(404).send({ success: false, errors: ["blog not Found"] });
  res
    .status(201)
    .send({ success: true, message: "blog created successfully", blog });
});

exports.edit = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, content } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    id,
    { title, description, content },
    { new: true }
  );

  res
    .status(201)
    .send({ success: true, message: "blog updated successfully", blog });
});

exports.del = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (String(blog.author) != String(req.userId))
    return res
      .status(403)
      .send({ success: false, errors: ["you are not allowed"] });

  await blog.deleteOne();

  res.status(200).send({ success: true, message: "blog deleted successfully" });
});
