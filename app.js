const express = require("express");

const mongoose = require("mongoose");

const app = express();

const userRouter = require("./routes/users");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("app listening");
});
