const { store, get } = require("../controllers/blog.controller");
const { verifyToken } = require("../middleware/auth");
const { addBlogValidator } = require("../validators/blog.validate");

const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, addBlogValidator, store)
  .get(verifyToken, get);

module.exports = router;
