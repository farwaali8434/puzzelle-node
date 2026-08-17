require("dotenv").config();
const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello from Puzzelle backend!");
// });
const userRoutes = require("./apis/users/routes");
const puzzleRoutes = require("./apis/puzzle/routes");
const paymentRoutes = require("./apis/payment/routes");
const playDataRoutes = require ("./apis/playData/routes")
app.use("/api/user", userRoutes);
app.use("api/puzzle", puzzleRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/plays", playDataRoutes);
app.listen(3001, () => {
  console.log("Puzzelle backend running on port 3001");
});