require("dotenv").config();
const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello from Puzzelle backend!");
// });
const userRoutes = require("./api/user/routes");
app.use("/api/user", userRoutes);

app.listen(3001, () => {
  console.log("Puzzelle backend running on port 3001");
});