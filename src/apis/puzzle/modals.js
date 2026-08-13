const TABLE_NAME = require('./constants.js')
const mongoose = require("mongoose");
const puzzleSchema = require("./schema.js");

const PuzzleModal = mongoose.model("Puzzle", puzzleSchema, TABLE_NAME);

module.exports = PuzzleModal;