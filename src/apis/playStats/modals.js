const playStatsSchema = require("./schema")
const TABLE_NAME = require('./constants.js')
const mongoose = require("mongoose");

const PlayStatsModal = mongoose.model("playStats", playStatsSchema, TABLE_NAME);

module.exports =PlayStatsModal

