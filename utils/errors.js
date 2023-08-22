const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

function handleErrors(req, res, err) {
  console.log(err.name, "This is the console.log");
  console.log(err._message, "This is the message");
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({ message: "No document found" });
  }
  if (err.name === "ValidatonError" || err.name === "CastError") {
    return res.status(ERROR_400).send({ message: err._message });
  }
}

module.exports = { ERROR_400, ERROR_404, ERROR_500, handleErrors };
