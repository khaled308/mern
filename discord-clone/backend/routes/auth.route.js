const { register, login, getUser } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth");
const { registerValidator } = require("../validators/auth.validate");

const router = require("express").Router();

router.post("/register", registerValidator, register);
router.post("/login", login);
router.get("/", verifyToken, getUser);

module.exports = router;
