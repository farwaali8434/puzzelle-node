require("dotenv").config();
const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello from Puzzelle backend!");
// });
const userRoutes = require("./api/users/routes");
const puzzleRoutes = require("./api/puzzle/routes");
const paymentRoutes = require("./api/payment/routes")
app.use("/api/user", userRoutes);
app.use("api/puzzle", puzzleRoutes);
app.use("/api/payments", paymentRoutes).
app.listen(3001, () => {
  console.log("Puzzelle backend running on port 3001");
});