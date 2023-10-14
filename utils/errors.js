const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_403 = 403;
const ERROR_404 = 404;
const ERROR_409 = 409;
const ERROR_500 = 500;

function handleErrors(req, res, err) {
  console.log(err.name, "This is the console.log");
  console.log(err.message, "This is the message");
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({ message: "No document found" });
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(ERROR_400).send({ message: "Invalid data" });
  }
  if (err.message === "Incorrect email or password") {
    return res
      .status(ERROR_401)
      .send({ message: "Email or Password not found" });
  }
  return res.status(ERROR_500).send({
    message: "An error has occurred on the server",
  });
}

module.exports ={
  
}

module.exports = {
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_409,
  ERROR_500,
  handleErrors,
};
