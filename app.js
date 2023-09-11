const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const helmet = require("helmet");
const routes = require("./routes");

const { PORT = 3001 } = process.env;

const { limiter } = require("./utils/limiter");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(limiter);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("app listening");
});

app.get("/", (req, res, next) => {
  try {
    throw new Error("Message");
  } catch (error) {
    next(error);
  }
});
