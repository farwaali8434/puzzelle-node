const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth");
const {
  getPuzzleStats,
  getMyPuzzleStats,
} = require("./controller");

router.get("/mine", isAuth, getMyPuzzleStats);
router.get("/:puzzleId", getPuzzleStats);

module.exports = router;