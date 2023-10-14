const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const helmet = require("helmet");
const { errors } = require("celebrate");
const routes = require("./routes");

const { PORT = 3001 } = process.env;

const { limiter } = require("./utils/limiter");
const { errorHandler } = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(limiter);

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("app listening");
});
