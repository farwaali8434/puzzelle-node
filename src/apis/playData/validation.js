const Joi = require("joi");

const createPlaySchema = Joi.object({
  playerType: Joi.string().valid("registered", "anonymous").required(),
  sessionId: Joi.when("playerType", {
    is: "anonymous",
    then: Joi.string().required(),
    otherwise: Joi.valid(null),
  }),
  puzzleId: Joi.string().required(),
});

const updatePlaySchema = Joi.object({
  duration: Joi.number().positive().required(),
  status: Joi.string().valid("started", "completed").optional(),
});

module.exports = { createPlaySchema, updatePlaySchema };