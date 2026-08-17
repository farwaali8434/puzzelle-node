const playStatsSchema = require("./schema")
const TABLE_NAME = require('./constants.js')
const mongoose = require("mongoose");

const PlayStatsModal = mongoose.modal("playStats", playStatsSchema, TABLE_NAME);

module.exports =PlayStatsModal

