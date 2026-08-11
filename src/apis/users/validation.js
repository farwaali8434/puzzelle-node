const Joi = require("joi");

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-=_+.,;:<>?{}[\]]{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must include at least 1 letter and 1 number",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-=_+.,;:<>?{}[\]]{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must include at least 1 letter and 1 number",
    }),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
});

const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-=_+.,;:<>?{}[\]]{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must include at least 1 letter and 1 number",
    }),
  oldPassword: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateUserSchema,
  changePasswordSchema,
};
