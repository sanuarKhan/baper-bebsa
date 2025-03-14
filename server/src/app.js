const express = require("express");
const app = express();

const cors = require("cors");
const accountRouter = require("./routes/account.route");

//middleware
app.use(cors());
app.use(express.json());

// Route
app.use("/api", accountRouter);

module.exports = app;
