const Joi = require("joi");

const updateProgressSchema = Joi.object({
  sessionId: Joi.string().optional(),
  progress: Joi.number().required(),
  pieces: Joi.array()
    .items(
      Joi.object({
        pieceId: Joi.number().required(),
        position: Joi.object({
          x: Joi.number().required(),
          y: Joi.number().required(),
        }).required(),
        placed: Joi.boolean().required(),
        placedAt: Joi.date().optional(),
      })
    )
    .min(1)
    .required(),
});

module.exports = { updateProgressSchema };