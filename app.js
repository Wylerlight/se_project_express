const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const routes = require("./routes");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("app listening");
});
