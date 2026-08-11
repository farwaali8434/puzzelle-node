const { TABLE_NAME } = require('./constants.js');
const { Schema } = require('./schema.js');
const mongoose = require("mongoose");


const { UserSchema } = require("./schema");

const UserModel = mongoose.model("User", UserSchema, TABLE_NAME);

module.exports = UserModel;