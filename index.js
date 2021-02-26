/* eslint-disable quotes */
const express = require("express");
const { healthRouter, categoryRouter } = require("./src/routes");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(express.json());

app.use("/health", healthRouter);
app.use("/category", categoryRouter);

app.listen(3000, () => {
  console.log(`Server is up at ${port}`);
});
