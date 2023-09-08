const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports.handleAuthError = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers);
  // console.log(authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  req.user = payload; // assigning the payload to the request object
  return next();
};
