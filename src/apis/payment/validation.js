const Joi = require("joi");

const createPaymentSchema = Joi.object({
  puzzleId: Joi.string().required(),
  price: Joi.number().positive().required(),
});

module.exports = { createPaymentSchema };