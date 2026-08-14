const mongoose = require("mongoose");
const { paymentSchema } = require("./schema.js");
const { TABLE_NAME } = require("./constants.js");

const PaymentModal = mongoose.model("Payment", paymentSchema, TABLE_NAME);

module.exports = PaymentModal;