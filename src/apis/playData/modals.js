const playDataSchema = require("./schema")
const TABLE_NAME = require('./constants.js')
const mongoose = require("mongoose");

const PlayDataModal = mongoose.model("playData", playDataSchema, TABLE_NAME);

module.exports =PlayDataModal

