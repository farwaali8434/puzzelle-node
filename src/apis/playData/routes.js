const express = require("express");
const router = express.Router();
const attachUserIfPresent = require("../../middleware/attachUserIfPresent");
const validate = require("../../middleware/validate");
const {
  createPlaySchema,
  updatePlaySchema,
} = require("./validation");
const isAuth = require("../../middleware/isAuth")
const { getCurrentPlay, createPlay, updatePlay, myPlays } = require("./controller");

router.get("/current", getCurrentPlay);
router.post("/", attachUserIfPresent, validate(createPlaySchema), createPlay);
router.patch("/:id", validate(updatePlaySchema), updatePlay);
router.get("/my", isAuth, myPlays);

module.exports = router;