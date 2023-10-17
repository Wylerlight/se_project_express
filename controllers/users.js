const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const BadRequestError = require("../errors/BadRequestError");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, avatar } = req.body;

  User.findOne({ email }).then((emailFound) => {
    if (emailFound) {
      next(new ConflictError("User already exists"));
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((user) => {
          res.send({ name, avatar, email, _id: user._id });
        })
        .catch((e) => {
          if (e.name === "ValidationError") {
            next(new BadRequestError("Invalid data"));
          } else {
            next(e);
          }
        });
    }
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};
