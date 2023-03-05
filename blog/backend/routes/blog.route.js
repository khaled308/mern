const {
  store,
  get,
  show,
  edit,
  del,
} = require("../controllers/blog.controller");
const { verifyToken, isAuthorized } = require("../middleware/auth");
const {
  addBlogValidator,
  getBlogValidator,
  updateBlogValidator,
} = require("../validators/blog.validate");

const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, addBlogValidator, store)
  .get(verifyToken, get);

router
  .route("/:id")
  .get(verifyToken, getBlogValidator, show)
  .put(verifyToken, isAuthorized, updateBlogValidator, edit)
  .delete(verifyToken, del);
module.exports = router;
