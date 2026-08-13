const Joi = require("joi");

const createPuzzleSchema = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().required(),
  cut: Joi.string().required(),
  pieces: Joi.number().required(),
  gift: Joi.boolean().required(),
  visibility: Joi.when("gift", {
    is: true,
    then: Joi.valid("private").required(),
    otherwise: Joi.string().valid("public", "private").required(),
  }),
  personalize: Joi.when("gift", {
    is: true,
    then: Joi.object({
      sender: Joi.string().required(),
      receiver: Joi.string().required(),
      mystery: Joi.boolean().required(),
      note: Joi.string().required(),
      subject: Joi.string().required(),
      theme: Joi.string().required(),
    }).required(),
    otherwise: Joi.valid(null),
  }),
  tags: Joi.array().items(Joi.string()).min(1).required(),
});

const editPuzzleSchema = Joi.object({
  image: Joi.string().optional(),
  name: Joi.string().optional(),
  cut: Joi.string().optional(),
  pieces: Joi.number().optional(),
  gift: Joi.boolean().optional(),
  visibility: Joi.string().valid("public", "private").optional(),
  personalize: Joi.object({
    sender: Joi.string().optional(),
    receiver: Joi.string().optional(),
    mystery: Joi.boolean().optional(),
    note: Joi.string().optional(),
    subject: Joi.string().optional(),
    theme: Joi.string().optional(),
  })
    .allow(null)
    .optional(),
  tags: Joi.array().items(Joi.string()).min(1).optional(),
});

module.exports = {
  createPuzzleSchema, editPuzzleSchema
};
