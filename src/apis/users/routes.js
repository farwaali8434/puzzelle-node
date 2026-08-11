const express = require("express");
const router = express.Router();
const { signup, login, forgotPassword, resetPassword, updateUser, getUser, changePassword } = require("./controller");
const validate = require("../../middleware/validate");
const isAuth = require("../../middleware/isAuth");
const { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, updateUserSchema, changePasswordSchema } = require("./validation");

router.post("/signup", validate(signupSchema), signup);
router.post("/login",validate(loginSchema), login);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password",validate(resetPasswordSchema),  resetPassword);
router.get("/me", isAuth, getUser);
router.put("/me", isAuth, validate(updateUserSchema), updateUser);
router.put("/me/password", isAuth, validate(changePasswordSchema), changePassword);
module.exports = router;