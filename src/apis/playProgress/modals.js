const playProgressSchema = require("./schema")
const TABLE_NAME = require('./constants.js')
const mongoose = require("mongoose");

const PlayStatsModal = mongoose.modal("playProgress", playProgressSchema, TABLE_NAME);

module.exports = PlayProgressModal

