const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth");
const validate = require("../../middleware/validate");
const { createPaymentSchema } = require("./validation");
const { createPayment, getPayment } = require("./controller");

router.post("/", isAuth, validate(createPaymentSchema), createPayment);
router.get("/:id", isAuth, getPayment);
router.post("/webhook",express.raw({ type: "application/json" }),stripeWebhook);

module.exports = router;
