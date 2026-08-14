import PaymentModal from "./modals";
import PuzzleModal from "../puzzle/modals";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


module.exports.createPayment = async (req, res) => {
  try {
    const puzzle = await PuzzleModal.findById(req.body.puzzleId);
    if (!puzzle) {
      return res.status(404).json({ message: "This puzzle does not exist" });
    }

    const isOwner = puzzle.userId.toString() === req.userId;
    if (!isOwner) {
      return res.status(403).json({ message: "This puzzle does not belong to you" });
    }

    if (!puzzle.gift) {
      return res.status(400).json({ message: "This puzzle does not require payment" });
    }

    const price = Number(process.env.GIFT_PRICE);

    const paymentIntent = await createPaymentIntent({
      amount: price,
      puzzleId: puzzle._id,
      userId: puzzle.userId,
    });

    const payment = await PaymentModal.create({
      puzzleId: puzzle._id,
      userId: puzzle.userId,
      status: "pending",
      price,
      transactionId: paymentIntent.id,
    });

    return res.status(200).json({
      paymentToken: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports.stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // must be raw, unparsed — see routes.js note below
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook signature verification failed:", error);
    return res.status(400).json({ message: "Invalid webhook signature" });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      await PaymentModal.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        { status: "succeeded" }
      );
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      await PaymentModal.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        { status: "failed" }
      );
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
