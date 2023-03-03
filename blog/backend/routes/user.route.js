const { register } = require("../controllers/user.controller");
const { registerValidator } = require("../validators/user.validate");

const router = require("express").Router();

router.post("/register", registerValidator, register);

module.exports = router;
