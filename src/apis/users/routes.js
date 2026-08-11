const express = require("express");
const router = express.Router();
const { signup } = require("./controller");
const validate = require("../../middleware/validate");
const { signupSchema } = require("./validation");

router.post("/signup", validate(signupSchema), signup);

module.exports = router;