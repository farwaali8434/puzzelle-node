const { TABLE_NAME } = require('./constants.js');
const mongoose = require("mongoose");
const { UserSchema } = require("./schema");

const UserModal = mongoose.model("User", UserSchema, TABLE_NAME);

module.exports = UserModal;