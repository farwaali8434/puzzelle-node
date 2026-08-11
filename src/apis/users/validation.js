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
      "string.pattern.base": "Password must include at least 1 letter and 1 number",
    }),
});

module.exports = { signupSchema };