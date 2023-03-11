const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
