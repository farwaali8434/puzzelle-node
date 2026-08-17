const express = require("express");
const router = express.Router();
const attachUserIfPresent = require("../../middleware/attachUserIfPresent");
const validate = require("../../middleware/validate");
const { updateProgressSchema } = require("./validation");
const { getProgress, updateProgress } = require("./controller");

router.get("/:attemptId", attachUserIfPresent, getProgress);
router.patch("/:attemptId", attachUserIfPresent, validate(updateProgressSchema), updateProgress);

module.exports = router;