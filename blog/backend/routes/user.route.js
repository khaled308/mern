const { register, getUser, login } = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth");
const { registerValidator } = require("../validators/user.validate");

const router = require("express").Router();

router.post("/register", registerValidator, register);
router.post("/login", login);
router.get("/", verifyToken, getUser);

module.exports = router;
