const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports.handleAuthError = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers);
  // console.log(authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization required");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new UnauthorizedError("Invalid Token");
  }

  req.user = payload; // assigning the payload to the request object
  return next();
};
