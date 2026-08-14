const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async ({ amount, puzzleId, userId }) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects the smallest currency unit — cents, not dollars
      currency: "usd",
      metadata: { puzzleId, userId },
    });
    return paymentIntent;
  } catch (error) {
    console.log("Stripe payment intent creation failed:", error);
    throw error;
  }
};

module.exports = { createPaymentIntent };